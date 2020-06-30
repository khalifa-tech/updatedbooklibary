import React from 'react'
import { Navbar, Container, Col} from 'react-bootstrap';

const Footer = ({fix})=>{

    const allRight = {
        color: 'white',
        textAlign: 'center'
    }

    return(
        <Navbar bg="dark" fixed={fix} variant='dark' >
            <Container>
                <Col lg={12}>
                    <div style={allRight}>All Right reserved from Spring Boot App 2020</div>
                </Col>
            </Container>
         </Navbar>
    )
}

export default Footer;