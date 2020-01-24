from locust import HttpLocust, TaskSet


def index(l):
    l.client.get("/")


def notfound(l):
    l.client.get("/notfound")


class UserBehavior(TaskSet):
    tasks = {index: 2, notfound: 1}


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000
