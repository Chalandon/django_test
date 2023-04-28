import React, { useRef, useEffect, useState } from 'react';
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
    const [is_display_form, setDisplay_form] = useState(false);
    const [data_form, set_data_form] = useState({
        name: '',
        description: '',
        adress: ''
    })
    const url = "http://localhost:8000/data/get"
    let clickCoords = {}
    
    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {setData(data)})
    }, [])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('move', () => { // while moving map, update longitude latitude to display
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('click', e => { // when map is clicked, formular is dispalyed
            if (clickCoords.x !== e.point.x && clickCoords.y !== e.point.y) {
                setDisplay_form(true)
                clickCoords = {};
            }
        });
        
        map.current.on('load', () => {
            map.current.addSource('lieu', { // add map data
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

            map.current.on('click', 'places', (e) => { // when flag is clicked company data is update
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

    // go from a destination to another when a company in the list is clicked
    function fly_to(el) {
        map.current.flyTo({
            center: el.geometry.coordinates,
            zoom: 10,
            essential: true
        });
        setDescription(el.properties.description)
    }
    
    // display infos about company
    function display_popup() {
        return (
            <div>
                {description}
            </div>
        )
    }

    // get input value from formular
    function handleChange(e) {
        let value = e.target.value
        set_data_form({
            ...data_form,
            [e.target.name]: value
        });
    }
    
    // post data to django server
    function handleSubmit(e) {
        e.preventDefault()
        let url = 'http://localhost:8000/data/add'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'name': 'toto'})
        })
        .then(response => {
            console.log(response)
            if (response.status == 500) {
                alert('ERROR 500')
            }
            if (response.status == 200) {
                alert('Validated')
            }
        })
        .catch(error => console.log(error))
    }

    // cancel formular
    function cancel() {
        set_data_form({
            name: '',
            description: '',
            adress: ''
        })
        setDisplay_form(false)
    }

    function display_form() {
        return (
            <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
                    <label>name
                        <input className='form_input' type="text" name='name' onChange={handleChange}/>
                    </label>
                    <label>activity
                        <input className='form_input' type="text" name='description' onChange={handleChange}/>
                    </label>
                    <label>adress
                        <input className='form_input' type='text' name='adress' onChange={handleChange}/>
                    </label>
                    <button className='form_input' onClick={cancel}>Annuler</button>
                    <button className='form_input'>Valider</button>
                </form>
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
            {is_display_form ? display_form() : display_popup()}
            <Companies data={data} fly_to={fly_to} />
        </div>
    );
}
