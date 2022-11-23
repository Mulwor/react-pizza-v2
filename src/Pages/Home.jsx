import React from 'react';

import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import { Sort } from '../Components/Sort';
import Pagination from '../Components/Pagination';
import { SearchContext } from '../App';
// useSelector - Позволяет извлекать данные из состояния хранилища Redux с 
// помощью функции выбора.

// useDispatch - хук, возвращает  функцию из хранилища Redux. 
import { useSelector, useDispatch } from 'react-redux'
// Запихнем потом в диспатч его чтобы работало
import { setCategoryId } from '../Components/Redux/slices/filterSlice'

const Home = () => {
  // Дай нам функцию, которая будет менять наш стейт и мы "говорим", что хотим изменить
  // категорию пиццы с помощью диспатча 
  const dispatch = useDispatch()
  const categoryID = useSelector(state => state.filter.categoryID);
  console.log(categoryID)


  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryID, setCategoryID] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0)
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  } 

  React.useEffect(() => {
    const sortBy = sortType.sortProperty.replace('-', "");
    const order = sortType.sortProperty.includes('-') ? "asc" : "desc";
    const category = categoryID > 0 ? `category=${categoryID}` : '';
    const search = searchValue > 0 ? `search=${searchValue}` : '';

    fetch(`https://634812fbdb76843976b9b35d.mockapi.io/Collections?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr); 
        setIsLoading(false); 
      });
    window.scrollTo(0, 0);
  }, [categoryID, sortType, searchValue, currentPage]);

  const fakePizza = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const objectMap = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true
    }
    return false
  }).map((object) => <PizzaBlock key={object.id} {...object} />)
  
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={onClickCategory} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        
        {isLoading ? fakePizza : objectMap }
        
      </div>

      <Pagination onChangePage = {(number) => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
