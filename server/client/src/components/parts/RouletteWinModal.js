import React, { Component, useRef, useState } from 'react';
import VoucherCardRoulette from '../cards/VoucherCardRoulette';
import throttle from 'lodash/throttle';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
import RouletteWinVoucherDialog from './RouletteWinVoucherDialog';
import axios from 'axios';
import keys from '../../config/keys';
import { connect } from 'react-redux';


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



    const reduceCoupons = () => {

        // dummy voucher id
        const voucherId = 0

        var bronzeCoupons, silverCoupons, goldCoupons
        bronzeCoupons = silverCoupons = goldCoupons = 0
        switch (props.couponType) {
            case 'bronze':
                bronzeCoupons = -1
                break
            case 'silver':
                silverCoupons = -1
                break
            case 'gold':
                goldCoupons = -1
                break
            default:
                bronzeCoupons = silverCoupons = goldCoupons = 0
                break
        }

        var coupons = { bronzeCoupons, silverCoupons, goldCoupons }


        const url = keys.adminUrl + '/api/vouchers/reg/' + voucherId

        axios.get(url)
            .then(res => {
                setVoucherData(res.data)
            })
            .catch(err => {
                console.log(err)
            })





        const userId = props.data.profile._user


        if (voucherData !== null && !voucherSent) {
            const {
                partnerId,
                benefitValue,
                benefitType,
                name
            } = voucherData[0]


            const data = {
                userId,
                voucherId,
                partnerId,
                benefitValue,
                benefitType,
                name
            }

            axios.post('http://localhost:3030/api/vouchers', data)
                .then(res => {
                    console.log(res)
                    setVoucherSent(true)
                })
                .catch(err => {
                    console.log(err)
                })

            axios.post('/api/profile/coupons', coupons)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        setCouponSent(true)
                    }


                })
                .catch(err => {
                    console.log(err)
                })

        }

    }









    if (props.open) {
        showModal();
        //reduceCoupons();
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
            voucherReg:[]
        };
    }

    componentDidMount() {
        fetch(keys.adminUrl + "/api/cards")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: false,
                        voucher: result.filter(x => x.tyyppi === 'Voucher' && x.id === this.props.voucherFilter)
                    });

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )


        const url = keys.adminUrl + '/api/vouchers/reg/0'  //TODO: update admin panel to query all vuochers and then use winning number to filter
        
        axios.get(url)
            .then(res => {
                console.log(res.data)
                this.setState({
                    voucherReg: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })



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



        return <WinModal
            voucher={this.renderVoucher()}
            open={this.props.show}
            couponType={this.props.couponType}
            data={this.props.data}
            voucherReg={this.state.voucherReg}
        />

    }
}


function mapStateToProps(data) {
    return { data }
}

export default connect(mapStateToProps)(RouletteWinModal)

