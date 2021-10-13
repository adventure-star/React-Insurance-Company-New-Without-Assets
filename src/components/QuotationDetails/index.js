import React, { useEffect, useState } from 'react'

import firefalse from '../../img/quotation/fire-false.svg';
import firetrue from '../../img/quotation/fire-true.svg';
import firetruehigh from '../../img/quotation/fire-true-highlighted.svg';
import partialdamagefalse from '../../img/quotation/partialdamage-false.svg';
import partialdamagetrue from '../../img/quotation/partialdamage-true.svg';
import partialdamagetruehigh from '../../img/quotation/partialdamage-true-highlighted.svg';
import hailfalse from '../../img/quotation/hail-false.svg';
import hailtrue from '../../img/quotation/hail-true.svg';
import hailtruehigh from '../../img/quotation/hail-true-highlighted.svg';
import totaldamagefalse from '../../img/quotation/totaldamage-false.svg';
import totaldamagetrue from '../../img/quotation/totaldamage-true.svg';
import totaldamagetruehigh from '../../img/quotation/totaldamage-true-highlighted.svg';
import tyrefalse from '../../img/quotation/tyre-false.svg';
import tyretrue from '../../img/quotation/tyre-true.svg';
import tyretruehigh from '../../img/quotation/tyre-true-highlighted.svg';
import helpfalse from '../../img/quotation/help-false.svg';
import helptrue from '../../img/quotation/help-true.svg';
import helptruehigh from '../../img/quotation/help-true-highlighted.svg';
import crystalfalse from '../../img/quotation/crystal-false.svg';
import crystaltrue from '../../img/quotation/crystal-true.svg';
import crystaltruehigh from '../../img/quotation/crystal-true-highlighted.svg';


const QuotationDetails = (props) => {

    const [fire, setFire] = useState(false);
    const [partialDamage, setPartialDamage] = useState(false);
    const [hail, setHail] = useState(false);
    const [totalDamage, setTotalDamage] = useState(false);
    const [tyre, setTyre] = useState(false);
    const [help, setHelp] = useState(false);
    const [crystal, setCrystal] = useState(false);

    useEffect(() => {

        switch (props.coverageid) {
            case 1:
                setFire(false);
                setPartialDamage(false);
                setHail(false);
                setTotalDamage(false);
                setTyre(false);
                setHelp(false);
                setCrystal(false);
                break;
            case 2:
                setFire(true);
                setPartialDamage(false);
                setHail(false);
                setTotalDamage(true);
                setTyre(false);
                setHelp(false);
                setCrystal(false);
                break;
            case 3:
                setFire(true);
                setPartialDamage(false);
                setHail(false);
                setTotalDamage(true);
                setTyre(false);
                setHelp(false);
                setCrystal(false);
                break;
            case 4:
                setFire(true);
                setPartialDamage(false);
                setHail(true);
                setTotalDamage(true);
                setTyre(true);
                setHelp(true);
                setCrystal(true);
                break;
            case 5:
                setFire(true);
                setPartialDamage(true);
                setHail(true);
                setTotalDamage(true);
                setTyre(true);
                setHelp(true);
                setCrystal(true);
                break;
        }

    }, []);

    return (
        <>
            <div className="flex items-center pb-1">
                <img src={fire ? (props.best ? firetruehigh : firetrue) : firefalse} alt="" />
                <p className={`${fire ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio Parcial y Total</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={partialDamage ? (props.best ? partialdamagetruehigh : partialdamagetrue) : partialdamagefalse} alt="" />
                <p className={`${partialDamage ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Daño Parcial</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={hail ? (props.best ? hailtruehigh : hailtrue) : hailfalse} alt="" />
                <p className={`${hail ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-4`}>Granizo</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={totalDamage ? (props.best ? totaldamagetruehigh : totaldamagetrue) : totaldamagefalse} alt="" />
                <p className={`${totalDamage ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Daño Total</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={tyre ? (props.best ? tyretruehigh : tyretrue) : tyrefalse} alt="" />
                <p className={`${tyre ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Robo de Ruedas</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={help ? (props.best ? helptruehigh : helptrue) : helpfalse} alt="" />
                <p className={`${help ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Auxilio S.O.S</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={crystal ? (props.best ? crystaltruehigh : crystaltrue) : crystalfalse} alt="" />
                <p className={`${crystal ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Cristales</p>
            </div>
        </>
    )
}

export default QuotationDetails;
