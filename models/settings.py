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

users = {
    'item_title': 'users',
    'schema': {
        'email': {'type': 'string',
                  'required': True
                  },
        'user_token': {'type': 'string',
                       'required': True,
                       'unique': True
                       },
        'reviews': {'type': 'list'},
        'rating': {'type': 'integer',
                   'required': True
                   }
    }
}

locations = {
    'item_title': 'locations',
    'schema': {
        'from': {'type': 'string',
                 'required': True
                 },
        'to': {'type': 'string',
               'required': True
               }
    }
}

slugs = {
    'item_title': 'slugs',
    'schema': {
        'number_of_people': {'type': 'integer'},
        'location_id': {'type': 'string',
                        'required': True
                        },
        'user_token': {'type': 'string',
                       'required': True
                       },
    }
}
DOMAIN = {
    'locations': locations,
    'users': users,
    'slugs': slugs,
}
