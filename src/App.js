import './App.css';
import Categories from './Components/Categories';
import { Header } from './Components/Header';
import { Sort } from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import './scss/app.scss';
import pizzas from './assets/pizza.json';
import React from 'react';

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
            {/* <Categories /> */}
            {/* Еще один способ вызванить функцию это: {Categories()} */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((object) => (
              <PizzaBlock key={object.id} {...object} />
              /* Если совпадает все то можно сокрактить просто до object
                      <PizzaBlock
                        title = {object.title} price = {object.price} imageUrl = {object.imageUrl}
                        sizes = {object.sizes} types = {object.types}
                      />
                  */
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
