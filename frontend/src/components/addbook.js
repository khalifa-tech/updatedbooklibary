import React from 'react'
import axios from 'axios'
import {Form, Button, Container, Col, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave} from '@fortawesome/free-solid-svg-icons'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import FormPicture from './FormPicture'
import './hanspet.css';
import AuthorNav from './authorNavbar'
import Footer from './footer'

export default class Addbook extends React.Component{

    state={

        loading: false,
        bookname: '',
        bookimg: '',
        bookprice: '',
        res: '',
        output: '',
        validb: '',
        validp: '',
        author: {},
        fix: 'bottom'
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

     onSubmit = (e)=>{

        e.preventDefault();

        const bookname = this.state.bookname;
        const bookprice = this.state.bookprice;

        if(bookname.trim() === '' || bookprice.trim() === ''){
            return
        }

        const book = {
            bookname: bookname,
            bookprice: bookprice,
            bookimg: this.state.bookimg
        }
        let options ={
            method: 'post',
            body: JSON.stringify(book),
            headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     'Access-Control-Allow-Origin': '*'
                     }
        }
        
        return fetch(`http://localhost:90/api/books/${this.state.author.authid}/book`, options )
        .then((response)=>{
            this.setState({
                res: response.status
            })
            console.log(this.state.res)
            return response.json();
        })
        .then(data =>{
            let outcome = this.state.res
            if(outcome < 300){
                this.setState({
                    output: 'You have successfully added a new book, You can add a another book',
                    bookname: '',
                    bookprice: '',
                    bookimg: ''
                })
            }
            else{
                this.setState({output: 'Something went wrong, please try again'})
            }
            console.log(data);
            console.log(this.state.author.authid)
        })
        .catch(error => console.log(error))
    }

     onChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    validateBookname = () =>{
        let bookname = this.state.bookname;
        if(bookname.trim() === ''){
            this.setState({validb: 'This field cannot be left empty'})
        }
        else{
            this.setState({validb: ''})
        }
    }

    validateBookprice = ()=>{
        let bookprice = this.state.bookprice;
        if(bookprice.trim() === ''){
            this.setState({validp: 'This field cannot be left empty'})
        }else{
            this.setState({validp: ''})
        }
    }

    render(){

        const {bookname, bookprice, bookimg, output, validb, validp, author, res} = this.state

        let tempRef = (base64Stringuri) => `${base64Stringuri}`;

        return(
            <>
            <AuthorNav logout={this.logOut} username={author.username} picture={tempRef(author.authorImg)} />
            <Container variant='dark'>
                <Col lg={5}>
                    <Form  onSubmit={this.onSubmit} >
                        <br/>
                      <h3><span style={{color: 'green'}}> 
                      <FontAwesomeIcon icon={faPlusSquare} /></span> Add Book</h3>
                        <br/>
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Book Name</Form.Label>
                      <Form.Control required type="text" placeholder="Book name" name='bookname'
                        value={bookname} onChange={this.onChange} onBlur={this.validateBookname}>
                        </Form.Control>
                      </Form.Group>
                      <p style={{color: 'red'}}>{validb} </p>
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Book price</Form.Label>
                      <Form.Control required type="text" placeholder="Book price" name='bookprice'
                        value={bookprice} onChange={this.onChange} onblur={this.validateBookprice}>
                        </Form.Control>
                        <p style={{color: 'red'}}>{validp} </p>
                      </Form.Group> 
                      
                      <Form.Group>
                      <FormPicture name='bookimg' onChange={this.onChange} value={bookimg} />
                      
                       </Form.Group>
                        <p>{output} </p>
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
            <Footer fix={this.state.fix} />
            </>
        )
    }
}


{/* <div className="image-wrapper">
                      
<input
  type="file"
  id="imageInput"
   hidden="hidden"
>
    </input>

</div> */}