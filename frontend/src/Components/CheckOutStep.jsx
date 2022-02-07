import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const CheckOutStep = (props) => {
  return (
    <div>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {props.step1 ? (
            <LinkContainer to="/signin">
              <Nav.Link>SignIn</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>SignIn</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {props.step2 ? (
            <LinkContainer to="/shippingaddress">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {props.step3 ? (
            <LinkContainer to="/payment">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {props.step4 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>PlaceOrder</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>PlaceOrder</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default CheckOutStep;
