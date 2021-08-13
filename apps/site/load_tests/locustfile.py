from locust import HttpUser, TaskSet, task
from linediagram import LineDiagramTaskSet

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

class WebsiteUser(HttpUser):
    LineDiagramCR = LineDiagramTaskSet("cr")
    LineDiagramBus = LineDiagramTaskSet("bus")
    LineDiagramSubway = LineDiagramTaskSet("subway")
    LineDiagramFerry = LineDiagramTaskSet("ferry")
    
    tasks = {
        TransitNearMe: 3,
        LineDiagramCR: 5,
        LineDiagramBus: 5,
        LineDiagramSubway: 3,
        LineDiagramFerry: 1
    }

    min_wait = 1000  # 1 seconds
    max_wait = 15000  # 15 seconds