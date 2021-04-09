import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    renderContent() {
        console.log(this.props.auth)
        switch (this.props.auth.auth) {
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
        return (
            <Navbar id="header" fixed="top" collapseOnSelect expand="lg" variant="light" >
                <Link
                    to={this.props.auth.auth ? '/home' : '/'}
                    className="left logo"
                    style={{ color: '#363a59' }}
                >
                    Growflow Insights
                </Link>
                <Navbar.Toggle className="text-danger" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav ">
                    {/* <Nav className="mr-auto">
                        <Nav.Link className="mylinks" href="#kukka">Visio</Nav.Link>
                        <Nav.Link className="mylinks" href="#kasvut">Kasvuvaikuttaja</Nav.Link>
                        <Nav.Link className="mylinks" href="#growflow">Growflow</Nav.Link>
                        <Nav.Link className="mylinks" href="#voima">Voima</Nav.Link>
                    </Nav> */}

                        {this.renderContent()}


                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(auth) {
    return { auth };

}

export default connect(mapStateToProps)(Header);