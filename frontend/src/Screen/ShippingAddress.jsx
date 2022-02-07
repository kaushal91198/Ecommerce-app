import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux";
import CheckOutStep from "../Components/CheckOutStep";

const ShippingAddress = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address?shippingAddress.address:"");
  const [city, setCity] = useState(shippingAddress.city?shippingAddress.city:"");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode?shippingAddress.postalCode:"");
  const [country, setCountry] = useState(shippingAddress.country?shippingAddress.country:"");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address:address, city:city, postalCode:parseInt(postalCode), country:country}));
    navigate("../payment", { replace: true });
  };
  return (
    <div>
      <Container>
        <CheckOutStep step1 step2 />
        <Row className="justfy-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="postalcode">
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter postalcode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Button className="my-3" type="submit" variant="primary">
                continue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShippingAddress;
