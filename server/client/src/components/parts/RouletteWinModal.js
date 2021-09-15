import React, { Component, useRef, useState } from 'react';
import VoucherCardRoulette from '../cards/VoucherCardRoulette';
import throttle from 'lodash/throttle';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
import RouletteWinVoucherDialog from './RouletteWinVoucherDialog';
import RouletteLooseVoucherDialog from './RouletteLooseVoucherDialog';
import axios from 'axios';
import keys from '../../config/keys';
import { connect } from 'react-redux';
import { prizeService } from '../../functions/prizeNumberGen';

const WinModal = (props) => {
    const childRef = useRef();
    const showModal = () => childRef.current.handleClickOpen()

   
    if (props.open) {
        showModal();
    }

    switch(props.voucher.length){
        case 0:
            return (
                <RouletteLooseVoucherDialog ref={childRef} voucher={props.voucher} data={props.data} couponType={props.couponType} voucherReg={props.voucherReg} />
            )
        default:
            return (
                <>
                <RouletteWinVoucherDialog ref={childRef} voucher={props.voucher} data={props.data} couponType={props.couponType} voucherReg={props.voucherReg} />
                </>
            )
    }
    
}

export { WinModal }




class RouletteWinModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            voucher: [],
            error: null,
            isLoaded: false,
            prizeNo: 0
        };
    }

    componentDidMount() {
      


    };

    renderVoucher() {




        return this.state.voucher.map((article, i) => {
            return (
                <VoucherCardRoulette
                    key={article.name}
                    name={article.name}
                    picUrl={article.picUrl}
                    formTitle={article.formTitle}
                    formText={article.formText}
                    benefit={article.benefit}
                    tyyppi={article.tyyppi}
                    valid={article.valid}
                    dateStart={article.dateStart}
                    index={i}
                    clickHandler={throttle(() => this.moveArticle('articles', 'removedArticles', article.id), 800)}
                    {...article}
                />
            );
        });
    }


    render() {

        prizeService.onNumber().subscribe(async (number) => {
            if (number !== null) {
                this.setState({
                    prizeNo: number
                })

                await fetch("/api/cards")
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: false,
                                voucher: result.filter(x => x.tyyppi === 'Voucher' && x.voucherId === parseInt(this.state.prizeNo))
                            });
                            

                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
            }
        })



        


        return <WinModal
            voucher={this.renderVoucher()}
            open={this.props.show}
            couponType={this.props.couponType}
            data={this.props.data}
            voucherReg={this.props.vouchers}
        />

    }
}


function mapStateToProps(data) {
    return { data }
}

export default connect(mapStateToProps)(RouletteWinModal)

