import React from 'react'
import { Navbar, Button ,NavDropdown, Nav, Form, FormControl} from 'react-bootstrap';
import logo from '../img/logo.jpg'


const myColor ={
    color: "white",
    marginLeft: 30
}

const hello = {
  color: 'white'
}

const AuthorNav = ({logout, username, picture}) =>{

    return(
        <Navbar bg="dark" expand="lg">
           <Navbar.Brand href="/author/welcome" style={myColor} > 
           <img src={logo} style={{width: 50, height: 50}}/> Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href='/book/booklist' style={hello} >Book List</Nav.Link>
          <Nav.Link href='/author/authorlist' style={hello}>Author List</Nav.Link>
          <NavDropdown title="Action" id="basic-nav-dropdown">
          <NavDropdown.Item href='/book/addbook'>Add book</NavDropdown.Item>
          <NavDropdown.Item href='/author/welcome'>View booklist</NavDropdown.Item>
          <NavDropdown.Item href='/author/profile'>Edit Profile</NavDropdown.Item>
          <NavDropdown.Divider />
         <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
         </NavDropdown>
         </Nav>
        <Form inline>
       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        <img src={picture}  
        style={{width: 65,height: 60,  objectFit: "cover", marginLeft: 15,  
        maxWidth: "100%",  borderRadius: "50%"}} />
        <p style={{fontStyle: 'italic', color: 'white', marginLeft: 5}}>Welcome,
        &nbsp;<span style={{fontStyle: 'normal'}}>{username} </span>
        </p>
        </Form>
       </Navbar.Collapse>
    </Navbar>
  )
 
}

export default AuthorNav;

       