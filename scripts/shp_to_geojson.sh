#!/usr/bin/env bash

# Convert geo files from .shp to .geojson format.
# This script depends on the `ogr2ogr` library from `gdal`.
# Install it from homebrew via `brew install gdal`.

ogr2ogr -f GeoJSON ~/tmp/polling_places/MA_025_Statewide_Precincts_Final/MA_025_Statwide2021PrecinctsFinal.geojson ~/tmp/polling_places/MA_025_Statewide_Precincts_Final/MA_025_Statwide2021PrecinctsFinal.shp
