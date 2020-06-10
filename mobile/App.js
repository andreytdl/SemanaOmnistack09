import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket',
    'Warning: Each child',
    'Possible Unhandled Promise'
]);

export default function App() {
    return <Routes />
}