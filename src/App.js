import './App.css';
import { Header } from './Components/Header';
import './scss/app.scss';
import React from 'react';
import Home from './Pages/Home'
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
            <NotFound />
        </div>
      </div>
    </div>
  );
}

export default App;
