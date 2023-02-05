import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, setRTLTextPlugin } from "react-map-gl";
import LogEntryForm from "./addEntryForm";
import { listLogEntries } from "./API";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopUp, setShowPopUp] = useState({});
  const [AddEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 33.9287819,
    longitude: 9.1964927,
    zoom: 6,
  });

  const showAddMarkerPopUp = (event) => {
    // console.log(event)
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude: longitude,
      latitude: latitude,
    });
  };

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
    setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
      null
    );
  }, []);

  const TOKEN = process.env.REACT_APP_TOKEN;

  return (
    <ReactMapGL
      doubleClickZoom={false}
      mapboxApiAccessToken={TOKEN}
      {...viewport}
      mapStyle="mapbox://styles/seifeslimene/ck9t7pdvx03le1ipd7kmyif9o"
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopUp}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.Latitude} longitude={entry.Longitude}>
            <div onClick={() => setShowPopUp({ [entry._id]: true })}>
              <svg
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`,
                }}
                className="marker"
                viewBox="0 0 24 24"
                stroke="#fff"
                strokeWidth="2"
                fill="#f00"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopUp[entry._id] ? (
            <Popup
              latitude={entry.Latitude}
              longitude={entry.Longitude}
              closeButton={true}
              closeOnClick={true}
              onClose={() => setShowPopUp({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.Comments}</p>
                <p>
                  <span>Visit Date : </span>
                  {new Date(entry.visitDate).toLocaleDateString()}
                </p>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {AddEntryLocation ? (
        <>
          <Marker
            latitude={AddEntryLocation.latitude}
            longitude={AddEntryLocation.longitude}
          >
            <div>
              <svg
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`,
                }}
                className="marker"
                viewBox="0 0 24 24"
                stroke="#fff"
                strokeWidth="2"
                fill="#5E985A"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={AddEntryLocation.latitude}
            longitude={AddEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setAddEntryLocation(null);
            }}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  getEntries();
                  setAddEntryLocation(null);
                }}
                location={AddEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
