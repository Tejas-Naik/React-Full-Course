import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
import styles from "./Map.module.css";

const flagemojiToPNG = (flag) => {
    const codePoints = Array.from(flag, (char) => char.codePointAt(0));
    const countryCode = codePoints
        .map((code) => String.fromCharCode(code - 127397).toLowerCase())
        .join('');

    const flagImageUrl = `https://flagcdn.com/24x18/${countryCode}.png`;

    return <img src={flagImageUrl} alt="flag" />;
};

function Map() {
    const navigate = useNavigate();
    const { cities } = useCities();

    const [mapPosition, setMapPosition] = useState([40, 0])
    const [searchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <MapContainer
                center={mapPosition}
                // center={[mapLat, mapLng]}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker position={city.position} key={city.id}>
                        <Popup>
                            <span>{city.emoji ? flagemojiToPNG(city.emoji) : ""}</span><span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

    })
    return null;
}

export default Map;