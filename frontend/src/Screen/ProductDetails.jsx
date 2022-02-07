import React, { useState,useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailProducts } from "../redux";
import Loader from "../Components/Loader";
import AlertShow from "../Components/AlertShow";
import Rating from "../Components/Rating";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";

const ProductDetails = () => {
  let params = useParams();
  let dispatch = useDispatch();
  const [qty,setQty] =  useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, products, error } = productDetails;
  let id = params.id;
  const navigate = useNavigate();

  const addToCartHandler =()=>{
    navigate(`../cart/${id}/${qty}`, { replace: true })
  }

  useEffect(() => {
    dispatch(detailProducts(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertShow variant="danger" message={error} />
      ) : (
        <>
      
          <Link to="/" className="btn btn-dark">
            <i className="fas fa-arrow-left"></i>GO BACK
          </Link>
          <Row>
            <Col md={6}>
              <Image src={products.image} alt={products.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{products.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={products.rating} text={products.numReviews} />
                </ListGroupItem>
                <ListGroupItem>Price:${products.price}</ListGroupItem>
                <ListGroupItem>{products.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {products.countInStock > 0 ? "In stock" : "Out of stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                {products.countInStock>0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Form.Control as="select" value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                      {
                      [...Array(products.countInStock).keys()].map((x)=>{return <option key={x+1} value={x+1}>{x+1}</option>})
                      //this is es6 emthod of creating array.
                      }  {/* if countInStock value is 6 then we get the value[1,2,3,4,5,6,] */}
                      </Form.Control>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button className="btn-block" disabled={products.countInStock <= 0 } onClick={addToCartHandler}>Add to cart</Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
