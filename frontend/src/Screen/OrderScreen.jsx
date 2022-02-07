import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import AlertShow from "../Components/AlertShow";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../redux";
import Loader from "../Components/Loader";
const OrderScreen = () => {
  let params = useParams();
  let dispatch = useDispatch();
  let id = params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItmes.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  const successPaymentHandler = () => {
    const paymentResults = {
      id: id,
      status: "completed",
      update_time: new Date().toISOString(),
      email_address: "name@gmail.com",
    };
    dispatch(payOrder(id, paymentResults));
    dispatch(getOrderDetails(id));
  };
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertShow variant="danger" message={error} />
      ) : (
        <>
          <h2>Order {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup.Item variant="flush">
                <h2>Shipping</h2>
                <p>
                  <strong>Name : </strong>
                  {order.User.name}
                </p>
                <p>
                  <strong>Email : </strong>
                  {order.User.email}
                </p>
                <p>
                  <strong>Address :</strong>
                  {order.shippingAddress.address}&nbsp;
                  {order.shippingAddress.city}&nbsp;
                  {order.shippingAddress.postalcode}&nbsp;
                  {order.shippingAddress.country}&nbsp;
                </p>
                {order.isDeliverd ? (
                  <h5>{order.isDeliverd}</h5>
                ) : (
                  <h5>Not Delievered</h5>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method :</strong>
                  <strong>{order.paymentMethod}</strong>
                </p>
                {order.isPaid ? (
                  <h5>Paid On {order.paidAt}</h5>
                ) : (
                  <h5>Not Paid</h5>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItmes.length === 0 ? (
                  <AlertShow>Your Cart is Empty</AlertShow>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItmes.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X ${item.price} = ${item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <AlertShow variant="danger">{error}</AlertShow>}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={4}>
              {
                <ListGroup.Item>
                  <Button onClick={successPaymentHandler}>Payment</Button>
                </ListGroup.Item>
              }
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default OrderScreen;
