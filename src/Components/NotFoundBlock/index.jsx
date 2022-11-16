import React from "react";
import style from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <div className = {style.root}>
            <h1>
                <span>^-^</span>
                <br />
                Ничего не найдено
            </h1>
            <p className= {style.description}> Тут должна была быть ваша реклама, но вы слишком нищий </p>
        </div>
    )
}

export default NotFoundBlock