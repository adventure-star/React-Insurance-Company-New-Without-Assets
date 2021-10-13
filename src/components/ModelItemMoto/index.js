import React from 'react'


const ModelItemMoto = (props) => {
    return (
        <p className={`${props.item === props.group ? `font-OpenSansBold text-purple` : `font-OpenSansRegular text-gray1`} text-base md:text-lg px-4 py-3 border-b border-gray-200 cursor-pointer`} onClick={props.onClick}>{props.name}</p>
    )
}

export default ModelItemMoto;
