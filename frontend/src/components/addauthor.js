import React from 'react'
import {Form, Button, Container, Col, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave} from '@fortawesome/free-solid-svg-icons'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import Navbar from './navbar'
import FormPicture from './FormPicture'
import './hanspet.css';
import Footer from './footer'

export default class Addauthor extends React.Component{

  constructor(props){
    super(props)
    this.state={

      loading: false,
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      cpassword: '',
      dob: '',
      ress : '',
      output: '',
      authorImg: '',
      user: '',
      exist: '',
      error: '',
      fix: 'absolute'
      
  }

  }

     onSubmit = (e)=>{

        e.preventDefault();

        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let dob = this.state.dob
        let username = this.state.username;
        let password = this.state.password;
        let authorImg = this.state.authorImg;
        let cpassword = this.state.cpassword;

        if(firstname.trim() === '' || lastname.trim() === '' || dob.trim() === ''
            || username.trim() === '' || password.trim() === '' ){

              return
            }

        if(password.trim() !== cpassword.trim()){

          return
        }

       const theauthor = {
          firstname : firstname,
          lastname : lastname,
          dob : dob,
          username: username,
          password: password,
          authorImg: authorImg
       }

       let options ={
        method: 'post',
        body: JSON.stringify(theauthor),
        headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 'Access-Control-Allow-Origin': '*'
                 }
    }

    return fetch('http://localhost:90/api/newauthor', options )
   .then((res)=>{
   
        this.setState({ ress : res})
    
    return res.json();
   })
   .then((data)=>{
    
    let response = this.state.ress.status
    if(response < 300){
      this.setState({output: 'You have successfully added a new author'})
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
      localStorage.setItem('author', data);
      this.props.history.push('/author/welcome');
    }
    else{
      this.setState({output: 'Something went wrong, please try again'})
      this.props.history.push('/author/addauthor')
    }
   
 })
 .catch(err => console.log(err))
   }

     onChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    checkPassword = ()=>{

      let password = this.state.password;
      let cpassword = this.state.cpassword;

      if(password.trim() !== cpassword.trim()){

        this.setState({error: 'Password and confirm password must match'})
      }
      else{
        this.setState({error: ''})
      }
    }

    checkUsername = () =>{
       let username = this.state.username;

      return fetch(`http://localhost:90/api/author/${username}`, {
        method: 'get',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
          }
      })
       .then(res =>{
          this.setState({user: res.status})
          return res.json();
       })
       .then(()=>{
          let response = this.state.user;
        if(response < 300){
          this.setState({exist: 'username already exist'})
        }
        else{
          this.setState({exist: ''})
        }
        console.log(response);
       })
       .catch(err => console.log(err))

    }

    render(){

        const {dob, firstname, lastname, username, authorImg,exist, error,
          user, cpassword,password,output} = this.state
        
        return(
          <>
          <Navbar/>
            <Container variant='dark' style={{marginLeft: 60}}>
                <Col lg={3}>
                    <Form onSubmit={this.onSubmit} >
                        <br/>
                      <h3><span style={{color: 'green'}}> 
                      <FontAwesomeIcon icon={faPlusSquare} /></span> Sign up</h3>
                        <br/>
                        
                      <Form.Group>
                      <Form.Control required type="text" placeholder="First name" name='firstname'
                      className="input"
                        value={firstname} onChange={this.onChange}>
                        </Form.Control>
                      </Form.Group>
                      
                      <Form.Group>
                      <Form.Control required type="text" placeholder="Last name" name='lastname'
                      className="input"
                        value={lastname} onChange={this.onChange}>
                        </Form.Control>
                      </Form.Group> 

                      <Form.Group>
                      <Form.Control required type="text" placeholder="username" name='username'
                      className="input"
                        value={username} onChange={this.onChange} onKeyUp={this.checkUsername} >
                        </Form.Control>
                        <p style={{color: 'red'}}>{exist} </p>
                      </Form.Group> 
                     
                       <Form.Group>
                      <Form.Control required type="text" placeholder="yyyy/mm/dd" name='dob'
                      className="input"
                          value={dob} onChange={this.onChange}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group>
                      <Form.Control required type="password" placeholder="Password" name='password'
                      className="input"
                        value={password} onChange={this.onChange}>
                        </Form.Control>
                      </Form.Group> 

                      <Form.Group>
                      <Form.Control required type="password" placeholder="Confirm Password" name='cpassword'
                      className="input"
                        value={cpassword} onChange={this.onChange} onBlur={this.checkPassword}>
                        </Form.Control>
                        <p style={{color: 'red'}}>{error} </p>
                      </Form.Group>
                     

                      <Form.Group>
                      <FormPicture name='authorImg' value={authorImg} onChange={this.onChange} />
                      
                       </Form.Group>

                        <h5>{output}</h5>
                     <Row>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button variant="secondary" type="submit" 
                      style={{backgroundColor: 'green', marginBottom: 15}}>
                    <FontAwesomeIcon icon={faSave} /> Submit
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="danger" type="reset" style={{ marginBottom: 15}} >
                    <FontAwesomeIcon icon={faSave} /> Reset
                    </Button>
                    </Row>
                    </Form>
                </Col>
            </Container>
            <Footer fix={this.state.fix} />
            </>
        )
    }
}
