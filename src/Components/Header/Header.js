import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={'/logo.jpg'}
                            alt="Logo"
                            className="logo img-fluid"
                            style={{ width: '200px', height: 'auto' }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
