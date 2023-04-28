import json
from django.http import HttpResponse


def index(request):
    data = {
        "type": 'FeatureCollection',
        "features": [
            {
                "type": 'Feature',
                "properties": {
                    "title": 'company_1',
                    "description":
                        'Toto company',
                    "icon": 'castle'
                },
                "geometry": {
                    "type": 'Point',
                    "coordinates": [6, 47.2]
                }
            },
            {
                "type": 'Feature',
                "properties": {
                    "title": 'company_2',
                    "description":
                        'Gege studio',
                    "icon": 'castle'
                },
                "geometry": {
                    "type": 'Point',
                    "coordinates": [6.2, 47.2]
                }
            },
            {
                "type": 'Feature',
                "properties": {
                    "title": 'company_3',
                    "description":
                        'Maeva society',
                    "icon": 'castle'
                },
                "geometry": {
                    "type": 'Point',
                    "coordinates": [6.2, 47.3]
                }
            }
        ]
    }
    return HttpResponse(json.dumps(data), content_type="application/json")
