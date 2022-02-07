import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userProfile, userUpdateProfile,listMyOrders } from "../redux";
import { LinkContainer } from "react-router-bootstrap";
import AlertShow from "../Components/AlertShow";
import Loader from "../Components/Loader";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { userInfo } = state.userLogin;
  const { loading, user, error } = state.userDetails;
  const {
    loading: loadingOrders,
    orders,
    error: errorOrders,
  } = state.orderListMy;
  const { success } = state.userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      navigate("../signin", { replace: true });
    } else {
      if (!user.name) {
        //First time open the page this condition will be executed
        dispatch(userProfile());
        dispatch(listMyOrders())
      } else {
        //Second time open the page this condition will be executed
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    password !== confirmPassword
      ? setMessage("Password and ConfirmPassword do not match")
      : dispatch(userUpdateProfile(name, email, password));
  };
  console.log(state.orderListMy)
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          {loading && <Loader />}
          {success && <AlertShow variant="danger" message={error} />}
          {error && <AlertShow variant="danger" message={error} />}
          {message && <AlertShow variant="danger" message={message} />}
          <Col md={3}>
            <h1>Update Information</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  onChange={(e) => {
                    SetConfirmPassword(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Button className="my-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h1>My orders</h1>
            {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <AlertShow variant="danger" message={errorOrders} />
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>DATE</td>
                  <td>TOTAL</td>
                  <td>PAID</td>
                  <td>DELIVERD</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDeleverd ? (
                        order.deleverdAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="dark">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
