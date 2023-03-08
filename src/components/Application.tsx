import React, { useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap';


const navBar = ({ children }: any) => {
    return (
        <Navbar bg="secondary" variant="secondary">
            <Container style={{ minWidth: '95vw' }} className='text-white'>
                <Navbar.Collapse>
                    {children}
                </Navbar.Collapse>
            </Container>
        </Navbar>)
}
export default navBar;