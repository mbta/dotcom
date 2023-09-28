from random import choice
from pyquery import PyQuery
from gevent.pool import Group
from locust import between
from locust import HttpUser
from locust.user.task import TaskSet, task
from socket_user import SocketIOUser
import time
import json
import glob
import os

EXPECTED_RESPONSE_SEC = .826

dev_url = "dev.mbtace.com"
file_list = glob.glob(os.path.join(os.getcwd(), "stops-*.txt"))


def get_all_stops():
    stops = []
    for file_path in file_list:
        with open(file_path) as f_input:
            stops.extend(f_input.read().splitlines())

    return stops


class StopPageVisitor(HttpUser, SocketIOUser):
    # The time we expect a user to hang around, in seconds
    wait_time = between(5, 120)

    def on_start(self):
        self.wait()
        self.start_time = time.time()
        stops = get_all_stops()
        self.connect(f"ws://{dev_url}/socket/websocket",
                     verify=False, suppress_origin=True)
        self.stop_id = choice(stops)
        # route IDs are determined dynamically so it's challenging to include here. these include
        # 1. route alerts /api/alerts?route_ids=...
        # 2. the routes themselves /api/routes/...
        self.endpoints = [
            [f"/api/stops/{self.stop_id}/schedules?last_stop_departures=false&future_departures=true",
                "Schedules Endpoint"],
            [f"/api/map-config", "MapConfig Endpoint"],
            [f"/api/stop/{self.stop_id}/facilities",
                "Facilities Endpoint"],
            [f"/api/stop/{self.stop_id}/route-patterns",
                "Route Patterns Endpoint"],
            [f"/api/stops/{self.stop_id}/alerts",
                "Alerts for Stop Endpoint"],
            [f"/api/fares/one-way?stop_id={self.stop_id}",
                "One-Way Fares Endpoint"],
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
        self.send(f'{{"topic":"predictions:stop:{self.stop_id}","event":"phx_join","payload":{{}},"ref":"1","join_ref":"1"}}',
                  name="Streaming Predictions Outbound Join")
        # wait for additional pushes, while occasionally sending heartbeats, like a real client would
        self.sleep_with_heartbeat(60)

    def on_message(self, message):
        elapsed_time = (time.time() - self.start_time) * 1000  # convert to MS
        if message is not None:
            try:
                data = json.loads(message)
                topic = data['topic']
                event = data['event']
                print(f"{topic} {event}")
                payload = data['payload']

                if event == 'data':
                    # This is the event sending new predictions to the frontend.
                    exception = None
                    if elapsed_time > 10000:
                        exception = Exception("took more than 10s")
                    self.environment.events.request.fire(
                        request_type="WSR",
                        name="Streaming Predictions Inbound Predictions",
                        response_time=elapsed_time,
                        response_length=len(payload['predictions']),
                        exception=exception,
                        context=self.context(),
                    )

                elif event == 'phx_reply':
                    status = payload['status']
                    response = payload['response']
                    if not status == "ok":
                        self.environment.events.request.fire(
                            request_type="WSR",
                            name="Streaming Predictions Inbound Predictions",
                            response_time=elapsed_time,
                            response_length=len(response),
                            exception=Exception("not-OK response"),
                            context=self.context(),
                        )

                else:
                    self.environment.events.request.fire(
                        request_type="WSR",
                        name="Streaming Predictions Inbound Predictions",
                        response_time=elapsed_time,
                        response_length=len(payload),
                        exception=None,
                        context=self.context(),
                    )

            except json.JSONDecodeError:
                print(message)

        self.start_time = time.time()
        # The original plugin was written using a very different format of
        # websocket messages, oh well
        # super().on_message(message)
