import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import {useEffect, useState} from 'react'
import { useListAll } from '../../Hooks/useList.jsx'

import "leaflet/dist/leaflet.css"
import styles from './map.module.css'

function Map(){
    const [locations, setLocations] = useState([])

    useEffect(() => {

        listLocations()

    }, [])

    async function listLocations(){
        setLocations((await useListAll()).data)
    }

    const markers = locations.map(item => {
        return {
            lat: Number(item.latitude),
            long: Number(item.longitude),
            popUp: `${item.descricao}`
        }
    })

    return(
        <MapContainer center={[-27.59344, -48.56159]} zoom={11} className={styles.containerMap}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>                
                {markers.length > 0 ? markers.map((marker, index) => (
                    <Marker position={[marker.lat, marker.long]} key={index}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                )): null}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default Map