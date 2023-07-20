from random import choice
from pyquery import PyQuery
from gevent.pool import Group
from locust import between
from locust import HttpUser
from locust.user.task import TaskSet, task
from socket_user import SocketIOUser
import time
import json
# from locust_plugins.users import SocketIOUser
# locust_plugins just... doesn't work on MacOS with M1, because a single dependency hasn't been implemented with support for that platform yet
# copying the SocketIOUser module sort of works, except
# - connecting to the websocket host on our staging server doesn't work as-is because security reasons


stops = [
  "place-alfcl",
  "place-alsgr",
  "place-amory",
  "place-andrw",
  "place-aport",
  "place-aqucl",
  "place-armnl",
  "place-asmnl",
  "place-astao",
  "place-babck",
  "place-balsq",
  "place-bbsta",
  "place-bckhl",
  "place-bcnfd",
  "place-bcnwa",
  "place-bland",
  "place-bmmnl",
  "place-bndhl",
  "place-bomnl",
  "place-boyls",
  "place-brdwy",
  "place-brico",
  "place-brkhl",
  "place-brmnl",
  "place-brntn",
  "place-bucen",
  "place-buest",
  "place-butlr",
  "place-bvmnl",
  "place-capst",
  "place-ccmnl",
  "place-cedgr",
  "place-cenav",
  "place-chhil",
  "place-chill",
  "place-chmnl",
  "place-chncl",
  "place-chswk",
  "place-clmnl",
  "place-cntsq",
  "place-coecl",
  "place-cool",
  "place-davis",
  "place-denrd",
  "place-dwnxg",
  "place-eliot",
  "place-engav",
  "place-esomr",
  "place-fbkst",
  "place-fenwd",
  "place-fenwy",
  "place-fldcr",
  "place-forhl",
  "place-gilmn",
  "place-gover",
  "place-grigg",
  "place-grnst",
  "place-haecl",
  "place-harsq",
  "place-harvd",
  "place-hsmnl",
  "place-hwsst",
  "place-hymnl",
  "place-jaksn",
  "place-jfk",
  "place-kencl",
  "place-knncl",
  "place-kntst",
  "place-lake",
  "place-lech",
  "place-lngmd",
  "place-longw",
  "place-masta",
  "place-matt",
  "place-mdftf",
  "place-mfa",
  "place-mgngl",
  "place-miltt",
  "place-mispk",
  "place-mlmnl",
  "place-mvbcl",
  "place-newtn",
  "place-newto",
  "place-north",
  "place-nqncy",
  "place-nuniv",
  "place-ogmnl",
  "place-orhte",
  "place-pktrm",
  "place-portr",
  "place-prmnl",
  "place-qamnl",
  "place-qnctr",
  "place-rbmnl",
  "place-rcmnl",
  "place-river",
  "place-rsmnl",
  "place-rugg",
  "place-rvrwy",
  "place-sbmnl",
  "place-sdmnl",
  "place-shmnl",
  "place-smary",
  "place-smmnl",
  "place-sougr",
  "place-spmnl",
  "place-sstat",
  "place-state",
  "place-sthld",
  "place-stpul",
  "place-sull",
  "place-sumav",
  "place-symcl",
  "place-tapst",
  "place-tumnl",
  "place-unsqu",
  "place-valrd",
  "place-waban",
  "place-wascm",
  "place-welln",
  "place-wimnl",
  "place-wlsta",
  "place-wondl",
  "place-woodl",
  "place-wrnst"
]

EXPECTED_RESPONSE_SEC = .826
class StopPageVisitor(HttpUser, SocketIOUser):
    # The time we expect a user to hang around, in seconds
    wait_time = between(5, 120)
    
    def on_start(self):
        self.wait()
        self.connect("ws://localhost:4001/socket/websocket", verify=False)
        # self.stop_id = choice(stops)
        self.stop_id = "place-sstat"
        self.endpoints = [
          [f"/api/stops/{self.stop_id}/schedules?last_stop_departures=false&future_departures=true", "Schedules Endpoint"],
          [f"/api/map-config", "MapConfig Endpoint"],
          [f"/api/stop/{self.stop_id}/facilities", "Facilities Endpoint"],
          [f"/api/stops/{self.stop_id}/alerts", "Alerts for Stop Endpoint"],
          [f"/api/routes/by-stop/{self.stop_id}", "Routes by Stop Endpoint"],
          [f"/api/stop/{self.stop_id}", "Stop Endpoint"],
        ]
        super().on_start()

    @task
    def load_endpoints(self):
      for end in self.endpoints:
        with self.client.get(end[0], name=end[1], catch_response=True) as r:
          if r.elapsed.total_seconds() > EXPECTED_RESPONSE_SEC:
            r.failure("request took too long")
          else:
            if r.ok:
              r.success()
            else:
              r.failure(r.reason)

    @task
    def load_stop_page(self):
      with self.client.get(f"/stops/{self.stop_id}?active_flag=stops_redesign", name="Stop Page", catch_response=True) as stop_response:
        if stop_response.elapsed.total_seconds() > 1:
          stop_response.failure("request took too long")
        else:
          if stop_response.ok:
            stop_response.success()
          else:
            stop_response.failure(stop_response.reason)

    @task
    def subscribe_to_predictions(self):
      self.start_time = time.time()
      self.send(f'{{"topic":"predictions:stop={self.stop_id}","event":"phx_join","payload":{{}},"ref":"1","join_ref":"1"}}', name="Streaming Predictions Outbound Join")
      # wait for additional pushes, while occasionally sending heartbeats, like a real client would
      # self.sleep_with_heartbeat(60)
    
    def on_message(self, message):
      if message is not None:
        try:
          data = json.loads(message)
          topic = data['topic']
          event = data['event']
          payload = data['payload']
          if 'predictions' in payload.keys():
            exception = None
            elapsed_time = time.time() - self.start_time
            if elapsed_time > 5:
              exception = Exception("took more than 5s")

            self.environment.events.request.fire(
              request_type="WSR",
              name="Streaming Predictions Inbound Predictions",
              response_time=elapsed_time * 1000, # convert to MS
              response_length=len(payload['predictions']),
              exception=exception,
              context=self.context(),
            )
            self.start_time = time.time()
        except json.JSONDecodeError:
          print(message)
        

      # The original plugin was written using a very different format of
      # websocket messages, oh well
      # super().on_message(message)
