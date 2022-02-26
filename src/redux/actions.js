import {
    SET_ADDRESS,
    SET_COORDINATE,
    SET_MARKER_OPEN,
    SET_FULL_ADDRESS
} from './types';

export const setMarkerOpen = () => ({
    type: SET_MARKER_OPEN,
});

export const setAddress = (address) => ({
    type: SET_ADDRESS,
    payload: address,
});

export const setFullAddress = (address) => ({
    type: SET_FULL_ADDRESS,
    payload: address,
});

export const setCoordinate = (coor) => ({
    type: SET_COORDINATE,
    payload: coor,
});
