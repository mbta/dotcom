import subprocess


def current_branch():
    return __call(["git", "branch", "--show-current"])

def clean_status():
    return __call(["git", "status", "--porcelain"]) == ""

def current_commit():
    return __call(["git", "rev-parse", "--short", "HEAD"])

def latest_tag():
    return __call(["git", "describe", "--tags", "--abbrev=0"])

def sha_for_tag(tag):
    return __call(["git", "show-ref", "-s", "--abbrev", tag])

def log_between(previous, current):
    return __call(["git", "log", "--abbrev-commit", "--no-decorate", "--pretty=oneline", "%s..%s" % (previous, current)])

def __call(cmd):
    return subprocess.check_output(cmd).decode('UTF-8').rstrip()
