import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Replace this with your actual Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoicGhhbnZpbmhwaHUxIiwiYSI6ImNtMTNpd3ZuazFjaGgycXB2MzVhb3UybnoifQ.E7xdaD9rf3wvuSw2w_vuOg";

interface MapBoxForListingPageProps {
  latitude: number;
  longitude: number;
}

const MapBoxForListingPage: React.FC<MapBoxForListingPageProps> = ({
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
      zoom: 12, // Set a zoom level appropriate for the country
    });

    // Create a marker and set its longitude and latitude
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude]) // Use the provided coordinates
      .addTo(map); // Add the marker to the map

    // Save the map instance to the ref
    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [longitude, latitude]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default MapBoxForListingPage;
