import React from "react";

function Categories( {value, onClickCategory}) {
  // console.log(value)
  const choiceCategory = [ "Все", "Мясные", "Вегетарианская", "Гриль",  "Острые", "Закрытые" ]

  return (
    <div className="categories">
      <ul>
        {choiceCategory.map((categoryName, index) => (
          <li 
            // Если твой массив не меняется передавай ки, еслион меняется, то не передавай
            key = {index}
            onClick = {() => onClickCategory(index)}
            className = {value === index ? "active" : ""}
          > {categoryName} </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
