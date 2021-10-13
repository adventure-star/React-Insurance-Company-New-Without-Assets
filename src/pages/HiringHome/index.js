import React, { useState, useEffect } from 'react'

import SlideShow from '../../components/SlideShow';

import HeaderHiring from '../../layouts/HeaderHiring';

import { apiGetHomeData, apiGetQuotationDataById, apiGetPreLoadedData } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';


const HiringHome = (props) => {

    const [quote, setQuote] = useState({});

    const [leadName, setLeadName] = useState("");

    const [offers, setOffers] = useState([]);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {

        amplitudeLogEvent("Hiring-Home");

        apiGetHomeData()
            .then(res => {
                console.log("res-----", res);
                setOffers(res.data.offers);
                setLoading1(false);
            })
            .catch(err => {
                console.log(err);
                setLoading1(false);
            });

        apiGetQuotationDataById(props.match.params.quoteID)
            .then(res => {
                console.log("res-----", res);
                setQuote(res.data);
                setLoading2(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading2(false);
            });

        apiGetPreLoadedData(props.match.params.leadID, props.match.params.vehicleID, props.match.params.quoteID)
            .then(res => {
                setLeadName(res.data.lead.name);
                setLoading3(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading3(false);
            });

    }, []);

    useEffect(() => {
        if(!loading1 && !loading2 && !loading3) {
            setLoading(false);
        }
    }, [loading1, loading2, loading3]);


    return (
        <>
            <div className="w-full bg-pink8">

                <div className="w-full max-w-1296 mx-auto relative bg-pink8 pb-12" style={{ minHeight: "100vh" }}>
                    <HeaderHiring quotationitem={true} logoID={(quote !== 0 && !!quote.insurerObj) ? quote.insurerObj.id : false}>

                        <div className="">
                            <p className="text-xl sm:text-3xl font-SpartanBold text-black text-left sm:text-center pb-2 sm:pb-12 md:pb-0">
                                <span>
                                    ¡Felicitaciones {leadName}! 🎉
                                </span>
                            </p>
                        </div>

                    </HeaderHiring>

                    <div className="w-full px-8 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="pb-2 z-10 hidden md:block">
                            <p className="text-lg sm:text-xl text-gray font-SpartanSemiBold">
                                ¿Te imaginás todo lo que<br /> podrías <span className="text-green font-SpartanExtraBold">ahorrar</span> por mes?
                            </p>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-10">

                            {offers.map(item => (
                                <div key={item.id} className="max-w-352 w-full px-4 py-4 mx-auto" style={{ width: "352px" }}>
                                    <div className="w-full bg-white p-4 lg:p-6 rounded-2xl relative shadow-lg">
                                        <span className={`${item.labelColor === "blue" ? `text-blue-600 bg-blue` : (item.labelColor === "green" ? `text-green1 bg-green2` : (item.labelColor === "pink" ? ` text-pink bg-pink` : (item.labelColor === "yellow" ? `text-yellow1 bg-yellow` : `text-black bg-indigo-400`)))} font-OpenSansBold px-2 py-1 absolute top-10 left-10 rounded-md`}>{item.label}</span>
                                        <SlideShow list={item.image} />
                                        <p className="text-lg sm:text-xl text-black font-SpartanBold pt-6">{item.title}</p>
                                        <p className="text-sm font-OpenSansRegular text-gray pb-3">{new Date(item.published_at).toLocaleDateString("en-US", options)}</p>
                                        <a href={item.link}>
                                            <button className="px-10 py-3 text-base border border-purple rounded-md text-purple font-RobotoMedium">Cotizar ahora</button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/">
                            <button type="button" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-12 shadow-lg">Home</button>
                        </a>
                    </div>

                </div>
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default HiringHome;
