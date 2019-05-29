from pyquery import PyQuery


class Page():
    """Interact with elements on an html page"""

    @staticmethod
    def get_csrf_token(response):
        pq = PyQuery(response.content)
        return pq("input[name='_csrf_token']").val()
