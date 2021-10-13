import React, { Component } from 'react'
import CarMoving from './CarMoving.js'
import Styled from 'styled-components'

import './index.css';

const ModalContainer = Styled.div`
    position: fixed;
    background-color: #73737399;
    top: 0px;
    width: 100%;
    height: 100%;
    margin: 0px;
    z-index: 9999;
`
export default class ChargingModal extends Component {

    render() {
        return (
            <ModalContainer>
                <div className="loading-modal w-4/5 sm:w-1/2 mx-auto white">
                    <CarMoving />
                    <h2 className="modal-title py-3 text-lg font-OpenSansBold">Estamos procesando tus datos</h2>
                    <p className="modal-text text-lg font-OpenSansRegular" id="modal-message">Cargando...</p>
                </div>
            </ModalContainer>
        )
    }
}
