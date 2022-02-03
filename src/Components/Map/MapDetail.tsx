import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "./MapDetail.sass";
import "leaflet/dist/leaflet.css";

interface MapInfo {
  lat: number;
  long: number;
  name: string;
}

const DisplayMap: FC<MapInfo> = ({ lat, long, name }) => {
  debugger;

  if (lat != null && long != null) {
    return (
      <div className="map">
        <MapContainer
          center={[lat, long]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100vh", width: "100wh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[lat, long]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>{name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  } else {
    return (
      <>
        <p>Sorry, no map data found.</p>
      </>
    );
  }
};

export default DisplayMap;
