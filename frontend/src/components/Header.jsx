import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
      try {
        await logoutApiCall().unwrap();

        dispatch(logout());

        navigate('/login');
        
      } catch (error) {
        console.log(error);
      }
  }

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
                      {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>
                      ) : (  <LinkContainer to="/login">
                        <Nav.Link  className="text-light"><FaUser /> Sign In </Nav.Link>
                      </LinkContainer>) }
                    
                    </Nav>
                </Navbar.Collapse>
            </Container> 
        </Navbar>
    </header>
  )
}

export default Header