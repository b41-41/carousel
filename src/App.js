import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/default.css';
import Main from './pages/main';

function App() {
  return (
    <BrowserRouter basename={'/wanted_pre_onboarding'}>
      < Routes >
        <Route path="/" element={<Main />} />
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
