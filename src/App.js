import './App.css';
import { Header } from './Components/Header';
import { Sort } from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import './scss/app.scss';
import React from 'react';
import Skeleton from './Components/PizzaBlock/Skeleton'
import Categories from './Components/Categories'

function App() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    fetch('https://634812fbdb76843976b9b35d.mockapi.io/Collections')
    .then((res) => {
      return res.json();
    })
    .then((arr) => {
      setItems(arr)
    });
  }, [])

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((object) => (
              <Skeleton key={object.id} {...object} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
