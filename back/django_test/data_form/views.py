import json
from django.http import HttpResponse


def index(request):
    data = {
        "type": 'FeatureCollection',
        "features": [
            {
                "type": 'Feature',
                "properties": {
                    "title": 'company_besançon',
                    "description":
                        'Je suis une entreprise à Besançon',
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
                    "title": 'company_dijon',
                    "description":
                        'Je suis une entreprise à Dijon',
                    "icon": 'castle'
                },
                "geometry": {
                    "type": 'Point',
                    "coordinates": [5.07, 47.3228]
                }
            },
            {
                "type": 'Feature',
                "properties": {
                    "title": 'company_dole',
                    "description":
                        'Je suis une entreprise à Dole',
                    "icon": 'castle'
                },
                "geometry": {
                    "type": 'Point',
                    "coordinates": [5.49, 47.11]
                }
            }
        ]
    }
    return HttpResponse(json.dumps(data), content_type="application/json")
