import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../redux";
import AlertShow from "../Components/AlertShow";
import Loader from "../Components/Loader";
const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/signin";
  const navigate = useNavigate();
  const state = useSelector((state) => state.userSignup);
  const { loading, userInfo, error } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    password !== confirmPassword
      ? setMessage("Password and ConfirmPassword do not match")
      : dispatch(userSignup(name, email, password));
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Register</h1>
            {loading && <Loader />}
            {error && <AlertShow variant="danger" message={error} />}
            {message && <AlertShow variant="danger" message={message} />}
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
                Register
              </Button>
            </Form>
            <Row>
              <Col>
                Have a Account?
                <Link
                  to={`/signin`}
                >
                  Signin
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupScreen;
