import React, { useState, useEffect } from 'react';
import DropZone from 'react-drop-zone'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Modal from 'react-modal';

import './index.css';

import vector from '../../img/vector.png';
import uploadcloud from '../../img/upload-cloud.png';
import threelines from '../../img/three-lines.png';
import casaimg from '../../img/casa-img.png';
import casasecurity from '../../img/casa-security.png';
import casabalance from '../../img/casa-balance.png';
import casaclick from '../../img/casa-click.png';
import casacircle from '../../img/casa-circle.png';
import casahomeimage from '../../img/casa-home-image.png';
import casaprevious from '../../img/casa-previous.png';
import casanext from '../../img/casa-next.png';
import casacar from '../../img/casa-car.png';
import casabitcoin from '../../img/casa-bitcoin.png';
import casaother from '../../img/casa-other.png';
import purpledot from '../../img/casa-purple-dot.png';
import whitedot from '../../img/casa-white-dot.png';
import bottomimage from '../../img/casa-image-bottom.png';
import bottommobile from '../../img/casa-bottom-mobile.png';
import cross from '../../img/cross.png';

import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import MenuBar from '../../layouts/MenuBar';
import Question from '../../components/Question';

import { apiPolicyCreate, apiGetAutoQuestions } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';
import ChargingModalCasa from '../../components/LoadingModal/ChargingModalCasa';
import MessagesModalCasa from '../../components/LoadingModal/MessagesModalCasa';


