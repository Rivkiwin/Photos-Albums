import React, { useEffect } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Albums from './Albums/Albums';
import LogIn from './Auth/LogIn';
import Photos from './Albums/Photos';
import Logout from './Auth/Logout';
import { useAuth } from './AuthProvider';
import Register from './Auth/Register ';
import { useService } from './ServiceProvider';
import { Navbar, Container, Nav } from 'react-bootstrap';
import ForgotPassword from './Auth/forgetPassword';
import PasswordReset from './Auth/passwordReset';
import About from './about';

function NavBar() {
    const { currentUser } = useAuth();
    const { authService } = useService();
    const history = useHistory();

    function logOut() {
        localStorage.removeItem('token');
        authService.logout().then(() => {
            history.replace('/');
        })
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container style={{ minWidth: '95vw' }}>
                    <Navbar.Collapse>
                        <Navbar.Brand href="#home">Online Albums</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/About">About</Nav.Link>
                            <Nav.Link disabled={!currentUser} as={Link} to="/Albums/">Albums</Nav.Link>
                        </Nav>
                        {currentUser && <div className='d-flex align-items-center text-white'>
                            <div style={{ minWidth: 'fit-content' }} className='m-2'>
                                {`hello ${currentUser.displayName}`}</div>
                            <button className="dropdown-item text-white" onClick={logOut}>log out</button> </div>}
                        {!currentUser &&
                            <Nav.Link className="nav-item text-white" as={Link} to='/logIn'>log in</Nav.Link>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
               
                <Route path="/About">
                   <About/>
                </Route>
                <Route path='/forgot-password'>
                    <ForgotPassword />
                </Route>
                <Route path="/emulator/action" >
                    <PasswordReset /></Route>
                <Route path="/Logout">
                    <Logout />
                </Route>
                <Route path="/LogUp">
                    <Register />
                </Route>
                <Route exact path="/Albums">
                    <Albums />
                </Route>
                <Route exact path="/Albums/:id">
                    <Photos />
                </Route>
                <Route path={["/LogIn", '/']}>
                    <LogIn />
                </Route>
            </Switch>
        </>
    )
}
export default NavBar