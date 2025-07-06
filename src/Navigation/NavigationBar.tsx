import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router';

export const NavigationBar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <div className='me-3'>
            <NavLink to="/" className='text-decoration-none'>
              Logo Here
            </NavLink>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className='me-3'>
                <NavLink to="/" className='text-decoration-none'>
                  Home
                </NavLink>
              </div>
              <NavLink to="/item-list" className='text-decoration-none'>
                Item List
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}