# Polling Places helper scripts

Some years during election season we enable a page to help riders search for their polling place and get transit directions to it. In order to support this functionality, we need to gather current data on polling places and district shapes each year. There are a few scripts to help automate this.

__IMPORTANT NOTE:__ In past years we have found the source data files to be very messy. We have had to do manual work to correct inconsistencies so that the final output is as correct as possible. Examples of this include adjusting how ward and precincts are formatted so that we can match the CSV data to the shapes data, as well as a good deal of manual geocoding to account for noise in the address fields.

## geocode_addresses.py

Geocode polling addresses from a CSV input file. Adds columns for the clean
address, latitude, and longitude for each row and writes the results to a new CSV file.

If the polling places data comes to us as an Excel file it should be saved as a CSV file to feed into this script.

## shp_to_geojson.sh

Convert geo files from .shp to .geojson format.

This script depends on the `ogr2ogr` library from `gdal`. Before you run it you should install gdal from homebrew via `brew install gdal`.

## combine_geocoded_addresses_with_shapes.py

Combine geocode polling place addresses from a CSV file with district shapes from a geojson file. This assembles everything from the previous two scripts into a single `precincts.json` file that the dotcom app can consume.
