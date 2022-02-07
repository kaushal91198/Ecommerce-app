import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from '../Components/Rating'
import {Link} from "react-router-dom"

const ProductScreen = (props) => {
  return (
    <>
    <Card className="my-3 p-3 rounded">
      <Link to={`product/${props.product._id}`}>
        <Card.Img src={props.product.image} variant="top"/>
      </Link>
      <Card.Body>
        <Link to={`product/${props.product._id}`}>
          <Card.Title as='div'>
         <strong>{props.product.name}</strong> 
          </Card.Title>
        </Link>
        <Card.Text as ="div">
          <Rating value={props.product.rating} text={`${props.product.numReviews}`}/>
        </Card.Text>
        <Card.Text as ="div">
         ${props.product.price}
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default ProductScreen
