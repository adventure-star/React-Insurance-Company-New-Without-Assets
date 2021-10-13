import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment';
import _ from 'lodash';

import logo from '../../img/logo.png';
import arrowleft from '../../img/arrow-left.png';
import loadingimg from '../../img/loading.gif';
import cross from '../../img/cross.png';
import checked from '../../img/casa-checked.png';
import unchecked from '../../img/casa-unchecked.png';

import StepMarker from '../../components/StepMarker';
import CustomInput from '../../components/CustomInput';
import InputCalendar from '../../components/InputCalendar';

import TelefonoArgentino from '../../services/telefonos_argentinos';

import { apiGetBrands, apiGetGroupsByBrandName, apiGetYearsByBrandId, apiGetVehicleData, apiCheckPostalCode, apiLeadsCompleteFields, apiGetModelsByBrandGroupYear, apiGetLeadData, apiLeadsUpdate } from '../../services/main';
import { amplitudeLogEvent, formatDate } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import MessagesModalCasa from '../../components/LoadingModal/MessagesModalCasa';
import ChargingModalCasa from '../../components/LoadingModal/ChargingModalCasa';
import InputDropdownCasa from '../../components/InputDropdownCasa';
import CasaStepMarker from '../../components/CasaStepMarker';


const CasaPolicyCheck = (props) => {

    const [step, setStep] = useState(3);

    const [uploadModal, setUploadModal] = useState(false);

    // Step 1

    const [postalcode, setPostalCode] = useState("");

    const [postalcodechecking, setPostalCodeChecking] = useState(true);
    const [postalcodechecked, setPostalCodeChecked] = useState(false);

    const [dwellingList, setDwellingList] = useState([
        { id: 1, name: "home" },
        { id: 2, name: "inn" },
    ]);
    const [dwelling, setDwelling] = useState("");

    const [surface, setSurface] = useState("");
    const [isOwner, setIsOwner] = useState(1);

    // Step 2
    const [insuranceCompany, setInsuranceCompany] = useState("");
    const [validUntil, setValidUntil] = useState(moment());


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phonechecked, setPhoneChecked] = useState(false);

    const [validError, setValidError] = useState({
        //step1
        postalcodechecked: { error: false, msg: "Código postal no \nencontrado" },
        dwelling: { error: false, msg: "Elegí una opción." },
        surface: { error: false, msg: "Elegí el nombre de la compañía aseguradora." },
        owner: { error: false, msg: "Elegí una opción." },
        //step2
        insuranceCompany: { error: false, msg: "Elegí el nombre de la compañía aseguradora." },
        validUntil: { error: false, msg: "Colocá la fecha en la que termina la vigencia." },
        //step3
        name: { error: false, msg: "Por favor ingrese nombre y apellido." },
        email: { error: false, msg: "Colocá tu email correcamente(Ej: juanperez@gmail.com)." },
        phone: { error: false, msg: "Colocá correctamente tu celular (Ej: 1165299315)." },
    });

    const [step1Valid, setStep1Valid] = useState(false);
    const [step2Valid, setStep2Valid] = useState(false);
    const [step3Valid, setStep3Valid] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        amplitudeLogEvent("Casa/Steps");
    }, []);

    const checkStep1Validation = () => {
        let {
            postalcodechecked: ePostChk,
            dwelling: eDwelling,
            surface: eSurface } = validError;

        eDwelling.error = false;
        eSurface.error = false;

        if (!postalcode) {
            ePostChk.error = true;
        }
        if (!dwelling) {
            eDwelling.error = true;
        }
        if (!surface) {
            eSurface.error = true;
        }

        setValidError({
            ...validError,
            postalcodechecked: ePostChk,
            dwelling: eDwelling,
            surface: eSurface,
        });
        if (ePostChk.error || eDwelling.error || eSurface.error) {
            return false;
        }
        return true;
    }

    const checkStep1 = () => {
        if (!postalcodechecked.error || !dwelling || !surface) {
            return false;
        }
        return true;
    }

    const checkStep2Validation = () => {
        let { insurCompany: eInsurCmp,
            validUntil: eValidUntil } = validError;

        eInsurCmp.error = false;
        eValidUntil.error = false;

        if (!insuranceCompany) {
            eInsurCmp.error = true;
        }
        if (!validUntil) {
            eValidUntil.error = true;
        }

        setValidError({
            ...validError,
            insurCompany: eInsurCmp,
            validUntil: eValidUntil
        });

        if (eInsurCmp.error || eValidUntil.error) {
            return false;
        }
        return true;
    }

    const checkStep2 = () => {
        if (!insuranceCompany || !validUntil) {
            return false;
        }
        return true;
    }


    const checkStep3Validation = () => {
        let {
            name: eName,
            email: eEmail,
            phone: ePhone } = validError;

        eName.error = false;
        eEmail.error = false;
        ePhone.error = false;

        if (!name) {
            eName.error = true;
        }
        if (!checkEmail()) {
            eEmail.error = true;
        }
        if (!phonechecked) {
            ePhone.error = true;
        }

        setValidError({
            ...validError,
            name: eName,
            email: eEmail,
            phone: ePhone
        });

        if (eName.error || eEmail.error || ePhone.error) {
            return false;
        }
        return true;
    }


    const checkStep3 = () => {
        if (!name || !checkEmail() || !phonechecked) {
            return false;
        }
        return true;
    }

    const sendData = e => {

        e.preventDefault();

        if (checkStep2Validation()) {

            let formData = new FormData();

            // formData.append('LeadID', props.match.params.leadID);
            // formData.append('VehicleID', props.match.params.vehicleID);

            // formData.append('DNI', dni);
            // formData.append('CP', postalcode);
            // formData.append('Brand', make);
            // formData.append('Model', versionList.filter(i => i.id === version)[0].name);
            // formData.append('ModelID', version);
            // formData.append('Year', year);
            // formData.append('Engine', motorname);
            // formData.append('Insurer', insuranceCompany);
            // formData.append('To', formatDate(validUntil));

            // formData.append('Chassis', "");
            // formData.append('From', "");
            // formData.append('Price', "");

            // setUploadModal(true);

            // apiLeadsCompleteFields(formData)
            //     .then(res => {
            //         console.log("res-----", res.data);
            //         setUploadModal(false);

            //         if (!res.error) {
            //             setUploadModal(true);
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         setUploadModal(false);
            //     });

            // let leadData = new FormData();
            // leadData.append('Hash', props.match.params.leadID);
            // leadData.append('Name', name);
            // leadData.append('Email', email);
            // leadData.append('Phone', phone);
            // leadData.append('Age', age);
            // leadData.append('CP', postalcode);
            // leadData.append('DNI', dni);

            // apiLeadsUpdate(leadData)
            //     .then(res => {
            //         console.log("res-----", res);
            //     })
            //     .catch(err => {
            //         console.log("err-----", err);
            //     })

        }

    }

    const checkEmail = () => {
        if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return true;
        } else {
            return false;
        }
    }

    const checkPostalCode = value => {
        setPostalCodeChecking(true);
        setPostalCodeChecked(false);
        apiCheckPostalCode(value)
            .then(res => {

                console.log('res-----', res);

                setPostalCodeChecking(false);
                setPostalCodeChecked(res);

                let { postalcodechecked: ePCC } = validError;
                if (!res) {
                    ePCC.error = true;
                }
                else
                    ePCC.error = false;
                setValidError({ ...validError, postalcodechecked: ePCC });

            })
            .catch(err => {
                console.log(err);
            });
    }

    const gotoStep = value => {
        if (value === 2) {
            if (checkStep1Validation()) {
                setStep(2);
            }
        }
    }

    useEffect(() => {

        console.log("phone-----", phone);

        let tel = new TelefonoArgentino(phone);

        setPhoneChecked(tel.isValid());

    }, [phone]);

    const setServicesValueDebounced = useRef(_.debounce(checkPostalCode, 1000));

    const handlePostalCode = e => {

        let value = e.target.value;
        setPostalCode(e.target.value);

        setServicesValueDebounced.current(value);

    }

    useEffect(() => {
        setStep1Valid(checkStep1());
    }, [postalcode, dwelling, surface]);

    useEffect(() => {
        setStep2Valid(checkStep2());
    }, [insuranceCompany, validUntil]);

    useEffect(() => {
        setStep3Valid(checkStep3());
    }, [name, email, phonechecked]);

    return (
        <div className="w-full flex bg-maingray" style={{ minHeight: "100vh" }}>
            <div className="w-2/5 bg-maingray hidden md:block">
                <div className="w-full max-w-518 ml-auto">
                    <div className="pl-8 lg:pl-16 xl:pl-24 1xl:pl-40 pt-8">
                        <a href="/"><img src={logo} alt="" /></a>
                        <div className="pl-6 pt-8">

                            <StepMarker
                                number={1}
                                content="Sobre tu hogar"
                                step={step}
                                list={[]}
                                self={dwelling}
                                tick={true}
                                pointer={true}
                                onClick={() => step > 1 ? setStep(1) : ""}
                            />
                            <StepMarker
                                number={2}
                                content="Tu seguro"
                                step={step}
                                list={[]}
                                self={dwelling}
                                tick={true}
                                pointer={true}
                                onClick={() => step > 2 ? setStep(2) : ""}
                            />
                            <StepMarker
                                number={3}
                                content="Tus datos"
                                step={step}
                                list={[]}
                                self={dwelling}
                                tick={false}
                                pointer={true}
                                onClick={() => step > 3 ? setStep(3) : ""}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-3/5 bg-maingray md:bg-mainpink md:rounded-tl-2xl md:rounded-tr-2xl">
                <div className="w-full max-w-778 mr-auto">
                    <div className="w-full pl-8 pt-15">
                        <div className="flex items-center">
                            <div className="flex items-center cursor-pointer" onClick={() => setStep(step - 1 === 0 ? 1 : step - 1)}>
                                {step !== 1 &&
                                    <img src={arrowleft} alt="" />
                                }
                                <p className="pl-2 text-purple font-OpenSansSemiBold text-lg">Paso {step} de 3</p>

                            </div>
                            {(step === 1 && !!postalcodechecked && !!dwelling && !!surface && isOwner !== 1) &&
                                <img src={arrowleft} alt="" className="transform rotate-180 cursor-pointer" onClick={() => setStep(step + 1)} />
                            }
                        </div>
                        <div className="block sm:hidden">
                            <CasaStepMarker step={step} />
                        </div>
                        <div className="pt-4 pl-2 sm:pl-8 lg:pl-16 pb-8 sm:pb-40">
                            {step === 1 &&
                                <>
                                    <p className="text-black font-SpartanBold text-xl md:text-2xl pb-4 pr-3 pt-6">Tu hogar</p>
                                    <p className="text-gray font-OpenSansRegular text-lg pb-8 pr-8">Logramos recopilar esta información de tu póliza pero<br className="hidden 1xl:block" /> nos gustaría que confirmes y completes la restante</p>
                                    <form className="pr-8 sm:pr-16 lg:pr-24 1xl:pr-40" onSubmit={sendData}>
                                        <div className="w-full">
                                            <div className="w-full mb-4 sm:mb-0 relative">
                                                <CustomInput type="text" special={true} name="Código postal" content={postalcode} error={validError.postalcodechecked.error} errorMsg={validError.postalcodechecked.msg} onChange={e => handlePostalCode(e)} />
                                                <div className="absolute top-4 right-4">
                                                    {postalcode.length !== 0 ?
                                                        <>
                                                            {
                                                                postalcodechecking ?
                                                                    <img src={loadingimg} className="w-6 h-6" alt="loading" />
                                                                    :
                                                                    <>
                                                                        {
                                                                            postalcodechecked ?
                                                                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 78.369 78.369" fill="#AAAAAA">
                                                                                    <path d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704 C78.477,17.894,78.477,18.586,78.049,19.015z" />
                                                                                </svg>
                                                                                :
                                                                                <img src={cross} className="w-6 h-6" alt="loading" />

                                                                        }
                                                                    </>
                                                            }
                                                        </>
                                                        :
                                                        <img src={cross} className="w-6 h-6" alt="loading" />
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-full mt-8 mb-4 sm:mb-0 z-10">
                                                <InputDropdownCasa type="text" error={validError.dwelling.error} errorMsg={validError.dwelling.msg} list={dwellingList} name="Tipo de vivienda" selected={dwellingList.filter(i => i.name === dwelling).length !== 0 ? dwellingList.filter(i => i.name === dwelling)[0].id : ""} onChange={(id) => setDwelling(dwellingList.filter(i => i.id === id)[0].name)} />
                                            </div>
                                            <div className="w-full mt-8 mb-4 sm:mb-0">
                                                <CustomInput type="text" name="Superficie" error={validError.surface.error} errorMsg={validError.surface.msg} content={surface} onChange={e => setSurface(e.target.value)} />
                                            </div>
                                        </div>
                                        <p className="text-xl sm:text-2xl font-SpartanBold text-black py-6">¿Qué relación tenés con tu hogar?</p>
                                        <div className="block sm:flex items-center">
                                            <div className="flex items-center cursor-pointer" onClick={() => setIsOwner(true)}>
                                                <img src={isOwner !== 1 && isOwner ? checked : unchecked} alt="unchecked" />
                                                <p className="text-gray font-OpenSansRegular text-lg pl-2">Propietario</p>
                                            </div>
                                            <div className="flex items-center cursor-pointer ml-0 sm:ml-6 mt-8 sm:mt-0" onClick={() => setIsOwner(false)}>
                                                <img src={isOwner !== 1 && !isOwner ? checked : unchecked} alt="unchecked" />
                                                <p className="text-gray font-OpenSansRegular text-lg pl-2">Inquilino</p>
                                            </div>
                                        </div>
                                        <div className="w-full text-right">
                                            <button type="button" className={`${step1Valid ? `bg-purple` : `bg-pink2`} text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-10 shadow-lg`} onClick={() => gotoStep(2)}>Siguiente</button>
                                        </div>
                                    </form>
                                </>
                            }
                            {step === 2 &&
                                <>
                                    <p className="text-black font-SpartanBold text-xl md:text-2xl pb-4 pr-3 pt-6">También, sobre vos</p>
                                    <div className="pr-8 sm:pr-16 lg:pr-24 1xl:pr-40">
                                        <div className="w-full">
                                            <CustomInput type="text" name="Compañía aseguradora" error={validError.insuranceCompany.error} errorMsg={validError.insuranceCompany.msg} content={insuranceCompany} onChange={e => setInsuranceCompany(e.target.value)} />
                                        </div>
                                        <div className="w-full mt-8">
                                            <InputCalendar
                                                date={validUntil}
                                                name="Vigencia hasta"
                                                // error={validError.validUntil.error}
                                                // errorMsg={validError.validUntil.msg}
                                                onChange={(date) => setValidUntil(date)}
                                            />
                                        </div>
                                        <div className="w-full text-right">
                                            <button type="button" className={`${step2Valid ? `bg-purple` : `bg-pink2`} text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-10 shadow-lg`}>Cotizar</button>
                                        </div>
                                    </div>
                                </>
                            }
                            {step === 3 &&
                                <>
                                    <p className="text-black font-SpartanBold text-xl md:text-2xl pb-4 pr-3 pt-6">También, sobre vos</p>
                                    <div className="pr-8 sm:pr-16 lg:pr-24 1xl:pr-40">
                                        <div className="w-full">
                                            <CustomInput type="text" name="Nombre y apellido" content={name} error={validError.name.error} errorMsg={validError.name.msg} onChange={e => setName(e.target.value)} />
                                        </div>
                                        <div className="w-full mt-8">
                                            <CustomInput type="email" name="Email" content={email} error={validError.email.error} errorMsg={validError.email.msg} onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div className="w-full mt-8 mb-4 sm:mb-0 relative">
                                            <CustomInput type="number" name="Celular" content={phone} error={validError.phone.error} errorMsg={validError.phone.msg} onChange={e => setPhone(e.target.value)} />
                                            <div className="absolute top-4 right-4">
                                                {phonechecked ?
                                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 78.369 78.369" fill="#AAAAAA">
                                                        <path d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704 C78.477,17.894,78.477,18.586,78.049,19.015z" />
                                                    </svg>
                                                    :
                                                    <img src={cross} className="w-6 h-6" alt="loading" />
                                                }
                                            </div>
                                        </div>
                                        <div className="w-full text-right">
                                            <button type="submit" className={`${step3Valid ? `bg-purple` : `bg-pink2`} text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-10 shadow-lg`}>Cotizar</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </div>
            {uploadModal && <MessagesModalCasa />}
            {loading && <ChargingModalCasa />}
        </div>
    )
}

export default CasaPolicyCheck;