import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app.js';

const appElement = document.getElementById("app");
const root = createRoot(appElement);

root.render(
    <App/>
)
