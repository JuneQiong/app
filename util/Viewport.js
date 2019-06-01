import { Dimensions } from 'react-native';

const devices = Dimensions.get('window')

const w = 750
const h = 1334

const min = Math.min(devices.width, devices.height)
const max = Math.max(devices.width, devices.height)

export function vw(size) {
    const devices = Dimensions.get('window')
    return size * devices.width / w
}

export  function  vh(size) {
    const devices = Dimensions.get('window')
    return size * devices.height / h
}

export function vmin(size) {
    return size * min / w
}

export function vmax(size) {
    return size * max / h
}