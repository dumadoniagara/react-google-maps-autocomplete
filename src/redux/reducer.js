import {
    SET_ADDRESS,
    SET_FULL_ADDRESS,
    SET_COORDINATE,
    SET_MARKER_OPEN,
} from './types';

const initialState = {
    isMarkerOpen: false,
    coordinate: { lat: 3.139003, lng: 101.686855 },
    address: '',
    fullAddress: {},
};

export default function mapsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            };
        case SET_FULL_ADDRESS:
            return {
                ...state,
                fullAddress: action.payload
            };
        case SET_COORDINATE:
            return {
                ...state,
                coordinate: action.payload,
            };
        case SET_MARKER_OPEN:
            return {
                ...state,
                isMarkerOpen: true,
            };
        default:
            return state;
    }
}