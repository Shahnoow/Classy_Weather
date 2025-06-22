import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./globemap.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Recenter({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.flyTo([lat, lon], 10, { animate: true }); // Added animate
    }
  }, [lat, lon, map]);
  return null;
}

function WorldMap({ lat, lon, locationName }) {
  const defaultPosition = [200, 0]; // center of world
  return (
    <MapContainer center={defaultPosition} zoom={4} className="MapContainer">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {lat && lon && (
        <>
          <Recenter lat={lat} lon={lon} />
          <Marker position={[lat, lon]}>
            <Popup>{locationName}</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}

export default WorldMap;
