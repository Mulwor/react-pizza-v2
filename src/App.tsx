import './App.css';
import './scss/app.scss';
import { Header } from './Components/Header';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import FullPizza from './Pages/FullPizza';

function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="pizza/:id*" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
