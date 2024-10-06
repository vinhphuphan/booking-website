import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Replace this with your actual Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoicGhhbnZpbmhwaHUxIiwiYSI6ImNtMTNpd3ZuazFjaGgycXB2MzVhb3UybnoifQ.E7xdaD9rf3wvuSw2w_vuOg";

interface MapBoxProps {
  latitude: number;
  longitude: number;
  onLocationChange: (longtitude: number, latitude: number) => void;
}

const MapBox: React.FC<MapBoxProps> = ({
  onLocationChange,
  latitude,
  longitude,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/phanvinhphu1/cm13jrb1p01vr01r7elfiecqp",
      center: [longitude, latitude], // Use the provided longitude and latitude
      zoom: 3, // Set a zoom level appropriate for the country
    });

    // Save the map instance to the ref
    mapRef.current = map;

    // Initialize the Geocoder and add it to the map
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl as any, // Cast to any to bypass type issues
      placeholder: "Search for places",
    });

    map.addControl(geocoder);

    // Handle the result of the Geocoder search
    geocoder.on("result", (event: any) => {
      const [longitude, latitude] = event.result.center;

      // Remove the previous marker if it exists
      const existingMarker = map.getLayer("geocoder-marker");
      if (existingMarker) {
        map.removeLayer("geocoder-marker"); 
        map.removeSource("geocoder-marker");
      }

      // Add a new marker at the searched location
      new mapboxgl.Marker({ id: "geocoder-marker" })
        .setLngLat([longitude, latitude])
        .addTo(map);

      // Optionally, fly to the new location on the map
      map.flyTo({
        center: [longitude, latitude],
        essential: true,
        zoom: 13,
      });

      // Pass the selected coordinates to the parent component
      onLocationChange(longitude, latitude); // Use the callback here
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "45vh" }} />
  );
};

export default MapBox;
