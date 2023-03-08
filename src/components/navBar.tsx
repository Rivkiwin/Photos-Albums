import React, { useEffect } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Albums from './Albums/Albums';
import Body from './Body';
import Info from './Info';
import LogIn from './Auth/LogIn';
import Photos from './Albums/Photos';
import Posts from './Posts';
import Todos from './Todos';
import Logout from './Auth/Logout';
import { useAuth } from './AuthProvider';
import Register from './Auth/Register ';
import { useService } from './ServiceProvider';
import Protected from './Application';
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavBar() {
    const { currentUser } = useAuth();
    const { authService } = useService()

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
                            <button className="dropdown-item text-white" onClick={authService.logout}>log out</button> </div>}
                        {!currentUser && 
                        <Nav.Link className="nav-item text-white" as={Link} to='/logIn'>log in</Nav.Link>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route path="/LogIn">
                    <LogIn />
                </Route>
                <Route path="/Info">
                    <Info />
                </Route>
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
            </Switch>
        </>
    )
}
export default NavBar