const Casa = (props) => {

    let history = useHistory();

    const [defCarlist, setDefCarList] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);

    const [width, setWidth] = useState(2000);

    const policyCreate = (file) => {

        console.log("file-----", file);

        setModalIsOpen(true);

        let formData = new FormData();

        formData.append('policy', file);

        apiPolicyCreate(formData)
            .then(res => {
                console.log("res-----", res);

                return res.json();
            })
            .then(data => {
                console.log("data-----", data);

                if (!!data.errors) {
                    setModalIsOpen(false);
                    toast.error(data.errors.policy[0]);
                } else {
                    let { lead } = data;
                    localStorage.setItem('LeadID', lead.hash);
                }

            });

    }

    const goCasaSteps = (input) => {
        history.push("/casa/steps");
    }

    useEffect(() => {
        amplitudeLogEvent("Casa");
        setDefCarList([{ description: "Volkswagen Gol 1.6", id: 1 },
        { description: "Peugeot 208", id: 2 },
        { description: "Ford Fiesta", id: 3 },
        { description: "Chevrolet Corsa", id: 4 },
        { description: "Fiat Cronos", id: 5 },
        { description: "Toyota Corolla", id: 6 }]);

        apiGetAutoQuestions()
            .then(res => {
                console.log("res-----", res);
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading(false);
            })

        window.addEventListener('resize', onResize);

    }, []);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
        }
    };

    const closeUploadModal = () => {
        setUploadModal(false);
    }

    const onResize = () => {
        setWidth(window.innerWidth);
    }

    return (
        <>
            <Helmet>
                <title>Conseguí las mejores ofertas para el seguro de tu auto</title>
            </Helmet>
            <div className="w-full bg-maingray" style={{overflow: "hidden"}}>

                <Header />

                <div className="w-full bg-maingray md:bg-mainpink rounded-tl-2xl rounded-tr-2xl">
                    <div className="relative w-full max-w-1296 mx-auto bg-maingray md:bg-mainpink pb-8 px-8 sm:px-12 xl:px-24 1xl:px-32 pt-1 rounded-tl-2xl rounded-tr-2xl">

                        <div className="hidden md:block">
                            <MenuBar />
                        </div>

                        <div id="home" className="pt-2 md:pt-20 pb-2 z-10">
                            <div className="flex items-center pb-6">
                                <span className="text-lg text-purple font-OpenSansRegular">Incio</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansRegular">Seguros</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansBold">Hogar</span>
                            </div>

                            <div className="w-full block md:flex items-center justify-between">
                                <div className="w-full md:w-1/2 lg:w-3/5 pr-0 xl:pr-10">
                                    <div className="w-full py-4 lg:py-8 rounded-3xl">

                                        <div className="w-full">
                                            <img src={casaimg} alt="casaimg" className="w-full" />
                                        </div>

                                    </div>
                                </div>
                                <div className="text-left pt-4">
                                    <div className="text-left pl-0 md:pl-8">
                                        <p className="text-black font-OpenSansBold text-sm pb-2">¿Querés cotizar el seguro de tu hogar?</p>
                                        <p className="text-gray font-SpartanBold text-xl sm:text-3xl pb-6">Ahora podés hacerlo 100%<br className="hidden md:block" /> online, <span className="text-green2">fácil y rápido.</span></p>
                                        <p className="text-gray font-OpenSansRegular text-sm sm:text-base pb-8">Encontrá la mejor cobertura para tu<br className="hidden md:block" /> hogar cargando tu póliza o completando algunos datos :)</p>
                                        <div className="block sm:flex items-center justify-start">
                                            <button className="border border-purple bg-purple text-white w-full sm:w-auto px-12 py-3 font-RobotoMedium rounded-lg" onClick={() => setUploadModal(true)}>Subir poliza</button>
                                            <button className="border border-purple bg-mainpink text-purple w-full sm:w-auto px-6 py-3 font-RobotoMedium rounded-lg mt-4 sm:mt-0 ml-0 sm:ml-6" onClick={goCasaSteps}>Cotizar sin poliza</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full bg-maingray">
                    <div className="w-full mx-auto max-w-1296 z-30">
                        <div className="w-full flex pl-8 lg:pl-12 xl:pl-24 1xl:pl-32 pr-8 lg:pr-12 xl:pr-24 1xl:pr-64 py-4 sm:py-12 relative z-30">
                            <div className="w-full lg:max-w-1/2 text-center lg:text-left">
                                <p className="text-gray text-lg sm:text-3xl text-left sm:text-center font-SpartanSemiBold pt-0 sm:pt-10 pb-2">Sentite seguro.</p>
                                <p className="text-gray text-sm sm:text-base text-left sm:text-center font-OpenSansRegular">Descubrí el mejor plan para vos y empezá a despreocuparte.</p>
                                <div className="flex text-black2 pt-8 pb-10 justify-center lg:justify-start">
                                    <div className="mr-20">
                                        <img src={casasecurity} alt="security" className="mb-2" />
                                        <p className="text-base sm:text-xl text-black2 text-left font-OpenSansRegular tracking-wide"><span className="font-OpenSansBold">Protegé</span> tu hogar<br /> en sólo tres pasos.</p>
                                    </div>
                                    <div>
                                        <img src={casabalance} alt="casabalance" className="mb-2" />
                                        <p className="text-base sm:text-xl text-black2 text-left font-OpenSansRegular tracking-wide"><span className="font-OpenSansBold">Compará</span> las<br />diferentes coberturas</p>
                                    </div>
                                </div>
                                <div className="flex text-black2 pb-10 justify-center lg:justify-start">
                                    <div className="mr-12">
                                        <img src={casaclick} alt="casaclick" className="mb-2" />
                                        <p className="text-base sm:text-xl text-black2 text-left font-OpenSansRegular tracking-wide"><span className="font-OpenSansBold">Elegí</span> la mejor opción<br />para tu hogar.</p>
                                    </div>
                                    <div className="ml-2 md:ml-0 mr-6 md:mr-0">
                                        <img src={casacircle} alt="casacircle" className="mb-2" />
                                        <p className="text-base sm:text-xl text-black2 text-left font-OpenSansRegular tracking-wide"><span className="font-OpenSansBold">Contratá</span> tu seguro<br />100% online.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2 hidden lg:block relative">
                                <img src={casahomeimage} alt="home" className="absolute top-0 left-15 max-w-3/4 xl:max-w-none z-20" style={{ bottom: "-80px" }} />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-full bg-mainpink">
                    <div className="w-full mx-auto max-w-1296 pt-20 z-30">
                        <div className="w-full flex pl-8 lg:pl-12 xl:pl-24 1xl:pl-32 pr-8 lg:pr-12 xl:pr-24 1xl:pr-32 pt-15 xl:pt-56 pb-12 relative z-30">

                            <div className="block lg:flex">
                                <div className="pb-8 lg:pb-0" style={{ minWidth: "232px" }}>
                                    <p className="text-black font-OpenSansBold text-sm pb-2">TE PUEDE INTERESAR</p>
                                    <p className="text-gray font-SpartanBold text-3xl pb-6">Seguridad al<br />100%</p>
                                    <div className="flex items-center">
                                        <img src={casaprevious} alt="previous" className="cursor-pointer" />
                                        <img src={casanext} alt="next" className="cursor-pointer ml-4" />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="w-full flex items-center overflow-x-hidden p-2">
                                        <div className="rounded-lg mr-6" style={{ width: "392px" }}>
                                            <img src={casacar} alt="car" className="rounded-tl-lg rounded-tr-lg" />
                                            <div className="bg-white p-5 rounded-bl-lg rounded-br-lg">
                                                <p className="text-black font-OpenSansBold text-xs pb-1 uppercase">Seguro de auto</p>
                                                <p className="text-gray font-OpenSansRegular text-base pb-4">Nombre del producto</p>
                                                <p className="text-gray font-OpenSansBold text-xl pb-3">Nombre del producto</p>
                                            </div>
                                        </div>
                                        <div className="rounded-lg mr-6" style={{ width: "392px" }}>
                                            <img src={casabitcoin} alt="car" className="rounded-tl-lg rounded-tr-lg" />
                                            <div className="bg-white p-5 rounded-bl-lg rounded-br-lg">
                                                <p className="text-black font-OpenSansBold text-xs pb-1 uppercase">Categoria</p>
                                                <p className="text-gray font-OpenSansRegular text-base pb-4">Nombre del producto</p>
                                                <p className="text-gray font-OpenSansBold text-xl pb-3">Nombre del producto</p>
                                            </div>
                                        </div>
                                        <div className="rounded-lg mr-6" style={{ width: "392px" }}>
                                            <img src={casaother} alt="car" className="rounded-tl-lg rounded-tr-lg" />
                                            <div className="bg-white p-5 rounded-bl-lg rounded-br-lg">
                                                <p className="text-black font-OpenSansBold text-xs pb-1 uppercase">Seguro de auto</p>
                                                <p className="text-gray font-OpenSansRegular text-base pb-4">Nombre del producto</p>
                                                <p className="text-gray font-OpenSansBold text-xl pb-3">Nombre del producto</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex items-center pt-6 pb-10 mx-auto">
                                            <img src={purpledot} alt="purpledot" />
                                            <img src={whitedot} alt="whitedot" className="ml-2" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-mainpink">
                    <div className="w-full mx-auto max-w-1296 z-30">
                        <div className="w-full flex pl-8 lg:pl-12 xl:pl-24 1xl:pl-32 pr-8 lg:pr-12 xl:pr-24 1xl:pr-32 relative z-30">
                            <img src={width <= 400 ? bottommobile : bottomimage} alt="bottomimage" className="w-full object-none object-center rounded-2xl" />
                            <div className="absolute w-full h-full flex">
                                <div className="flex items-center">
                                    <div className="pl-2 pr-8 sm:pl-20 md:pr-0">
                                        <p className="text-white font-SpartanBold text-xl sm:text-3xl">Tu familia, tu bienestar.</p>
                                        <p className="text-white font-OpenSansRegular text-sm sm:text-base">Contratá la tranquilidad que necesitás.<br />Ahora 100% online, rápido y seguro.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-maingray relative z-10 overflow-hidden">

                    <div className="w-full bg-maingray xl:bg-transparent z-30 md:pt-50px">

                        <div className="w-full max-w-1296 mx-auto">
                            {questions.length !== 0 &&
                                <>
                                    <p className="font-SpartanSemiBold text-lg sm:text-2xl text-gray text-center pt-8 lg:pt-10 xl:pt-16 pb-4 md:pb-10 xl:pb-16 z-30">¿Alguna duda?</p>
                                    <div className="px-0 sm:px-12 xl:px-24 1xl:px-32 z-30">
                                        <div className="rounded-2xl bg-white px-10 sm:px-12 xl:px-16 py-2 shadow-lg">
                                            {questions.map((question, index) => (
                                                <Question
                                                    key={question.id}
                                                    title={question.title}
                                                    description={question.description}
                                                    hr={index !== questions.length - 1}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>

                        <Footer />

                    </div>

                    <div className="w-full bg-maingray xl:bg-mainpink rounded-bl-2xl rounded-br-2xl absolute top-0 z-minus10" style={{ height: "378px" }}></div>
                    <div className="w-full bg-maingray h-screen absolute z-minus10" style={{ top: "378px" }}></div>

                    <img src={threelines} alt="" className="absolute left-0 top-minus110 hidden xl:block z-minus5" />

                </div>

            </div>
            <ToastContainer />
            {modalIsOpen && <MessagesModalCasa />}
            {loading && <ChargingModalCasa />}
            <Modal
                isOpen={uploadModal}
                onRequestClose={closeUploadModal}
                style={customStyles}
            >
                <div className="w-full bg-white px-6 py-4 rounded-3xl relative">
                    <img src={cross} alt="cross" className="cursor-pointer absolute top-0 right-0" onClick={() => setUploadModal(false)} />
                    <DropZone onDrop={(file, text) => policyCreate(file)}>
                        {
                            ({ over, overDocument }) =>
                                <div>
                                    {
                                        over ?
                                            <div className="relative">
                                                <p className="text-lg sm:text-xl text-gray font-SpartanSemiBold text-center px-20 pt-8 pb-4">Subí tu <span className="text-green font-SpartanExtraBold">poliza</span> y accedé<br /> a los mejores precios</p>
                                                <div className="border border-dashed border-gray-400 bg-gradient-to-b from-white to-blue-100 rounded-2xl pt-2 pb-8 text-center">
                                                    <img src={uploadcloud} alt="" className="mx-auto mb-3 sm:mb-0" />
                                                    <p className="text-center text-purple text-lg pb-3 hidden sm:block">
                                                        Deslizá tu póliza<br /> hasta acá y compará
                                                    </p>
                                                    <button className="px-12 py-4 bg-purple text-white rounded-md shadow-lg">Subir póliza</button>
                                                </div>
                                                <div className="absolute w-full h-full flex items-center top-0 opacity-75 bg-white">
                                                    <p className="text-2xl font-SpartanBold mx-auto">¡Soltalo!</p>
                                                </div>
                                            </div>
                                            :
                                            overDocument ?
                                                <>
                                                    <p className="text-lg sm:text-xl text-gray font-SpartanSemiBold text-center px-20 pt-8 pb-4">Subí tu <span className="text-green font-SpartanExtraBold">poliza</span> y accedé<br /> a los mejores precios</p>
                                                    <div className="border border-dashed border-gray-400 bg-gradient-to-b from-white to-blue-100 rounded-2xl pt-2 pb-8 text-center">
                                                        <img src={uploadcloud} alt="" className="mx-auto mb-3 sm:mb-0" />
                                                        <p className="text-center text-purple text-lg pb-3 hidden sm:block">
                                                            Deslizá tu póliza<br /> hasta acá y compará
                                                        </p>
                                                        <button className="px-12 py-4 bg-purple text-white rounded-md shadow-lg">Subir póliza</button>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <p className="text-xl sm:text-2xl text-gray font-SpartanSemiBold text-center px-20 pt-8 pb-4">Subí tu <span className="text-green font-SpartanExtraBold">poliza</span> y accedé<br /> a los mejores precios</p>
                                                    <div className="border border-dashed border-gray-400 bg-gradient-to-b from-white to-blue-100 rounded-2xl pt-2 pb-8 text-center">
                                                        <img src={uploadcloud} alt="" className="mx-auto mb-3 sm:mb-0" />
                                                        <p className="text-center text-purple text-lg pb-3 hidden sm:block">
                                                            Deslizá tu póliza<br /> hasta acá y compará
                                                        </p>
                                                        <button className="px-12 py-4 bg-purple text-white rounded-md shadow-lg">Subir póliza</button>
                                                    </div>
                                                </>
                                    }
                                </div>
                        }
                    </DropZone>
                </div>
            </Modal>
        </>
    )
}

export default Casa;
