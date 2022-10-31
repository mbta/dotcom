#!/usr/bin/env python3
"""
Geocode polling addresses from a CSV input file. Adds columns for the clean
address, latitude, and longitude for each row and writes the results to a new CSV file.

Usage:
    geocode_addresses.py <infile> <outfile>
    geocode_addresses.py -h | --help

Arguments:
    <infile>  The CSV file to use an input.
    <outfile>  The location to write an output CSV file. If there is an existing file, it will be overwritten.
"""

import csv
import os
import googlemaps
from docopt import docopt

gmaps = googlemaps.Client(key=os.getenv('GOOGLE_API_KEY'))


def address_from_csv_row(row):
    return f"{row['poll_pl_addr']}, {row['ct_twn_nm']}, MA"


def output_fieldnames(input_fieldnames):
    return input_fieldnames + ['formatted_address', 'lat', 'lng']


def geocode(address):
    geocode_results = gmaps.geocode(address)

    if geocode_results:
        return geocode_results[0]
    else:
        print(f"WARNING: Unable to geocode address: {address}")
        return None


def add_geo_data_to_row(row, geo_data):
    if geo_data:
        row['formatted_address'] = geo_data['formatted_address']
        row['lat'] = geo_data['geometry']['location']['lat']
        row['lng'] = geo_data['geometry']['location']['lng']
    else:
        row['formatted_address'] = ''
        row['lat'] = ''
        row['lng'] = ''


def main(args):
    infile = args["<infile>"]
    outfile = args["<outfile>"]

    with open(infile, newline='') as incsv:
        reader = csv.DictReader(incsv)

        with open(outfile, 'w', newline='') as outcsv:
            writer = csv.DictWriter(outcsv,
                                    fieldnames=output_fieldnames(
                                        reader.fieldnames))
            writer.writeheader()

            for row in reader:
                address = address_from_csv_row(row)
                geo_data = geocode(address)
                add_geo_data_to_row(row, geo_data)
                writer.writerow(row)


if __name__ == '__main__':
    args = docopt(__doc__)
    main(args)
