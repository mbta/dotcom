# Outage pages

This folder contains the static `503.html` and `504.html` pages shown to
riders when the dotcom application itself is unreachable (e.g. during a
deploy, an outage, or when the origin server is not responding).

**These pages are not served by the Phoenix app.** Because they need to be
available even when the app is completely down, they are uploaded directly
to the `mbta-dotcom` S3 bucket and served from there by AWS CloudFront
(as an error-page origin) instead of being bundled into a normal release
and served through the app's static asset pipeline.

Since they're standalone HTML files, everything they need (styles, the
favicon, etc.) is inlined directly in the file rather than linked to other
assets on the site.

## Uploading changes

After editing either file, upload the updated versions to S3 with the AWS
CLI:

```sh
aws s3 cp priv/static/error_pages/503.html s3://mbta-dotcom/503.html --content-type "text/html" --cache-control "no-cache"
aws s3 cp priv/static/error_pages/504.html s3://mbta-dotcom/504.html --content-type "text/html" --cache-control "no-cache"
```
