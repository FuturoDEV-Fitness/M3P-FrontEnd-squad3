import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css"
import styles from './map.module.css'

function Map(){
    const markers = [
        {
            geocode: [-27.590972, -48.549418],
            popUp: 'Maracador 1'
        },
        {
            geocode: [-27.600098, -48.519698],
            popUp: 'Maracador 2'
        },
        {
            geocode: [-27.551720, -48.472729],
            popUp: 'Maracador 3'
        },
        {
            geocode: [-27.591660, -48.586854],
            popUp: 'Maracador 4'
        }
    ]

    return(
        <MapContainer center={[-27.59344, -48.56159]} zoom={13} className={styles.containerMap}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
                {markers.map((marker, index) => (
                    <Marker position={marker.geocode} key={index}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default Map