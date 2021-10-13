import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Modal from "react-modal"
import { useHistory } from "react-router-dom"
import OutsideClickHandler from "react-outside-click-handler"
import { isMobile } from "react-device-detect"

import logo from "../../img/logo.png"
import flowers from "../../img/flowers.png"
import right from "../../img/chevron-right.png"
import alertcircle from "../../img/alert-circle.png"
import edit from "../../img/edit.png"
import downsmall from "../../img/down-small.png"
import cross from "../../img/cross.png"
import filters from "../../img/filters.png"

import QuotationCheckBox from "../../components/QuotationCheckBox"
import RangeSlider from "../../components/RangeSlider"

import Footer from "../../layouts/Footer"
import HeaderWithoutHero from "../../layouts/HeaderWithoutHero"

import {
  apiGetQuotationData,
  apiGetBestQuotationData,
  apiGetModelByCodia,
} from "../../services/main"
import { amplitudeLogEvent, formatNumber, generateCompleteVersion } from "../../services/utils"

import "./index.css"
import QuotationFilterSetCasa from "../../components/QuotationFilterSetCasa"
import QuotationVerticalSelectCasa from "../../components/QuotationVerticalSelectCasa"
import QuotationSelectCasa from "../../components/QuotationSelectCasa"
import ChargingModalCasa from "../../components/LoadingModal/ChargingModalCasa"
import SlideShowCarouselCasa from "../../components/SlideShowCarouselCasa"
import CasaToolTip from "../../components/CasaToolTip"
import QuotationFilterModalCasa from "../../components/QuotationFilterModalCasa"
import CasaSmallToolTip from "../../components/CasaSmallToolTip"


