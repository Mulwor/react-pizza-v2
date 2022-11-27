import React from 'react';

import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import { list, Sort } from '../Components/Sort';
import Pagination from '../Components/Pagination';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilter } from '../Components/Redux/slices/filterSlice'

import axios from 'axios';

// Урок 15
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // debugger
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryID = useSelector(state => state.filter.categoryID);
  const sortType = useSelector((state) => state.filter.sort.sortProperty)
  const currentPage = useSelector((state) => state.filter.currentPage)

  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  } 

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const fetchPizzas = () => {
      const sortBy = sortType.replace('-', "");
      const order = sortType.includes('-') ? "asc" : "desc";
      const category = categoryID > 0 ? `category=${categoryID}` : '';
      const search = searchValue > 0 ? `search=${searchValue}` : '';
      
      axios.get(`https://634812fbdb76843976b9b35d.mockapi.io/Collections?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
          .then((response) => {
              setItems(response.data); 
              setIsLoading(false); 
          }
      )
  }

  // 2. Если при первом рендере (а его нет, так как isMounted = false),
  // тогда не надо вшивать в адресную строчку параметры. То есть не нужно
  // при первом же рендера вшивать в параметры ссылки какие-то значения, это
  // нужно делать после рендера. => Если изменили параметры и был первый рендер,
  // то юзЭфеект работает
  React.useEffect(()=>{
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty : sortType,
        categoryID,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryID, sortType, currentPage])

   
  // 1. Данный юзэффект служит для того, что если у нас что-то поменялось
  // в параметрах и если они при первом рендере были получены из адресной
  // строчки, то тогда мы будем вшивать в фильтр (редакс) - эти параметры,
  // в виде объекта => сверяет с юрл параметрам и сохраняет в редаксе.
   React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // Возьмем реальный sort, который у нас есть и перадим в редакс
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilter( { ...params, sort } ),
      );
      isSearch.current = true;
    }
  }, []);

 // 3. Если был первый рендер, то мы запрашиваем все наши пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryID, sortType, searchValue, currentPage])



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
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? fakePizza : objectMap }

      </div>

      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
};

export default Home;
