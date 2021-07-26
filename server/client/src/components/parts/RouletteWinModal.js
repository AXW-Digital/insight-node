import React, { Component, useRef, useState } from 'react';
import VoucherCardRoulette from '../cards/VoucherCardRoulette';
import throttle from 'lodash/throttle';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
import RouletteWinVoucherDialog from './RouletteWinVoucherDialog';
import axios from 'axios';
import keys from '../../config/keys';
import { connect } from 'react-redux';
import { prizeService } from '../../functions/prizeNumberGen';

const WinModal = (props) => {
    const childRef = useRef();
    const showModal = () => childRef.current.handleClickOpen()

    const [voucherData, setVoucherData] = useState(null)
    const [voucherSent, setVoucherSent] = useState(false)
    const [couponSent, setCouponSent] = useState(false)

    function getVoucherData(id) {
        const url = keys.adminUrl + '/api/vouchers/reg/' + id
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setVoucherData(res.data)
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }



    if (props.open) {
        showModal();
    }

    return (
        <>
            <RouletteWinVoucherDialog ref={childRef} voucher={props.voucher} data={props.data} couponType={props.couponType} voucherReg={props.voucherReg} />
        </>
    )
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

        prizeService.onNumber().subscribe((number) => {
            if (number !== null) {
                this.setState({
                    prizeNo: number
                })

                fetch("/api/cards")
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: false,
                                voucher: result.filter(x => x.tyyppi === 'Voucher' && x.voucherId === this.props.prizeNo)
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

