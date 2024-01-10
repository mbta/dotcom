from random import choice
from gevent.pool import Group
from locust import between
from locust.user.task import TaskSet, task


# reusable data
cr_routes = ["CR-Kingston", "CR-Lowell", "CR-Providence",
             "CR-Worcester", "CR-Fitchburg", "CR-Newburyport"]
ferry_routes = ["Boat-F1", "Boat-F4"]
green_line_routes = ["Green-B", "Green-C", "Green-D", "Green-E"]
light_rail_routes = green_line_routes + ["Mattapan"]
heavy_rail_routes = ["Red", "Orange", "Blue"]
subway_routes = heavy_rail_routes + light_rail_routes + ["Green"]
key_bus_routes = [
    "1",
    "15",
    "22",
    "23",
    "28",
    "32",
    "39",
    "57",
    "66",
    "71",
    "73",
    "77",
    "111",
    "116",
    "117",
]

routes = {
    'cr': cr_routes,
    'bus': key_bus_routes,
    'subway': subway_routes,
    'ferry': ferry_routes
}


def LineDiagramTaskSet(mode):
    class Tasks(TaskSet):
        wait_time = between(1, 30)

        def on_start(self):
            self.route_id = choice(routes[mode])
            self.isNotFerry = mode != 'ferry'
            self.page_url = f"/schedules/{self.route_id}/line"
            self.realtime_url = f"/schedules/line_api/realtime?id={self.route_id}&direction_id=0"
            self.map_url = f"/schedules/map_api?id={self.route_id}&direction_id=0"
            self.line_url = f"/schedules/line_api?id={self.route_id}&direction_id=0"
            return super().on_start()

        def visit(self):
            with self.client.get(self.page_url, name=f"/schedules/[id]/line", catch_response=True) as response:
                hasInitialMapData = "representative_trip_polyline" in response.text
                hasInitialLineJson = f"""id":"{self.route_id}""" in response.text

                if not hasInitialMapData and self.isNotFerry:
                    response.failure(
                        f"server did not return map data route={self.route_id}")
                if not hasInitialLineJson:
                    response.failure(
                        f"server did not return line data route={self.route_id}")

        def realtime_polling(self):
            while True:
                with self.client.get(
                        self.realtime_url, name=f"/schedules/[id]/line (Realtime API - Live Polling)", catch_response=True) as response:

                    self.check_api_response(response)
                self._sleep(15000)

        def map_api(self):
            with self.client.get(
                    self.map_url, name=f"/schedules/[id]/line (Map API)", catch_response=True) as response:

                self.check_api_response(response)

        def line_api(self):
            with self.client.get(
                    self.line_url, name=f"/schedules/[id]/line (Line API)", catch_response=True) as response:

                self.check_api_response(response)

        def check_api_response(self, response=None):
            if not response or not response.json():
                response.failure(f"no API data returned route={self.route_id}")

        def api_calls(self):
            # Run all the API calls in parallel
            group = Group()
            if self.isNotFerry:
                group.spawn(self.realtime_polling)
                group.spawn(self.map_api)
            group.spawn(self.line_api)
            group.join()

        @task
        def all(self):
            group = Group()
            group.spawn(self.api_calls)
            group.spawn(self.visit)
            group.join()

    return Tasks
