import './App.css';
import Categories from './Components/Categories';
import { Header } from './Components/Header';
import { Sort } from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import './scss/app.scss'

function App() {
  return (
    <div className="wrapper">
    
      <Header />
     
      <div className="content">
        <div className="container">
          <div className="content__top">
            
            <Categories />
            {/* Еще один способ вызванить функцию это: 
                    {Categories()} 
            */}
           
           <Sort />

          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
              <PizzaBlock title="Мексиканская" price={100} />
              <PizzaBlock title="Aligator" price={500} />
              <PizzaBlock />
              <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
