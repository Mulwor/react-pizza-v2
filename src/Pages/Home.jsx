import React from 'react';

import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import { Sort } from '../Components/Sort';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryID, setCategoryID] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

  React.useEffect(() => {
    const sortBy = sortType.sortProperty.replace('-', "");
    const order = sortType.sortProperty.includes('-') ? "asc" : "desc";
    const category = categoryID > 0 ? `category=${categoryID}` : '';
    
    fetch(`https://634812fbdb76843976b9b35d.mockapi.io/Collections?${category}&sortBy=${sortBy}&order=${order}`,)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr); 
        setIsLoading(false); 
      });
    window.scrollTo(0, 0);
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
