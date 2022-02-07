import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { addToCart,removeFromCart } from "../redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import AlertShow from "../Components/AlertShow";
const CartScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const qty = parseInt(params.qty);
  const id = params.id;
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const item = cart.cartItems;
  //   console.log(item);
  useEffect(() => {
    if (id && qty) {
      dispatch(addToCart(id, qty));
      navigate(`../cart`, { replace: true });
    }
  }, [dispatch, id, qty,navigate]);
  //   console.log(item[0].product)

 const removeProductHandler = (productId)=>{
    // console.log(productId)
    dispatch(removeFromCart(productId))
 }
  const checkout=()=>{
   
    navigate(`../shippingaddress`, { replace: true })
  }
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cart.cartItems.length === 0 ? (
            <Message/>
          ) : (
            <ListGroup variant="flush">
              {item.map((x) => (
                <ListGroupItem key={x.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={x.image} alt={x.name} fluid rounded></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${x.product}`}>{x.name}</Link>
                    </Col>
                    <Col md={2}>${x.price}</Col>
                    <Col md={2}>{x.qty}</Col>
                    <Col md={2}>
                      <Button
                        className='btn btn-outline-dark btn-sm'
                        variant="light"
                       onClick={()=>{removeProductHandler(x.product)}}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                    <h2>subTotal: {item.reduce((acc,x)=>acc+x.qty,0)} items</h2>
                    ${item.reduce((acc,x)=>acc+x.qty*x.price,0).toFixed(2)}
                    </ListGroupItem>
                    <Button className='btn btn-outline-dark' variant="light" disabled={cart.cartItems.length === 0} onClick={checkout}>Proceed to checkout</Button>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
