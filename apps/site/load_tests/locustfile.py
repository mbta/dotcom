from locust import HttpUser, TaskSet, task
from page import Page
from random import choice

# reusable data
cr_routes = ["CR-Kingston"]
ferry_routes = ["Boat-F1"]
green_line_routes = ["Green-B", "Green-C", "Green-D", "Green-E"]
light_rail_routes = green_line_routes + ["Mattapan"]
heavy_rail_routes = ["Red", "Orange", "Blue"]
subway_routes = heavy_rail_routes + light_rail_routes
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

class TransitNearMe(TaskSet):
    def on_start(self):
        """ on_start is called when Locust starts before any task is scheduled """

    @task
    def no_location(self):
        self.client.get("/transit-near-me")

    @task
    def office(self):
        self.client.get(
            "/transit-near-me?location%5Baddress%5D=10+Park+Plaza%2C+Boston%2C+MA+02116%2C+USA&location%5Blatitude%5D=42.3515322&location%5Blongitude%5D=-71.06684519999999"
        )

    @task
    def ashmont(self):
        self.client.get(
            "/transit-near-me?location%5Baddress%5D=Ashmont+St%2C+Boston%2C+MA%2C+USA&location%5Blatitude%5D=42.2870008&location%5Blongitude%5D=-71.05954459999998"
        )

    @task
    def lynn(self):
        self.client.get(
            "/transit-near-me?location%5Baddress%5D=Lynn%2C+MA%2C+USA&location%5Blatitude%5D=42.46676300000001&location%5Blongitude%5D=-70.94949380000003"
        )

    @task
    def tts(self):
        self.client.get(
            "/transit-near-me?location%5Baddress%5D=10+Brookline+St%2C+Cambridge%2C+MA+02139%2C+USA&location%5Blatitude%5D=42.36354439999999&location%5Blongitude%5D=-71.1017089"
        )

    @task
    def church(self):
        self.client.get(
            "/transit-near-me?location%5Baddress%5D=69+Kilmarnock+St%2C+Boston%2C+MA+02215%2C+USA&location%5Blatitude%5D=42.3424708&location%5Blongitude%5D=-71.09949890000001"
        )

    @task
    def paris(self):
        self.client.get(
            "/transit-near-me?location%5Baddress%5D=Paris%2C+France&location%5Blatitude%5D=48.856614&location%5Blongitude%5D=2.3522219000000177"
        )

class LineDiagram(TaskSet):
    def response_has_line_diagram(self, route_id, mode):
        with self.client.get(f"/schedules/{route_id}/line", name=f"/schedules/[id]/line ({mode})", catch_response=True) as response:
            hasMapData = "representative_trip_polyline" in response.text
            hasLineJson = f"""id":"{route_id}""" in response.text
            
            if not hasMapData and mode != "ferry":
                response.failure("Map data not seen")
            if not hasLineJson:
                response.failure("JSON data not seen")
    
    @task(5)
    def view_cr(self):
        route_id = choice(cr_routes)
        self.response_has_line_diagram(route_id, "CR")
    
    @task(10)
    def view_bus(self):
        route_id = choice(key_bus_routes)
        self.response_has_line_diagram(route_id, "bus")

    @task(5)
    def view_subway(self):
        route_id = choice(subway_routes)
        self.response_has_line_diagram(route_id, "subway")
    
    @task(1)
    def view_ferry(self):
        route_id = choice(ferry_routes)
        self.response_has_line_diagram(route_id, "ferry")


class WebsiteUser(HttpUser):
    tasks = {
        TransitNearMe: 1,
        LineDiagram: 1
    }

    min_wait = 1000  # 1 seconds
    max_wait = 15000  # 15 seconds