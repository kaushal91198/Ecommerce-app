import React from 'react'
import { Container,Row, Col } from "react-bootstrap"; 

const Footer = () => {
    return (
        <>
         <footer>
            <Container> {/*  it means <div class="container"> */}
                <Row>
                    <Col className='text-center' md={12}> {/*  it means <div class="col-md-12"> */}
                        <span >Copyright &copy; Amazon Clone</span>
                    </Col>
                </Row>
             </Container>
        </footer>   
        </>
    )
}

export default Footer
