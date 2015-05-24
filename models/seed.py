import requests
import json
import random
from lxml import html
from pprint import pprint
import string
import itertools
from datetime import datetime

ENTRY_POINT = 'http://localhost:5000'

def get_placenames():
    r = requests.get('http://en.wikipedia.org/wiki/List_of_places_in_Hawaii')
    tree = html.fromstring(r.text)
    placenames = set()
    # placenames = {placename.decode('utf8') for placename in tree.xpath('//td/a/text()')}
    for placename in tree.xpath('//td/a/text()'):
        try:
            placename = placename.decode('utf8')
            placenames.add(placename)
        except UnicodeEncodeError as e:
            print(e)
    return list(placenames)

def make_to_and_from():
    cartesian_product =  list(
        itertools.product(
            get_placenames(),
            get_placenames()
        )
    )

    return [(item1, item2) for item1, item2 in cartesian_product if item1 != item2]

def create_user_record(data):
    return {
        'email': data['email'],
        'user_token': data['user_token'],
        'reviews': data['reviews'],
        'rating': data['rating']
    }
def seed_users():
    names = ['roger', 'shakeel', 'linda', 'ariel', 'arnold', 'sandeep']
    for name in names:
        data = {}
        data['user_id'] = ''.join(random.sample(string.digits, 10))
        data['user_token'] = ''.join(random.sample(string.ascii_letters, 10))
        data['reviews'] = []
        data['rating'] = random.randrange(10)
        r = perform_post('users', json.dumps(data))
        print('user posted', r.status_code, json.dumps(data))
        # print(r.__dict__)

def seed_locations():
    counter = 0
    for begin, end in make_to_and_from():
        if counter == 20:
            break
        counter += 1
        print(counter)
        data = {}
        data['from'] = begin
        data['to'] = end
        r = perform_post('locations', json.dumps(data))
        print('locations posted', r.status_code)

def seed_slugs():
    users = requests.get(endpoint('users'))
    users_dict = users.json()
    locations = requests.get(endpoint('locations'))
    locations_dict  = locations.json()

    for user, location in zip(users_dict['_items'], locations_dict['_items']):
        data = {}
        data['number_of_people'] = random.randrange(100)
        data['location_id']  = location['_id']
        data['user_token'] = user['user_token']
        date_time = datetime(2015, random.randrange(5, 7), random.randrange(1, 6), random.randrange(1,23), random.randrange(1,59), random.randrange(1,60))
        data['departure_day'] = date_time.day
        data['departure_minute'] = date_time.minute
        data['departure_hour'] = date_time.hour
        r = perform_post('slugs', json.dumps(data))
        print r.__dict__
        print('slugs seeded', r.status_code)


def endpoint(resource):
    return '%s/%s/' % (ENTRY_POINT, resource)

def perform_post(resource, data):
    headers = {'Content-Type': 'application/json'}
    return requests.post(endpoint(resource), data, headers=headers)



if __name__ == '__main__':
    requests.delete(endpoint('users'))
    requests.delete(endpoint('locations'))
    requests.delete(endpoint('slugs'))
    seed_users()
    seed_locations()
    seed_slugs()
