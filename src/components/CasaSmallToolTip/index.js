import React, { useState, useEffect } from 'react'

import updown from "../../img/up-down.png"

import ToolTipList from '../ToolTipList'
import OutsideClickHandler from 'react-outside-click-handler'


const CasaSmallToolTip = (props) => {

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
                <div className="flex items-center text-center mx-auto cursor-pointer" onClick={() => setOpen(!open)}>
                    <img src={updown} alt="updown" />
                    <p className="font-OpenSansRegular text-lg text-gray5 pl-2 py-4">Ordenar</p>
                </div>
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

export default CasaSmallToolTip;
