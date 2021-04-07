import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'


class Header extends React.Component {
    render() {
        return (
            <Navbar id="header" fixed="top" collapseOnSelect expand="lg"  variant="light">
            <Navbar.Brand className="logo" style={{color: '#363a59'}} href="/">Growflow Insights</Navbar.Brand>
            <Navbar.Toggle className="text-danger" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link className="mylinks" href="#kyselyt">Kyselyt</Nav.Link>
                <Nav.Link className="mylinks" href="#menutestaus">Menutestaukset</Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
                <Nav.Link href="/profile" className="mylinks mr-2">Profiili</Nav.Link>
            </Nav>
            
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default Header;