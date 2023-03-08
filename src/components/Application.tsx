import React, { useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap';


const navBar = (props: any) => {
    return (
        <Navbar bg="secondary" variant="secondary">
            <Container style={{ minWidth: '95vw' }} className='text-white'>
                <Navbar.Collapse>
                    {props.children}
                </Navbar.Collapse>
            </Container>
        </Navbar>)

}
export default navBar;