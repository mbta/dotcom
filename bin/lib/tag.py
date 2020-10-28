from datetime import date
import re


def date_tag(latest_tag):
      today = date.today().strftime("%Y.%m.%d")
      return "%s.%s" % (today, __count(latest_tag, today))


def __count(latest_tag, today):
    m = re.match(r'%s\.(\d+)' % today, latest_tag)
    previous_count = int(m and m.group(1) or '0')
    return previous_count + 1
