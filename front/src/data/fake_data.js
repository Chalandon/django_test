// export const data = [
//   {'title': 'company_besançon', 'lng': 6.023, 'lat': 47.237},
//   {'title': 'company_dijon', 'lng': 5.0274, 'lat': 47.3228},
//   {'title': 'company_dole', 'lng': 5.49, 'lat': 47.09},
// ]

export const infos_company = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'title': 'company_besançon',
                            'description':
                                'Je suis une entreprise à Besançon',
                            'icon': 'castle'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [6, 47.2]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'title': 'company_dijon',
                            'description':
                                'Je suis une entreprise à Dijon',
                            'icon': 'castle'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [5.07, 47.3228]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'title': 'company_dole',
                            'description':
                                'Je suis une entreprise à Dole',
                            'icon': 'castle'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [5.49, 47.11]
                        }
                    }
                ]
            }