const CasaQuotation = (props) => {

  Modal.setAppElement("#root")

  let history = useHistory()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [quotes, setQuotes] = useState([])
  const [allQuotes, setAllQuotes] = useState([])
  const [filteredQuotes, setFilteredQuotes] = useState([])
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [version, setVersion] = useState("")
  const [leadName, setLeadName] = useState("")

  const [showPriceTooltip, setShowPriceTooltip] = useState(false)
  const [showSumaTooltip, setShowSumaTooltip] = useState(false)

  // Filters

  const [price, setPrice] = useState(1200000)
  const [priceMin, setPriceMin] = useState(1400)
  const [priceMax, setPriceMax] = useState(1200000)
  const [insuranceSum, setInsuranceSum] = useState(12000000)
  const [insuranceSumMin, setInsuranceSumMin] = useState(1400)
  const [insuranceSumMax, setInsuranceSumMax] = useState(12000000)

  const [insurers, setInsurers] = useState([])
  const [insurersLength, setInsurersLength] = useState(3)
  const [months, setMonths] = useState([])

  const [selectedInsurers, setSelectedInsurers] = useState([])
  const [selectedMonths, setSelectedMonths] = useState([])

  const [fix, setFix] = useState(false)
  const [variable, setVariable] = useState(false)

  const [buttonsList, setButtonsList] = useState([])

  const [order, setOrder] = useState(1)

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const afterOpenModal = () => { }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
    },
  }

  useEffect(() => {
    amplitudeLogEvent("Casa/Quotation")

    apiGetBestQuotationData(
      props.match.params.vehicleID,
      props.match.params.leadID
    )
      .then((res) => {
        console.log("best-----", res)

        setQuotes(isMobile ? sortQuote(res.data.quotes) : res.data.quotes)

        setLeadName(res.data.lead.name);

        apiGetModelByCodia(res.data.code)
          .then(res => {
            setBrand(res.data.brand.name);
            setModel(res.data.group.name);
            setVersion(res.data.description);
            setLoading1(false);
          })
          .catch(err => {
            console.log("err-----", err);
            setLoading1(false);
          })

      })
      .catch((err) => {
        console.log("err-----", err)
        setLoading1(false);
      })

    apiGetQuotationData(props.match.params.vehicleID, props.match.params.leadID)
      .then((res) => {
        console.log("res------", res)
        setLoading2(false);
        setAllQuotes(res.data)
        setFilteredQuotes(res.data)

        let insurers_ = []
        let months_ = []
        let prices_ = []
        let insuranceSums_ = []
        res.data.forEach((quote) => {
          if (!insurers_.includes(quote.insurer)) {
            insurers_.push(quote.insurer)
          }
          if (!months_.includes(quote.months)) {
            months_.push(quote.months)
          }
          if (!prices_.includes(quote.price)) {
            prices_.push(quote.price)
          }
          if (!insuranceSums_.includes(quote.sumInsured)) {
            insuranceSums_.push(quote.sumInsured)
          }
        })
        setInsurers(insurers_.sort())
        setMonths(months_.sort())

        setPriceMin(Math.min(...prices_) >= 5 ? Math.floor(Math.min(...prices_) - 5) : 0)
        setPriceMax(Math.ceil(Math.max(...prices_) + 5))
        setPrice(Math.ceil(Math.max(...prices_) + 5))

        console.log("insurances_-----", insuranceSums_)
        console.log("max-----", Math.max(...insuranceSums_))

        setInsuranceSumMin(Math.min(...insuranceSums_) ? Math.floor(Math.min(...insuranceSums_) - 5) : 0)
        setInsuranceSumMax(Math.ceil(Math.max(...insuranceSums_) + 5))
        setInsuranceSum(Math.ceil(Math.max(...insuranceSums_) + 5))

      })
      .catch((err) => {
        console.log("err-----", err)
        setLoading2(false);
      })

    window.addEventListener("resize", handleResize)
  }, [])

  const sortQuote = (data) => {
    let high_ = []
    let normal_ = []
    data.forEach((item) => {
      if (item.isHighlighted) {
        high_.push(item)
      } else {
        normal_.push(item)
      }
    })
    return [...high_, ...normal_]
  }

  const sortList = (data) => {

    return data.sort(function (a, b) {

      let value = false;

      switch (order) {
        case 1:
          value = b.price - a.price;
          break;
        case 2:
          value = b.price - a.price;
          break;
        case 3:
          value = b.price - a.price;
          break;
        case 4:
          value = a.price - b.price;
          break;
      }

      return value;

    });

  }

  const handleResize = () => {
    let width = window.innerWidth
    if (width >= 1024) {
      setModalIsOpen(false)
    }
  }

  const handleInsurers = (value) => {
    if (selectedInsurers.includes(value)) {
      setSelectedInsurers(
        selectedInsurers.filter((item) => {
          return item !== value
        })
      )
    } else {
      setSelectedInsurers([value, ...selectedInsurers])
    }
  }

  const handleMonths = (value) => {
    let number = Number(value.slice(0, -6))

    if (selectedMonths.includes(number)) {
      setSelectedMonths(
        selectedMonths.filter((item) => {
          return item !== number
        })
      )
    } else {
      setSelectedMonths([number, ...selectedMonths])
    }
  }

  const handleButtonsList = (value) => {
    if (buttonsList.includes(value)) {
      setButtonsList(
        buttonsList.filter((item) => {
          return item !== value
        })
      )
    } else {
      setButtonsList([value, ...buttonsList])
    }
  }

  useEffect(() => {
    setFilteredQuotes(
      sortList(allQuotes.filter((item) => {
        return (
          ((selectedInsurers.length !== 0 &&
            selectedInsurers.includes(item.insurer)) ||
            selectedInsurers.length === 0) &&
          ((selectedMonths.length !== 0 &&
            selectedMonths.includes(item.months)) ||
            selectedMonths.length === 0) &&
          ((!fix && !variable) ||
            (fix && item.franchise > 10 && item.coverage.id === 5) ||
            (variable && item.franchise <= 10 && item.coverage.id === 5)) &&
          item.price < price &&
          item.sumInsured < insuranceSum &&
          ((buttonsList.length !== 0 &&
            buttonsList.includes(item.coverage.id)) ||
            buttonsList.length === 0)
        )
      }))
    )
  }, [
    selectedInsurers,
    selectedMonths,
    fix,
    variable,
    price,
    insuranceSum,
    buttonsList,
    order
  ])

  const goHiringPage = (id) => {
    let url = "/casa/hiring/data/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + id;
    history.push(url)
  }

  const filterRemove = () => {
    setSelectedInsurers([])
    setSelectedMonths([])
    setFix(false)
    setVariable(false)
    setPrice(priceMax)
    setInsuranceSum(insuranceSumMax)
    setButtonsList([])
    setInsurersLength(3)
  }

  const receiveData = (price_, insuranceSum_, selectedInsurers_, selectedMonths_, fix_, variable_) => {

    setPrice(price_);
    setInsuranceSum(insuranceSum_);
    setSelectedInsurers(selectedInsurers_);
    setSelectedMonths(selectedMonths_);
    setFix(fix_);
    setVariable(variable_);

  }

  useEffect(() => {
    if (!loading1 && !loading2) {
      setLoading(false);
    }
  }, [loading1, loading2]);

  return (
    <>
      <Helmet>
        <title>Las mejoras ofertas para {leadName}</title>
      </Helmet>
      <div className="w-full bg-pink8 overflow-remove">
        <HeaderWithoutHero name={generateCompleteVersion(brand, model, version)} leadName={leadName} />
        <div className="w-full relative bg-mainpink">
          {quotes.length !== 0 &&
            <SlideShowCarouselCasa quotes={quotes} goHiringPage={goHiringPage} />
          }
          <div className="w-full max-w-1296 mx-auto px-0 sm:px-12 xl:px-24 1xl:px-32 pb-0 sm:pb-6 bg-mainpink rounded-2xl">
            <div className="w-full relative">
              <div className="px-8 sm:px-0">
                <p className="font-SpartanBold text-xl sm:text-2xl text-black text-center">
                  Compará y encontrá el seguro que
                </p>
                <div className="w-full flex">
                  <div className="flex items-center mx-auto">
                    <p className="font-SpartanBold text-xl sm:text-2xl text-black text-center">
                      más se ajuste a tus necesidades
                    </p>
                    <img src={flowers} alt="flowers" className="ml-2" />
                  </div>
                </div>
              </div>

              <div className="w-full hidden md:block px-8 sm:px-0">
                <div className="w-full flex items-center justify-between border border-purple3 rounded-2xl pl-6 pr-6 lg:pr-24 py-5 mt-8">
                  <div className="flex items-center">
                    <p className="font-SpartanMedium text-xl text-black pr-8 xl:pr-16 hidden lg:block">
                      Tu hogar
                    </p>
                    <img src={right} alt="right" className="hidden lg:block" />
                    <p className="uppercase font-SpartanBold text-xl text-purple4 pl-0 lg:pl-8 xl:pl-16">
                      {generateCompleteVersion(brand, model, version)}
                    </p>
                  </div>

                  <a href={"/casa/steps?leadid=" + props.match.params.leadID + "&vehicleid=" + props.match.params.vehicleID}>
                    <button className="h-12 border border-purple2 px-8 flex items-center text-center text-purple2 font-RobotoMedium text-base rounded-md">
                      Editar vehículo
                      <img src={edit} alt="edit" className="pl-4" />
                    </button>
                  </a>
                </div>
              </div>

              <a
                href={
                  "/casa/steps?leadid=" +
                  props.match.params.leadID +
                  "&vehicleid=" +
                  props.match.params.vehicleID
                }
                className="w-full block md:hidden px-8 sm:px-0"
              >
                <div className="w-full flex items-center justify-between sm:border border-purple3 rounded-tl-2xl rounded-tr-2xl pl-6 pr-6 lg:pr-24 py-5 mt-8">
                  <p className="uppercase font-SpartanBold text-xl text-purple4 text-center">
                    {generateCompleteVersion(brand, model, version)}
                  </p>
                  <img src={edit} alt="edit" className="pl-4" />
                </div>
              </a>

              <div className="block lg:hidden">
                <div className="w-full flex border-t border-b border-purple3">
                  <div className="w-1/2 flex border-r border-purple3 cursor-pointer" onClick={() => setModalIsOpen(true)}>
                    <div className="flex items-center text-center mx-auto">
                      <img src={filters} alt="filters" />
                      <p className="font-OpenSansRegular text-lg text-gray5 pl-2 py-4">Filtros</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex items-center text-center mx-auto">
                      <CasaSmallToolTip order={order} handleOrder={(i) => setOrder(i)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex mt-4 px-8 sm:px-0">
                <div className="w-full hidden lg:block" style={{ maxWidth: "256px" }}>
                  <div className="w-full border border-purple3 py-4 pl-6 pr-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <p className="font-SpartanBold text-xl text-black">
                        Filtros
                      </p>
                      <p
                        className="font-OpenSansRegular text-base text-purple cursor-pointer select-none"
                        onClick={() => filterRemove()}
                      >
                        Eliminar filtros
                      </p>
                    </div>
                    <div className="border-b border-purple3">
                      <p className="font-SpartanBold text-lg text-black pt-3 pb-4">
                        Aseguradora
                      </p>
                      {insurers.length !== 0 &&
                        insurers.slice(0, insurersLength).map((insurer, index) => (
                          <div key={index} className="pb-4">
                            <QuotationCheckBox
                              label={insurer}
                              state={selectedInsurers.includes(insurer)}
                              onChange={handleInsurers}
                            />
                          </div>
                        ))}
                      {insurers.length > insurersLength && (
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => setInsurersLength(insurersLength + 3)}
                        >
                          <p className="font-OpenSansSemiBold text-purple text-base pb-4">
                            Ver más
                          </p>
                          <img src={downsmall} alt="downsmall" className="pb-2 ml-1" />
                        </div>
                      )}
                    </div>
                    <div className="border-b border-purple3">
                      <p className="font-SpartanBold text-lg text-black pt-3 pb-2">
                        Precio
                        <span className="font-SpartanMedium text-sm">/mes</span>
                      </p>
                      <div className="w-full flex items-center justify-between font-OpenSansRegular text-lg text-black">
                        <p>${formatNumber(priceMin)}</p>
                        <p>${formatNumber(priceMax)}</p>
                      </div>
                      <RangeSlider
                        min={priceMin}
                        max={priceMax}
                        format={(value) => {
                          return formatNumber(value)
                        }}
                        value={price}
                        onChange={(value) => setPrice(value)}
                      />
                    </div>
                    <div className="border-b border-purple3">
                      <div className="w-full flex items-center justify-between">
                        <p className="font-SpartanBold text-lg text-black pt-3 pb-2">
                          Suma asegurada
                        </p>
                        <div className="relative">
                          <img
                            src={alertcircle}
                            alt=""
                            className="cursor-pointer"
                            onMouseEnter={() => setShowPriceTooltip(true)}
                            onMouseLeave={() => setShowPriceTooltip(false)}
                          />
                          {showPriceTooltip && (
                            <div
                              className="absolute top-8 left-minus10 p-4 rounded-xl bg-purple2 text-white z-20"
                              style={{ width: "309px" }}
                            >
                              <p>
                                Monto máximo por el cual una aseguradora fija su
                                responsabilidad frente al asegurado.{" "}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between font-OpenSansRegular text-lg text-black">
                        <p>${formatNumber(insuranceSumMin)}</p>
                        <p>${formatNumber(insuranceSumMax)}</p>
                      </div>
                      <RangeSlider
                        min={insuranceSumMin}
                        max={insuranceSumMax}
                        format={(value) => {
                          return formatNumber(value)
                        }}
                        value={insuranceSum}
                        onChange={(value) => setInsuranceSum(value)}
                      />
                    </div>
                    <div className="border-b border-purple3">
                      <div className="w-full flex items-center justify-between">
                        <p className="font-SpartanBold text-lg text-black pt-3 pb-4">
                          Tipo de franquicia
                        </p>
                        <div className="relative">
                          <img
                            src={alertcircle}
                            alt=""
                            className="cursor-pointer"
                            onMouseEnter={() => setShowSumaTooltip(true)}
                            onMouseLeave={() => setShowSumaTooltip(false)}
                          />
                          {showSumaTooltip && (
                            <div
                              className="absolute top-8 left-minus10 p-4 rounded-xl bg-purple2 text-white z-20"
                              style={{ width: "309px" }}
                            >
                              <p>
                                Importe declarado en póliza el cual, ante un
                                siniestro, el asegurado debe hacerse cargo. De
                                sobrepasar ese valor, la compañía se hará cargo
                                del monto restante.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="pb-4">
                        <QuotationCheckBox
                          label="Fija"
                          state={fix}
                          onChange={() => setFix(!fix)}
                        />
                      </div>
                      <div className="pb-4">
                        <QuotationCheckBox
                          label="Variable"
                          state={variable}
                          onChange={() => setVariable(!variable)}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-SpartanBold text-lg text-black pt-3 pb-4">
                        Precio fijo durante
                      </p>
                      {months.length !== 0 &&
                        months.map((month, index) => (
                          <div key={index} className="pb-4">
                            <QuotationCheckBox
                              label={month + " meses"}
                              state={selectedMonths.includes(month)}
                              onChange={handleMonths}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="w-full pl-0 lg:pl-8">
                  <div className="md:flex items-center justify-between">
                    <QuotationFilterSetCasa buttonsList={buttonsList} handleButtonsList={handleButtonsList} />
                    <div className="hidden lg:block">
                      <CasaToolTip order={order} handleOrder={(i) => setOrder(i)} />
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    {filteredQuotes.length !== 0 &&
                      filteredQuotes.map((quote) => (
                        <QuotationVerticalSelectCasa
                          key={quote.id}
                          data={quote}
                          item={1}
                          selected={quote.isHighlighted ? 1 : 2}
                          goHiringPage={goHiringPage}
                        />
                      ))}
                  </div>
                </div>
              </div>

              <QuotationFilterModalCasa
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                price={price}
                priceMin={priceMin}
                priceMax={priceMax}
                insuranceSum={insuranceSum}
                insuranceSumMin={insuranceSumMin}
                insuranceSumMax={insuranceSumMax}
                insurers={insurers}
                months={months}
                receiveData={receiveData}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-1296 mx-auto bg-mainpink rounded-2xl block sm:hidden">
          <div className="w-full pt-8 relative bg-mainpink">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="flex py-2">
                <div className="mx-auto">
                  <QuotationSelectCasa
                    best={quote.isHighlighted}
                    data={quote}
                    goHiringPage={goHiringPage}
                    hrHide={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
        {loading && <ChargingModalCasa />}
      </div>
    </>
  )
}

export default CasaQuotation;
