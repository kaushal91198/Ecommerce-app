import React,{ useState }  from 'react'
import {Alert,Button} from "react-bootstrap";
const AlertShow = (props) => {
  const [show, setShow] = useState(true);

    if(props.message && show ){
    return (
      <Alert variant={props.variant} onClose={() => setShow(false)} dismissible >
       {props.message}
      </Alert>
    );}
      return (
        <></>)
    
    
}

export default AlertShow
