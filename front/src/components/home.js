import React, { useRef, useEffect, useState } from 'react';
// import axios from 'axios';
import { Companies } from './companies'
import { infos_company } from '../data/fake_data'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = `${process.env.REACT_APP_API_KEY}`;

export function Home() {
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(6);
    const [lat, setLat] = useState(47.24);
    const [zoom, setZoom] = useState(9);
    const [description, setDescription] = useState('');
    const [data, setData] = useState('');
    //     const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
    let clickCoords = {}
    const url = "http://localhost:8000/data_form/"
//     const headers = {
//         method: 'GET',
//         mode: 'no-cors',
//         headers: {'Content-Type':'application/json'}
//     }
    

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {setData(data)})
//         (async () => {
//             const response = await axios.get("http://localhost:8000/data_form/", {headers});
//             console.log(response.data.total);
//         })()
    }, [])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('click', e => {
            if (clickCoords.x !== e.point.x && clickCoords.y !== e.point.y) {
                // SHOW FORMULAR

                clickCoords = {};
            }

        });
        
//         console.log('data____', data);
        map.current.on('load', () => {
            map.current.addSource('lieu', {
                'type': 'geojson',
                'data': data
            });

            map.current.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'lieu',
                'layout': {
                    'icon-image': ['get', 'icon'],
                    'icon-allow-overlap': true
                }
            });

            map.current.on('click', 'places', (e) => {
                clickCoords = e.point;
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                setDescription(description)
    //             new mapboxgl.Popup()
    //                 .setLngLat(coordinates)
    //                 .setHTML(description)
    //                 .addTo(map.current);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.current.on('mouseenter', 'places', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.current.on('mouseleave', 'places', () => {
                map.current.getCanvas().style.cursor = '';
            });
        });
    }); 

    function fly_to(el) {
        map.current.flyTo({
            center: el.geometry.coordinates,
            zoom: 10,
            essential: true
        });
        setDescription(el.properties.description)
    }
    
    function popup() {
        return (
            <div>
                {description}
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '50px'}}>
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={mapContainer} className="map-container" />
                {/* <div ref={popUpRef}></div> */}
            </div>
            {popup()}
            <Companies data={data} fly_to={fly_to} />
        </div>
    );
}
