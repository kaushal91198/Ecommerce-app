import React,{useState} from "react";
import { Form, Button, Col } from "react-bootstrap";
import { savePaymentMethod } from "../redux";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutStep from "../Components/CheckOutStep";
const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod,setPaymentMethod] = useState('paypal')
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if(!shippingAddress){
    navigate("../shippingaddress", { replace: true });
  }
  const submitHandler = (e) => {
    e.preventDefault(); 
     dispatch(savePaymentMethod(paymentMethod))
    navigate("../placeorder", { replace: true });
  };
  return (
    <div>
      <CheckOutStep step1 step2 step3 />
      <h1>Payment Screen</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              onChange={e=>setPaymentMethod(e.target.value )}
              checked
            ></Form.Check>
            
          </Col>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </div>
  );
};

export default PaymentScreen;
