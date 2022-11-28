import React from 'react';

import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import { list, Sort } from '../Components/Sort';
import Pagination from '../Components/Pagination';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilter } from '../Components/Redux/slices/filterSlice';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas } from '../Components/Redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryID = useSelector((state) => state.filter.categoryID);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = React.useContext(SearchContext);

  const { items, status } = useSelector((state) => state.pizza);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    debugger
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryID > 0 ? `category=${categoryID}` : '';
    const search = searchValue > 0 ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas( { sortBy, order, category, search, currentPage} ),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryID,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryID, sortType, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // Возьмем реальный sort, который у нас есть и перадим в редакс
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilter({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    getPizzas();
  }, [categoryID, sortType, searchValue, currentPage]);

  const fakePizza = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const objectMap = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((object) => <PizzaBlock key={object.id} {...object} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      { status === 'error' ? (
        <div className="content__error-info">
          <h2>А пицц-то нет :-( </h2>
          <p>Мы все сами съели и тебе ничего не оставили</p>
        </div>
      ) : (
        <div className="content__items">{status === 'Loading' ? fakePizza : objectMap}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
