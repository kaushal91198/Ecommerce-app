import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from "./Screen/HomeScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProductDetails from "./Screen/ProductDetails";
import CartScreen from "./Screen/CartScreen";
import LoginScreen from "./Screen/LoginScreen";
import SignupScreen from "./Screen/SignupScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import ShippingAddress from "./Screen/ShippingAddress";
import PaymentScreen from "./Screen/PaymentScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import OrderScreen from "./Screen/OrderScreen";
function App() {
  return (
    <>
    <Router>

    <Header/>
      <main className="my-3">
        <Container>
          <Routes>
          <Route exact path="/" element ={<HomeScreen/>}/>
          <Route exact path="/product/:id" element ={<ProductDetails/>}/>
          <Route exact path="/order/:id" element ={<OrderScreen/>}/>
          <Route exact path = "/signin" element = {<LoginScreen/>}/>
          <Route exact path = "/register" element = {<SignupScreen/>}/>
          <Route exact path = "/profile" element = {<ProfileScreen/>}/>
          <Route exact path = "/shippingaddress" element = {<ShippingAddress/>}/>
          <Route exact path = "/placeorder" element = {<PlaceOrderScreen/>}/>
          <Route exact path = "/payment" element = {<PaymentScreen/>}/>
          <Route exact path ="/cart" element={<CartScreen/>}>
            <Route exact path =":id/:qty" element={<CartScreen/>}/>
          </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
      </Router>
    </>
  );
}

export default App;
