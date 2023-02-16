import React from 'react';
import { createRoot } from 'react-dom/client';
import RenderPage from './components/renderpage.js';
import RenderHeader from './components/renderheader.js';

const appElement = document.getElementById("app");
const root = createRoot(appElement);

root.render(
    <><RenderHeader/><RenderPage/></>
)




console.log('index script')