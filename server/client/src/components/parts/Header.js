import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    renderContent() {
        console.log(this.props.auth)
        switch (this.props.auth.auth) {
            case false:
                return (<div className="row mr-2 ">
                    <li className="mr-3" key="1"><a href="/signin">Kirjaudu</a></li>
                    <li key="2"><a href="/signup">Rekisteröidy</a></li>
                </div>);
            default:
                return (<div className="row mr-2 ">
                    <li className="mr-3" key="1"><a href="/profile">Profiili</a></li>
                    <li><a href="/api/logout">Kirjaudu ulos</a></li>
                </div>)
        }
    }


    render() {
        return (
            <Navbar id="header" fixed="top" collapseOnSelect expand="lg" variant="light">
                {/* <Navbar.Brand className="logo" style={{ color: '#363a59' }} href="/">Growflow Insights</Navbar.Brand> */}
                <Link
                    to={this.props.auth.auth ? '/home' : '/'}
                    className="left logo"
                    style={{ color: '#363a59' }}
                >
                    Growflow Insights
                </Link>
                <Navbar.Toggle className="text-danger" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <Nav className="mr-auto">
                        <Nav.Link className="mylinks" href="#kukka">Visio</Nav.Link>
                        <Nav.Link className="mylinks" href="#kasvut">Kasvuvaikuttaja</Nav.Link>
                        <Nav.Link className="mylinks" href="#growflow">Growflow</Nav.Link>
                        <Nav.Link className="mylinks" href="#voima">Voima</Nav.Link>
                    </Nav> */}
                    <Nav className='ml-auto'>
                        {this.renderContent()}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(auth) {
    return { auth };

}

export default connect(mapStateToProps)(Header);