import React from 'react';

import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import { Sort } from '../Components/Sort';

const Home = ( {searchValue} ) => {
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

  const fakePizza = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const objectMap = items.filter(obj => {
    // Перед тем как отрендарить все пиццы мы возьмем массив всех пиц
    // отфильтруем их и уже новые объекты, которые отфильтровали
    // превратим в компоненты пицц
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      // если в каждом объекте есть что-то, что содержит searchValue, то мы оставляем
      // это в массиве. Иначе удаляем
      return true
    }
    return false
  }).map((object) => <PizzaBlock key={object.id} {...object} />)
  
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={(id) => setCategoryID(id)} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        
        {isLoading ? fakePizza : objectMap }
        
      </div>
    </div>
  );
};

export default Home;
