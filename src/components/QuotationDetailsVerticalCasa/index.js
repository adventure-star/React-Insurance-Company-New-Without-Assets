import React, { useState, useEffect } from 'react'

import checkpurple from '../../img/check-purple.png';
import checkpurple1 from '../../img/check-purple-1.png';
import checkwhite from '../../img/check-white.png';


const QuotationDetailsVerticalCasa = (props) => {

    const [buildingFire, setBuildingFire] = useState(false);
    const [contentFire, setContentFire] = useState(false);
    const [theft, setTheft] = useState(false);
    const [rcBoundary, setRCBoundary] = useState(false);
    const [rcPrivate, setRCPrivate] = useState(false);
    const [crystal, setCrystal] = useState(false);
    const [waterDamage, setWaterDamage] = useState(false);
    const [homeCare, setHomeCare] = useState(false);

    useEffect(() => {

        switch (props.coverageid) {
            case 1:
                setBuildingFire(true);
                setContentFire(true);
                setTheft(false);
                setRCBoundary(false);
                setRCPrivate(false);
                setCrystal(true);
                setWaterDamage(true);
                setHomeCare(true);
                break;
            case 2:
                setBuildingFire(true);
                setContentFire(true);
                setTheft(true);
                setRCBoundary(true);
                setRCPrivate(true);
                setCrystal(true);
                setWaterDamage(true);
                setHomeCare(true);
                break;
            case 3:
                setBuildingFire(true);
                setContentFire(true);
                setTheft(false);
                setRCBoundary(false);
                setRCPrivate(false);
                setCrystal(false);
                setWaterDamage(true);
                setHomeCare(false);
                break;
            case 4:
                setBuildingFire(true);
                setContentFire(false);
                setTheft(true);
                setRCBoundary(true);
                setRCPrivate(false);
                setCrystal(true);
                setWaterDamage(true);
                setHomeCare(false);
                break;
            case 5:
                setBuildingFire(true);
                setContentFire(true);
                setTheft(true);
                setRCBoundary(true);
                setRCPrivate(true);
                setCrystal(true);
                setWaterDamage(true);
                setHomeCare(true);
                break;
        }

    }, []);


    return (
        <>
            <div className="pt-4">
                <div className="flex items-center pb-2">
                    <img src={buildingFire ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${buildingFire ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio de edificio</p>
                </div>
                <div className="flex items-center pb-2">
                    <img src={contentFire ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${contentFire ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio de contenido</p>
                </div>
                <div className="flex items-center pb-2">
                    <img src={theft ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${theft ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Robo y/o hurto de contenido gral.</p>
                </div>
                <div className="flex items-center pb-2">
                    <img src={rcBoundary ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${rcBoundary ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>RC en hechos linderos</p>
                </div>
            </div>
            <div className="pt-4">
                <div className="flex items-center pb-2">
                    <img src={rcPrivate ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${rcPrivate ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>RC en hechos privados</p>
                </div>
                <div className="flex items-center pb-2">
                    <img src={crystal ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${crystal ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Cristales</p>
                </div>
                <div className="flex items-center pb-2">
                    <img src={waterDamage ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${waterDamage ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Daños por agua e inundación </p>
                </div>
                <div className="flex items-center pb-2">
                    <img src={homeCare ? (props.item === props.selected ? checkpurple : checkpurple1) : checkwhite} alt="" />
                    <p className={`${homeCare ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Asistencia domiciliaria</p>
                </div>
            </div>
        </>
    )
}

export default QuotationDetailsVerticalCasa;
