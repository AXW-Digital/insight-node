import React, { Component, useRef } from 'react';
import VoucherCardRoulette from '../cards/VoucherCardRoulette';
import throttle from 'lodash/throttle';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
import RouletteWinVoucherDialog from './RouletteWinVoucherDialog';



const WinModal = (props) => {
    const childRef = useRef();
    const showModal = () => childRef.current.handleClickOpen()
    
    if (props.open){
        showModal()
    }

    return (
        <>
            <RouletteWinVoucherDialog ref={childRef} voucher={props.voucher} />             
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
        };
    }

    componentDidMount() {
        fetch("http://13.48.5.73:3030/api/cards")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: false,
                        voucher: result.filter(x => x.tyyppi === 'Voucher' && x.id === this.props.voucherFilter)
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )


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
        voucher = {this.renderVoucher()}
        open = {this.props.show}/>
        
    }
}

export default RouletteWinModal;