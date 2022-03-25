import { useRef, useState } from 'react';
import Link from 'next/link';
import { Image } from 'cloudinary-react';
import ReactMapGL, { Marker, Popup, ViewState } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";
import { removeLogo } from '../utils/functions';

interface IProps {}

function Map({}: IProps) {
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 43,
    longitude: -79,
    zoom: 10,
    // bearing: 0,
    // pitch: 0,
    // padding: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
  });
  removeLogo();
  return (
    <div
      className="text-black relative"
      style={{
        position: 'relative',
        // zIndex: 99,
        borderWidth: '2px',
        // backgroundColor: 'white',
        height: 'calc(100vh - 64px)',
        width: '100%',
      }}
    >
      <ReactMapGL
        {...viewport}
        // width="100vw"
        // height="100vh"
        // initialViewState={viewport}
        style={
          {
            // width: '100%',
            // height: 'calc(100vh-64px)',
            // backgroundColor: 'white',
          }
        }
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        // mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
      ></ReactMapGL>
    </div>
  );
}

export default Map;
