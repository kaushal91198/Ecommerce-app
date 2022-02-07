import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import Loader from "../Components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux";
import AlertShow from "../Components/AlertShow";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertShow variant="danger" message={error} />
      ) : (
          <Row>
            {products.map((product) => {
              return (
                <Col md={4} key={product._id}>
                  <ProductScreen product={product}></ProductScreen>{" "}
                </Col>
              );
            })}
          </Row>
      )}
    </div>
  );
};

export default HomeScreen;
