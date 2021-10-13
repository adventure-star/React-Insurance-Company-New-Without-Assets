import React, { useState, useEffect } from 'react'

import down from "../../img/down-small.png"

import ToolTipList from '../ToolTipList'
import OutsideClickHandler from 'react-outside-click-handler'


const CasaToolTip = (props) => {

    const [data, setData] = useState([
        { id: 1, title: "Más recientes" },
        { id: 2, title: "Más buscados" },
        { id: 3, title: "Menor a mayor precio" },
        { id: 4, title: "Mayor a menor precio" },
    ])

    const [titleId, setTitleId] = useState(props.order);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        props.handleOrder(titleId);
    }, [titleId]);

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className="relative">
                <div className="flex items-center cursor-pointer" onClick={() => setOpen(!open)}>
                    <p className="text-black text-base font-OpenSansBold pr-3 select-none">Ordenar por</p>
                    <img src={down} alt="down" />
                </div>
                <p className="font-OpenSansRegular text-base text-black">{data.filter(i => i.id === titleId)[0].title}</p>
                {open &&
                    <ToolTipList
                        data={data}
                        setTitleId={(id) => setTitleId(id)}
                        setOpen={(value) => setOpen(value)}
                    />
                }
            </div>
        </OutsideClickHandler>
    )
}

export default CasaToolTip;
