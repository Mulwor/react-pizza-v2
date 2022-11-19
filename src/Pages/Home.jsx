import React from 'react';

import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import { Sort } from '../Components/Sort';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Стейт для категории: Все, вегатерианские, гриль
  const [categoryID, setCategoryID] = React.useState(0);
  // Cтейт сортировки: по популярности и т.д. При первой загрузке чтобы изначально был выбран по популряности
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

  React.useEffect(() => {
    // Если нам необходим скелетон, то:  setIsLoading(true);

    // Их свойства удали минус 
    const sortBy = sortType.sortProperty.replace('-', "");
    // Если в sortProperty есть минус, то делай сортировку по возрастанию иначе по убыванию
    const order = sortType.sortProperty.includes('-') ? "asc" : "desc";
    const category = categoryID > 0 ? `category=${categoryID}` : '';
    
    fetch(`https://634812fbdb76843976b9b35d.mockapi.io/Collections?${category}&sortBy=${sortBy}&order=${order}`,)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr); // Отрендери пиццы
        setIsLoading(false); // Загрузка завершилась
      });
    window.scrollTo(0, 0);

    // Завивимость: useEffect - следи за categoryID и sortType, если одно из них поменяется то в этом случае делай запрос на бекенд
  }, [categoryID, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={(id) => setCategoryID(id)} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((object) => <PizzaBlock key={object.id} {...object} />)}
      </div>
    </div>
  );
};

export default Home;
