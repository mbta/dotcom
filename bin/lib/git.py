import subprocess


def has_gh_cli():
    try:
        return __call(["gh", "auth", "status"]) != "You are not logged into any GitHub hosts. Run gh auth login to authenticate."
    except:
        return False

def current_master_commit():
    return __call(["git", "rev-parse", "--short", "origin/master"])

def latest_tag():
    return __call(["git", "describe", "--tags", "--abbrev=0"])

def sha_for_tag(tag):
    return __call(["git", "show-ref", "-s", "--abbrev", tag])

def log_between(previous, current):
    return __call(["git", "log", "--abbrev-commit", "--no-decorate", "--pretty=oneline", "%s..%s" % (previous, current)])

def release(tag, notes):
    return __call(["gh", "release", "create", "%s" % tag, "--title", "%s" % tag, "--notes", "%s" % notes])

def __call(cmd):
    return subprocess.check_output(cmd).decode('UTF-8').rstrip()
