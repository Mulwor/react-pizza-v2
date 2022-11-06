import './App.css';
import Categories from './Components/Categories';
import { Header } from './Components/Header';
import { Sort } from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import './scss/app.scss'

function App() {
  return (
    <div class="wrapper">
    
      <Header />
     
      <div class="content">
        <div class="container">
          <div class="content__top">
            
            <Categories />
            {/* Еще один способ вызванить функцию это: 
                    {Categories()} 
            */}
           
           <Sort />

          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
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
