import {Navbar, Nav, Container, Badge} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';

import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
        <Navbar bg="danger" expand="lg" collapseOnSelect>
           <Container>
            <LinkContainer to='/'>
                <Navbar.Brand  className="text-light">E2C</Navbar.Brand>
            </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-whit">
                      <LinkContainer to="/cart">
                        <Nav.Link className="text-light"><FaShoppingCart /> Cart {
                          cartItems.length > 0 && (
                            <Badge pill bg='success' style={{marginLeft: '5px'}}>
                              { cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </Badge>
                          )
                        } </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <Nav.Link  className="text-light"><FaUser /> Sign In </Nav.Link>
                      </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container> 
        </Navbar>
    </header>
  )
}

export default Header