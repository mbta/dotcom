#!/usr/bin/env python3
"""
Combine geocode polling place addresses from a CSV file with district shapes from a geojson file.

Usage:
    combine_geocoded_addresses_with_shapes.py <polling_places_file> <district_shapes_file> <output_json_file>
    combine_geocoded_addresses_with_shapes.py -h | --help

Arguments:
    <polling_places_file>  A CSV input file with geocoded polling place addresses.
    <district_shapes_file>  A geojson shapfile with paths for each district.
    <output_json_file>  The precincts json file to write out. If there is an existing file, it will be overwritten.
"""

import csv
import json
import re
from docopt import docopt


def read_shapes_json(shapes_file):
    with open(shapes_file, newline='') as file:
        data = json.load(file)
        return data['features']


def clean_possible_number_input(str):
    cleaned = str.strip().lstrip('0')
    return cleaned or '0'


def town_name(properties):
    name = properties['NAME']
    name_and_number_match = re.search(r'^([\w\s]+) [\d-]+$', name)

    if (len(name.split('Ward')) > 1):
        return name.split('Ward')[0].strip()
    elif (len(name.split('Precinct')) > 1):
        return name.split('Precinct')[0].strip()
    elif (name_and_number_match):
        return name_and_number_match.group(1)
    else:
        return name


def ward_precinct(properties):
    district = properties['DISTRICT']
    pieces = district.split('-')
    if (len(pieces) > 1):
        ward = clean_possible_number_input(pieces[0])
        precinct = clean_possible_number_input(pieces[1])
        return (ward, precinct)
    else:
        precinct = district.lstrip('0')
        return ('0', precinct)


def district_from_feature(feature):
    properties = feature['properties']
    town = town_name(properties).title()
    ward, precinct = ward_precinct(properties)
    path = feature['geometry']['coordinates']
    district = dict(town=town, ward=ward, precinct=precinct, path=path)
    return district


def from_shapes_file(district_shapes_file):
    features = read_shapes_json(district_shapes_file)
    return [district_from_feature(feature) for feature in features]


def from_polling_places_csv(polling_places_file):
    with open(polling_places_file, mode='r', newline='',
              encoding='utf-8-sig') as polling_places_input:
        polling_places_reader = csv.DictReader(polling_places_input)
        return [polling_place for polling_place in polling_places_reader]


def find_district(districts, town, ward, precinct):
    for d in districts:
        if (d['town'] == town and d['ward'] == ward
                and d['precinct'] == precinct):
            return d


def precinct_from_polling_place(polling_place, districts):
    town = polling_place['ct_twn_nm'].strip().title()
    ward = clean_possible_number_input(polling_place['ward_no'])
    precinct = clean_possible_number_input(polling_place['prnct_no'])
    lat = float(polling_place['lat'] or '0')
    lng = float(polling_place['lng'] or '0')
    address = polling_place['poll_pl_addr'].strip()
    formatted_address = polling_place['formatted_address'].strip()
    name = polling_place['poll_pl_nm'].strip()

    district = find_district(districts, town, ward, precinct)

    if (district):
        path = district['path']

        return dict(town=town,
                    ward=ward,
                    precinct=precinct,
                    lat=lat,
                    lng=lng,
                    address=address,
                    formatted_address=formatted_address,
                    name=name,
                    path=path)
    else:
        print(
            f"WARNING: No district found for town={town}, ward={ward}, precinct={precinct}"
        )
        return None


def write_json_data(output_json_file, precincts):
    with open(output_json_file, 'w', newline='') as outfile:
        outfile.write(json.dumps(precincts))


def main(args):
    polling_places_file = args["<polling_places_file>"]
    district_shapes_file = args["<district_shapes_file>"]
    output_json_file = args["<output_json_file>"]

    districts = from_shapes_file(district_shapes_file)
    polling_places = from_polling_places_csv(polling_places_file)
    maybe_precincts = [
        precinct_from_polling_place(polling_place, districts)
        for polling_place in polling_places
    ]
    # Filter out Nones
    precincts = [precinct for precinct in maybe_precincts if precinct]

    write_json_data(output_json_file, precincts)


if __name__ == '__main__':
    args = docopt(__doc__)
    main(args)
