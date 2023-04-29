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
                    "name": 'Toto company',
                    "description": 'une entreprise qui fabrique des trucs',
                    "adress": '25056 Besançon, 3 rue Pasteur',
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
                    "name": 'Gege studio',
                    "description": 'Un studio génial qui fait des trucs',
                    "adress": '25056 Besançon, 23 bd St Germain',
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
                    "name": 'Maeva society',
                    "description": 'une société aux ambitions de Maeva',
                    "adress": '25056 Besançon, 6 rue Marceau',
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
