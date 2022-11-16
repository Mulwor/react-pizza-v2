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
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://634812fbdb76843976b9b35d.mockapi.io/Collections')
    .then((res) => {
      return res.json();
    })
    .then((arr) => {
      setItems(arr)           // Отрендери пиццы
      setIsLoading(false)     // Загрузка завершилась
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
            {
              /* 1. Если у нас сейчас идет загрузка, то мы создаем фейковых массив: [...new Array()] 
              Внутрь пишем сколько необходим кол-во элементов и замени все undefined на Скелетон, 
              а если загрузка завершилась реднери пицца блок
              
              Каждый раз когда рендерится какой-то список обязательно указывай ключ. 
              
              Нижнее подчеркивание необходим был для того, чтобы js не ругался, так как в нем нет значений
              */
              isLoading ? [...new Array(6)].map(( _, index) => <Skeleton key={index}/>)
                        : items.map(object => <PizzaBlock key = {object.id} {...object} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
