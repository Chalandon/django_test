from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_data(request):
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
    return Response(data)

@api_view(['POST'])
def add_data(request):
    return Response(request)
