import React from 'react'
import { Navbar, Button ,NavDropdown, Nav, Form, FormControl} from 'react-bootstrap';
import logo from '../img/logo.jpg'

//https://medium.com/better-programming/secure-a-spring-boot-rest-api-with-json-web-token-reference-to-angular-integration-e57a25806c50

const myColor ={
    color: "white",
    marginLeft: 30
}

const hello = {
  color: 'white'
}
const Navbars = ({search, onChange, bookname, searchOutcome, names, trim})=>{

    return(
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/" style={myColor} > 
            <img src={logo} style={{width: 50, height: 50}}/> Book Libary</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href='/book/addbook' style={hello} >Add Book</Nav.Link>
            <Nav.Link href='/book/booklist' style={hello} >Book List</Nav.Link>
            <Nav.Link href='/author/signin' style={hello} >Sign In</Nav.Link>
            <Nav.Link href='/author/addauthor' style={hello} >Sign up</Nav.Link>
            <Nav.Link href='/author/authorlist' style={hello}>Author List</Nav.Link>
         
          </Nav>
         <Form inline>
          <FormControl type="text" placeholder="Search book" className="mr-sm-2" onKeyUp={search}
              onChange={onChange} value={bookname} name={names} onMouseOut={trim}
          />
          <p style={{color: 'white'}}>{searchOutcome} </p>
           </Form>
           </Navbar.Collapse>
      </Navbar>
    )
}

export default Navbars;

