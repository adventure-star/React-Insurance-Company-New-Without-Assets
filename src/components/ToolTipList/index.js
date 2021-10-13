import React from 'react'

import './index.css'

const ToolTipList = (props) => {
    return (
        <div class="popup z-30">
            <div class="popuptext">
                {props.data.map((item, index) => (
                    <p key={item.id} className={`text-xs font-OpenSansRegular text-white ${index + 1 !== props.data.length ? `border-b border-purple6` : ``} cursor-pointer px-4 py-2`} onClick={() => { props.setTitleId(item.id); props.setOpen(false); }}>{item.title}</p>
                ))}
            </div>
        </div>
    )
}

export default ToolTipList;
