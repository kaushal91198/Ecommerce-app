import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux";
import AlertShow from "../Components/AlertShow";
import Loader from "../Components/Loader";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  // console.log(location)
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const navigate = useNavigate();
  const state = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = state;
  const dispatch = useDispatch();
  useEffect(() => {
       if(userInfo){
           navigate(redirect, { replace: true })
        }
     
  }, [navigate,redirect,userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>SIGN IN</h1>   
            {loading && <Loader/>}
            {error && <AlertShow variant="danger" message={error} /> }
            <Form onSubmit={submitHandler}>
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
              <Button
                className="my-3"
                type="submit"
                variant="primary"
                
              >
                Sign in
              </Button>
            </Form>
            <Row>
              <Col>
                New Customar?
                <Link
                  to='/register'
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginScreen;
