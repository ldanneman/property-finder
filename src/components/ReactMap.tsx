import { useRef, useState } from 'react';
import Link from 'next/link';
import Map from 'react-map-gl';

type Props = {};

function ReactMap({}: Props) {
  return (
    <div>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        // mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default ReactMap;
