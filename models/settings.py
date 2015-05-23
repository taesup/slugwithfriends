# -*- coding: utf-8 -*-

import os

MONGO_HOST = os.environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)
MONGO_USERNAME = os.environ.get('MONGO_USERNAME', '')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD', '')
MONGO_DBNAME = os.environ.get('MONGO_DBNAME', 'evedemo')
DEBUG = True


RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

CACHE_CONTROL = 'max-age=20'
CACHE_EXPIRES = 20

X_DOMAINS = "*"

parkings = {
    'item_title': 'parking spaces',
    'schema': {
        'description': { 'type': 'string' },
        'address': {'type': 'string'},
        'location': { 'type': 'point', },
        'entrance': { 'type': 'string' },
        'phone': { 'type': 'string' },
        'operator': { 'type': 'string' },
        'hourly': { 'type': 'string' },
        'daily_max': { 'type': 'string' },
        'early_bird': { 'type': 'string' },
        'after_hours': { 'type': 'string' },
        'weekend_rate': { 'type': 'string' },
        'monthly_rate': { 'type': 'string' },
        'hours_of_operation': { 'type': 'string' },
        'indoors_outdoors': { 'type': 'string' },
        'service_type': { 'type': 'string' },
        'motorcycles_allowed': {'type': 'boolean'},
        'vehicle_types': {'type': 'string'},
        'height_restriction': {'type': 'string'},
        'note': {'type': 'string'}
    }
}

users = {
    'item_title': 'users',
    'schema': {
        'user_token': {'type': 'string'},
        'reviews': {'type': 'list'},
        'rating': {'type': 'integer'}
    }
}

locations = {
    'item_title': 'locations',
    'schema': {
        'from': {'type': 'string'},
        'to': {'type': 'string'}
    }
}

slugs = {
    'item_title': 'slug',
    'schema': {
        'number_of_people': {'type': 'integer'},
        'location_id': {'type': 'string'},
        'user_token': {'type': 'string'},
    }
}
DOMAIN = {
    'locations': locations,
    'parkings': parkings,
    'users': users,
    'slugs': slugs,
}
