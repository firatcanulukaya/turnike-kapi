import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {ChakraProvider} from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ChakraProvider>
                    <App/>
                </ChakraProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);