import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AmplitudeProvider } from "@amplitude/react-amplitude";
import amplitude from "amplitude-js";

import './App.css';
import "./css/tailwind.output.css";
import './font/font.css';

import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Auto from './pages/Auto';
import Steps from './pages/Steps';
import PolicyCheck from './pages/PolicyCheck';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Questions from './pages/Questions';
import Quotation from './pages/Quotation';
import HiringData from './pages/HiringData';
import HiringVehicle from './pages/HiringVehicle';
import HiringPayment from './pages/HiringPayment';
import HiringCongrats from './pages/HiringCongrats';
import HiringPictures from './pages/HiringPictures';
import HiringHome from './pages/HiringHome';
import HiringCongrats1 from './pages/HiringCongrats1';
import Moto from './pages/Moto';
import MotoSteps from './pages/MotoSteps';
import MotoQuotation from './pages/MotoQuotation';
import HiringDataMoto from './pages/HiringDataMoto';
import HiringPicturesMoto from './pages/HiringPicturesMoto';
import ComingSoon from './pages/ComingSoon';
import Telephone from './pages/Telephone';
import Internet from './pages/Internet';
import TV from './pages/TV';
import Guarantee from './pages/Guarantee';
import CreditCard from './pages/CreditCard';
import PrepaidCard from './pages/PrepaidCard';
import WeLoan from './pages/WeLoan';
import CryptoPage from './pages/CryptoPage';
import Casa from './pages/Casa';
import CasaSteps from './pages/CasaSteps';
import CasaPolicyCheck from './pages/CasaPolicyCheck';
import CasaQuotation from './pages/CasaQuotation';
import HiringDataCasa from './pages/HiringDataCasa';

const AMPLITUDE_KEY = require("./config")['amplitudeKey'];


function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <React.Fragment>
      <AmplitudeProvider
        amplitudeInstance={amplitude.getInstance()}
        apiKey={AMPLITUDE_KEY}
      >
        <main className="w-full bg-maingray">
          <Switch>
            <Redirect from="/" exact to="/auto" />
            <Route path="/home" component={Home} />
            <Route path="/auto" component={Auto} />
            <Route path="/moto/home" component={Moto} />
            <Route path="/steps" component={Steps} />
            <Route path="/moto/steps" component={MotoSteps} />
            <Route path="/policy/:leadID/:vehicleID" component={PolicyCheck} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/contact" component={Contact} />
            <Route path="/questions" component={Questions} />
            <Route path="/quotation/:leadID/:vehicleID" component={Quotation} />
            <Route path="/moto/quotation/:leadID/:vehicleID" component={MotoQuotation} />
            <Route path="/hiring/data/:leadID/:vehicleID/:quoteID" component={HiringData} />
            <Route path="/hiring/vehicle/:leadID/:vehicleID/:quoteID" component={HiringVehicle} />
            <Route path="/hiring/payment/:leadID/:vehicleID/:quoteID" component={HiringPayment} />
            <Route path="/hiring/congrats/:leadID/:vehicleID/:quoteID" component={HiringCongrats1} />
            <Route path="/hiring/pictures/:leadID/:vehicleID/:quoteID" component={HiringPictures} />
            <Route path="/hiring/home/:leadID/:vehicleID/:quoteID" component={HiringHome} />
            <Route path="/moto/hiring/data/:leadID/:vehicleID/:quoteID" component={HiringDataMoto} />
            <Route path="/moto/hiring/pictures/:leadID/:vehicleID/:quoteID" component={HiringPicturesMoto} />
            <Route path="/casa/home" component={Casa} />
            <Route path="/casa/telephone" component={Telephone} />
            <Route path="/casa/internet" component={Internet} />
            <Route path="/casa/tv" component={TV} />
            <Route path="/casa/guarantee" component={Guarantee} />
            <Route path="/bancos/credit-card" component={CreditCard} />
            <Route path="/bancos/prepaid-card" component={PrepaidCard} />
            <Route path="/bancos/we-loan" component={WeLoan} />
            <Route path="/crypto" component={CryptoPage} />
            <Route path="/casa/steps" component={CasaSteps} />
            <Route path="/casa/policy/:leadID/:vehicleID" component={CasaPolicyCheck} />
            <Route path="/casa/quotation/:leadID/:vehicleID" component={CasaQuotation} />
            <Route path="/casa/hiring/data/:leadID/:vehicleID/:quoteID" component={HiringDataCasa} />
          </Switch>
          <ScrollToTop />
        </main>
      </AmplitudeProvider>
    </React.Fragment>
  );
}

export default App;
