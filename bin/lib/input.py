
def with_default(prompt, default):
	return input("%s [%s]: " % (prompt, default)) or default
