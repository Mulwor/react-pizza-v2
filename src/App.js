import React from 'react';
import './App.css';
import './scss/app.scss';
import { Header } from './Components/Header';
import Home from './Pages/Home'
import NotFound from './Pages/NotFound';
import {Routes, Route} from 'react-router-dom';
import Cart from './Pages/Cart'


function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
            <Routes>
              {/* Главная страница */}
              <Route path='/' element={ <Home/> } />
              <Route path='/cart' element={ <Cart /> } />
              {/* Если не один из роутев не подошел выведи последний */}
              <Route path='*' element={ <NotFound/> } />
            </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
