import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  
  const onClickCategory = (index) => {
    setActiveIndex(index)
  }

  const choiceCategory = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ]

  return (
    <div className="categories">
      <ul>
        {choiceCategory.map((value, index) => (
          <li onClick = {() => onClickCategory(index)}
               className = {activeIndex === index ? "active" : ""}
          > {value} </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
