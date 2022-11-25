import React from "react";
import { SearchContext } from "../../App";
import style from "./Search.module.scss"

import debounce from 'lodash.debounce'


const Search = () => {
    const {setSearchValue} = React.useContext(SearchContext)
    const [value, setValue] = React.useState('')
    // Правильное обращение к дом-элементам
    const inputRefHook = React.useRef();

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRefHook.current.focus();
    };

    // loadesh - будет работать с инпутом элементом
    // Если в течение определенного времени мы не напишем в инпут элемент что-то
    // то он отбудет отправлять запрос на бекенд по источению секунд который мы ука-
    // зали
    const updateSearchValue = React.useCallback(
        // Сохранил ссылку и больше его не меняем (отложенная функция выполняем каждую секунду)
        debounce((str) => {
            setSearchValue(str)
        }, 250),
        [],
    );

    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    };

  
    return (
        <div className = {style.root}>
            <svg className={style.icon}
            enableBackground="new 0 0 32 32" 
            id="Editable-Line" 
            version="1.1" 
            viewBox="0 0 32 32" 
            xmlns="http://www.w3.org/2000/svg">
                <circle  cx="14" cy="14" 
                    fill="none" 
                    id="XMLID_42_" 
                    r="9" 
                    stroke="#000000" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeMiterlimit="10" 
                    strokeWidth="2">
                </circle>
   
                <line fill="none" id="XMLID_44_" 
                      stroke="#000000" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeMiterlimit="10" 
                      strokeWidth="2" 
                      x1="27" x2="20.366" 
                      y1="27" y2="20.366">
                </line>
            </svg>
           
            <input ref = {inputRefHook}
                   value = {value}
                   onChange={onChangeInput}
                   className = {style.input} 
                   placeholder="Поиск ..." 
            /> 
            
            { value && (
                <svg 
                    onClick={onClickClear} 
                    class={style.clearIcon} 
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                </svg>
            )}
        </div>
    )
}

export default Search