import React from 'react'

import marker1 from '../../img/casa-stepmarker-1.png';
import marker2 from '../../img/casa-stepmarker-2.png';
import marker3 from '../../img/casa-stepmarker-3.png';


const CasaStepMarker = (props) => {
    return (
        <>
            <div className="flex items-center justify-between px-4 pt-4 relative">
                <div className="w-full h-full flex items-center absolute z-5 pr-8">
                    <div className={`w-1/2 ${props.step > 1 ? `bg-purple` : `bg-gray2`}`} style={{ height: "2px" }}></div>
                    <div className={`w-1/2 ${props.step > 2 ? `bg-purple` : `bg-gray2`}`} style={{ height: "2px" }}></div>
                </div>
                <img src={props.step === 1 ? marker1 : (props.step >= 1 ? marker3 : marker2)} alt="marker1" className="relative z-10" />
                <img src={props.step === 2 ? marker1 : (props.step >= 2 ? marker3 : marker2)} alt="marker1" className="relative z-10" />
                <img src={props.step === 3 ? marker1 : (props.step >= 3 ? marker3 : marker2)} alt="marker1" className="relative z-10" />
            </div>
            <div className="flex items-center justify-between px-4 pt-4">
                <p className="font-OpenSansRegular text-xs">Tu hogar</p>
                <p className="font-OpenSansRegular text-xs">Tu seguro</p>
                <p className="font-OpenSansRegular text-xs">Tus datos</p>
            </div>
        </>
    )
}

export default CasaStepMarker;
