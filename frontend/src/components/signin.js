import React from 'react'
import {Form, Button, Container, Col, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave} from '@fortawesome/free-solid-svg-icons'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import Navbar from './navbar'
import Footer from './footer'

export default class Signin extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            ress: '',
            fix: 'bottom'
        }

    }

    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    onSubmit = (e)=>{

        e.preventDefault();
       const login = {
          username : this.state.username,
          password : this.state.password
       }

       let options ={
        method: 'post',
        body: JSON.stringify(login),
        headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 'Access-Control-Allow-Origin': '*'
                 }
    }

    // let tempRef = (base64Stringuri) => `${base64Stringuri}`;

    // <img {tempRef(this.img)} />
    

    return fetch('http://localhost:90/api/author/login', options )
   .then((res)=>{
   
        this.setState({ ress : res})
    
    return res.json();
   })
   .then((data)=>{
    
    let response = this.state.ress.status
    if(response < 300){
    //   this.setState({error: 'You have successfully added a new author'})
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
       //localStorage.setItem('author', data);
      this.props.history.push('/author/welcome');
    }
    else{
      this.setState({error: 'Invalid credentials'})
      this.props.history.push('/author/signin')
    }
   
 })
 .catch(err => console.log(err))
   }
    render(){

        const {error, username, password} = this.state
            
        return(
            <>
            <Navbar/>
            <Container variant='dark'>
                <Col lg={5}>
                    <Form onSubmit={this.onSubmit} >
                        <br/>
                      <h3><span style={{color: 'green'}}> 
                      <FontAwesomeIcon icon={faPlusSquare} /></span> Login</h3>
                        <br/>
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Username</Form.Label>
                      <Form.Control required type="text" placeholder="username" name='username'
                        value={username} onChange={this.onChange}>
                        </Form.Control>
                      </Form.Group>
                      
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Last name</Form.Label>
                      <Form.Control required type="password" placeholder="password" name='password'
                        value={password} onChange={this.onChange}>
                        </Form.Control>
                      </Form.Group> 
                
                        <h5 style={{color: 'red'}}>{error}</h5>
                     <Row>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button variant="secondary" type="submit" style={{backgroundColor: 'green'}}>
                    <FontAwesomeIcon icon={faSave} /> Submit
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="danger" type="reset" >
                    <FontAwesomeIcon icon={faSave} /> Reset
                    </Button>
                    </Row>
                    </Form>
                </Col>
            </Container>
            <Footer fix={this.state.fix}/>
            </>
        )
}
       
}