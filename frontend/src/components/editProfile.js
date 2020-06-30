import React from 'react'
import {Form, Button, Container, Col, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave} from '@fortawesome/free-solid-svg-icons'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import AuthorNav from './authorNavbar'
import FormPicture from './FormPicture'
import Footer from './footer'
import './hanspet.css';

export default class Profile extends React.Component{

  constructor(props){
    super(props)
    this.state={

      loading: false,
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      authorImg: '',
      authid: '',
      dob: '',
      ress : '',
      output: '',
      author: {}
      
  }

  }

  componentDidMount(){

    this.setState({loading: true})
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');


    let login ={
        username : username,
        password : password
    }

    let options = {
        method: 'post',
        body: JSON.stringify(login),
        headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 'Access-Control-Allow-Origin': '*',
                // "Authorization": "auth-token"
                 }
    }
    fetch('http://localhost:90/api/author/login', options)
    .then(response =>{
        
        if(response.status > 300){
            this.props.history.push('/author/signin')
        }
        return response.json();
    })
    .then(data =>{

        this.setState({
            author: data,
            loading: false
        })
        
    })
    .catch(err => console.log(err))
}


logOut = ()=>{

    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.props.history.push('/author/signin');

}
     onHandleupdate = (e)=>{

        e.preventDefault();
       const theauthor = this.state.author;

       let options ={
        method: 'put',
        body: JSON.stringify(theauthor),
        headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 'Access-Control-Allow-Origin': '*'
                 }
    }

    // let tempRef = (base64Stringuri) => `${base64Stringuri}`;

    // <img {tempRef(this.img)} />
    

    return fetch(`http://localhost:90/authors/${this.state.author.authid}`, options )
   .then((res)=>{
   
        this.setState({ ress : res.status})
    
    return res.json();
   })
   .then((data)=>{
    
    let response = this.state.ress
    if(response < 300){
      this.setState({output: 'Details updated successfully'})
     
      
    }
    else{
      this.setState({output: 'Something went wrong, please try again'})
      this.props.history.push('/author/profile')
    }
   
 })
 .catch(err => console.log(err))
   }

   

    render(){

        const {author ,username,  output} = this.state

         let tempRef = (base64Stringuri) => `${base64Stringuri}`;

        return(
          <>
          <AuthorNav logout={this.logOut} username={author.username} picture={tempRef(author.authorImg)} />
            <Container variant='dark'>
                <Col lg={8} >
                    <Row style={{marginLeft: 30}}>
                    <Form >
                        <br/>
                      <h3><span style={{color: 'green'}}> 
                      <FontAwesomeIcon icon={faPlusSquare} /></span> Edit Profile</h3>
                        <br/>
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>First Name</Form.Label>
                      <Form.Control required type="text" placeholder="Last name" name='firstname'
                        value={author.firstname} onChange={(e)=>{
                              author.firstname = e.target.value
                              this.setState({author})
                        }}>
                        </Form.Control>
                      </Form.Group>
                      
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Last name</Form.Label>
                      <Form.Control required type="text" placeholder="First name" name='lastname'
                        value={author.lastname}  onChange={(e)=>{
                            author.lastname = e.target.value
                            this.setState({author})
                      }}>
                        </Form.Control>
                      </Form.Group>  
                      
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Date of birth</Form.Label>
                      <Form.Control required type="text" placeholder="yyyy/mm/dd" name='dob'
                          value={author.dob}  onChange={(e)=>{
                            author.dob = e.target.value
                            this.setState({author})
                      }}>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group>
                      <FormPicture name='authorImg' value={author.authorImg}  onChange={(e)=>{
                              author.authorImg = e.target.value
                              this.setState({author})
                        }}/>
                      
                       </Form.Group>

                        <h5>{output}</h5>
                     <Row>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="secondary" type="submit" onClick={this.onHandleupdate}
                    style={{backgroundColor: 'green', marginBottom: 20}}>
                    <FontAwesomeIcon icon={faSave} /> Submit
                    </Button>
                    </Row>
                    </Form>
                    </Row>
                    
                </Col>
                
            </Container>
            <Footer fix='bottom'/>
            </>
        )
    }
}
