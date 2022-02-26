import React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';

import { useSelector, useDispatch } from 'react-redux';
import { setMarkerOpen } from '../redux/actions';

const Map = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const openMarker = () => {
        dispatch(setMarkerOpen());
    };

    const MapContainer = withGoogleMap(props => (
        <GoogleMap defaultCenter={state.coordinate} defaultZoom={12}>
            <Marker
                key={props.index}
                position={state.coordinate}
                onClick={() => openMarker()}
            >
                {state.isMarkerOpen && (
                    <InfoWindow
                        onCloseClick={props.handleCloseCall}
                        options={{ maxWidth: 200 }}
                    >
                        <span>{state.address ? state.address : 'Address Description'}</span>
                    </InfoWindow>
                )}
            </Marker>
        </GoogleMap>
    ));

    return (
        <MapContainer
            containerElement={props.containerElement}
            mapElement={props.mapElement}
        />
    );
}

export default Map;