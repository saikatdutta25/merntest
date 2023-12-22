// Layout.js

import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken, removeAuthToken } from '../../utils/Auth';
import { API_LOGOUT_ALL } from '../../Api/Api';

const Layout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = getAuthToken();
            setIsLoggedIn(!!token);
        };

        checkAuthStatus();
    }, [isLoggedIn]);

    const handleLogout = async () => {
        try {
            const authToken = getAuthToken();
            if (authToken) {
                await axios.post(API_LOGOUT_ALL, null, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
            }
            removeAuthToken();
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error logging out from all devices:', error);
        }
    };
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">My Todo App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/todos">Todo</Nav.Link>
                                <Nav.Link onClick={handleLogout} as={Link} to="/">LogOut</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container-fluid">
                {children}
            </div>
        </div>
    );
};

export default Layout;
