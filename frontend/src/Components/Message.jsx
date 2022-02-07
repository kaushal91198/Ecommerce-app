import React from 'react'
import {Link} from 'react-router-dom';
const Message = (props) => {
    return (
        <div>
            <h4>Your Cart is Empty!</h4>
            <Link to="/" className="btn btn-sm btn-dark">
            <i className="fas fa-arrow-left"></i>GO BACK
          </Link>
        </div>
    )
}

export default Message
