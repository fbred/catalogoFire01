import React from 'react';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig';

import axios from 'axios';
axios.defaults.baseURL = 'https://catalogofire01.firebaseio.com/';

//redux faz todo o tratamento de estador e emgloba toda a aplicação
const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
