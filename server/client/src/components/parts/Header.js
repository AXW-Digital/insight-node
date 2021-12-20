import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ChatBot from './ChatBot';


class Header extends React.Component {
    renderContent() {
        // console.log(this.props.auth)
        switch (this.props.data.auth) {
            case false:
                return (<Nav className='ml-auto justify-content-end'>
                    <Nav.Link className="mylinks" href="/signin">Kirjaudu</Nav.Link>
                    <Nav.Link className="mylinks" href="/signup">Rekisteröidy</Nav.Link>
                </Nav>);
            default:
                return (<Nav className='ml-auto justify-content-end'>
                    <Nav.Link className="mylinks" href="/profile">Profiili</Nav.Link>
                    <Nav.Link className="mylinks" href="/api/logout">Kirjaudu ulos</Nav.Link>
                </Nav>);
        }
    }


    render() {
        var data = { profile: {
            fName: 'Name',
            sName: '',
            email: 'email',
            userId: 'userId'
        }
    }

    if(this.props.data.profile === null){
        return (
            <Navbar id="header" fixed="top" collapseOnSelect expand="lg" variant="light" >
                <Link
                    to={this.props.data.auth ? '/home' : '/'}
                    className="left logo"
                    style={{ color: '#363a59' }}
                >
                    Vaikuttava
                </Link>
                <Navbar.Toggle className="text-danger" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {this.renderContent()}
                </Navbar.Collapse>
            </Navbar>
        );
    } else {
        return (
            <Navbar id="header" fixed="top" collapseOnSelect expand="lg" variant="light" >
                <Link
                    to={this.props.data.auth ? '/home' : '/'}
                    className="left logo"
                    style={{ color: '#363a59' }}
                >
                    Vaikuttava
                </Link>
                <ChatBot
                data = {this.props.data}
                />
                <Navbar.Toggle className="text-danger" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {this.renderContent()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
        
    }
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(Header);