import React, { useEffect, useState } from 'react'

import checkpurple from '../../img/check-purple.png';
import checkpurple1 from '../../img/check-purple-1.png';
import checkwhite from '../../img/check-white.png';
import arrowgreen from '../../img/arrow-green.png';


const QuotationDetailsCasa = (props) => {

    const [buildingFire, setBuildingFire] = useState(false);
    const [contentFire, setContentFire] = useState(false);
    const [theft, setTheft] = useState(false);
    const [rcBoundary, setRCBoundary] = useState(false);
    const [rcPrivate, setRCPrivate] = useState(false);
    const [crystal, setCrystal] = useState(false);
    const [waterDamage, setWaterDamage] = useState(false);
    const [homeCare, setHomeCare] = useState(false);

    const [open, setOpen] = useState(false);

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
            <div className="flex items-center pb-1">
                <img src={buildingFire ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                <p className={`${buildingFire ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio de edificio</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={contentFire ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                <p className={`${contentFire ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio de contenido</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={theft ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                <p className={`${theft ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Robo y/o hurto de contenido gral.</p>
            </div>

            {((props.collapsable && open) || !props.collapsable) &&
                <>
                    <div className="flex items-center pb-1">
                        <img src={rcBoundary ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                        <p className={`${rcBoundary ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>RC en hechos linderos</p>
                    </div>
                    <div className="flex items-center pb-1">
                        <img src={rcPrivate ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                        <p className={`${rcPrivate ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>RC en hechos privados</p>
                    </div>
                    <div className="flex items-center pb-1">
                        <img src={crystal ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                        <p className={`${crystal ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Cristales</p>
                    </div>
                    <div className="flex items-center pb-1">
                        <img src={waterDamage ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                        <p className={`${waterDamage ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Daños por agua e inundación</p>
                    </div>
                    <div className="flex items-center pb-1">
                        <img src={homeCare ? (props.best ? checkpurple : checkpurple1) : checkwhite} alt="" />
                        <p className={`${homeCare ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Asistencia domiciliaria</p>
                    </div>
                    {props.collapsable && open &&
                        <div className="flex items-center cursor-pointer mt-4" onClick={() => setOpen(false)}>
                            <p className="font-OpenSansBold text-lg text-green1">Ver menos</p>
                            <img src={arrowgreen} alt="arrow-green" className="ml-4" />
                        </div>
                    }
                </>
            }
            {props.collapsable && !open &&
                <div className="flex items-center cursor-pointer mt-4" onClick={() => setOpen(true)}>
                    <p className="font-OpenSansBold text-lg text-green1">Detalle</p>
                    <img src={arrowgreen} alt="arrow-green" className="ml-4" />
                </div>
            }
        </>
    )
}

export default QuotationDetailsCasa;
