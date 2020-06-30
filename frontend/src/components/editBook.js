import React from 'react'
import axios from 'axios'
import {Form, Button, Container, Col, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faBookReader} from '@fortawesome/free-solid-svg-icons'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import FormPicture from './FormPicture'
import './hanspet.css';
import AuthorNav from './authorNavbar'
import Footer from './footer'

let authid;

export default class Editbook extends React.Component{

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
        bookid: '',
        book: {}
    }

    componentDidMount(){

        this.setState({loading: true})
        var username = localStorage.getItem('username');
        var password = localStorage.getItem('password');
        var bookid = localStorage.getItem('bookid')

        this.setState({bookid: bookid})

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

        this.loadBook();

    }

    loadBook = ()=>{

        var bookid = localStorage.getItem('bookid')

        this.setState({bookid: bookid})

        fetch(`http://localhost:90/api/books/${bookid}/book`, {
            method : 'get'
        })
        .then(response =>{
            return response.json();
        })
        .then(data =>{

            this.setState({
                book: data,
            })
        })
        .catch(err => console.log(err))

    }

     onSubmit = (e)=>{

        e.preventDefault();

        const bookname = this.state.book.bookname;
        const bookprice = this.state.book.bookprice;

        if(bookname.trim() === '' || bookprice.trim() === ''){
            return
        }

      //  console.log(this.state.author.authid);

      const auth_id = authid;

        const book = {
            bookname: this.state.book.bookname,
            bookprice: this.state.book.bookprice,
            bookimg: this.state.book.bookimg,
            auth_id: auth_id,
            isbn: this.state.book.isbn
        }
        let options ={
            method: 'put',
            body: JSON.stringify(book),
            headers: {
                     Accept: "application/json",
                     "Content-Type": "application/json",
                     'Access-Control-Allow-Origin': '*'
                     }
        }

        console.log('your id ' +  auth_id);
        
        return fetch(`http://localhost:90/api/books/${this.state.author.authid}/book/${this.state.bookid}`, options )
        .then((response)=>{
            this.setState({
                res: response.status
            })
            //console.log(this.state.res)
            return response.json();
        })
        .then(data =>{
            let outcome = this.state.res
            if(outcome < 300){
                this.setState({
                    output: 'Book updated successfully'
                })
            }
            else{
                this.setState({output: 'Something went wrong, please try again'})
            }
        })
        .catch(error => console.log(error))
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

        const {bookname, bookprice, bookimg, output, validb, validp, author, res, book} = this.state

       let tempRef = (base64Stringuri) => `${base64Stringuri}`;

        return(
            <>
            <AuthorNav logout={this.logOut} username={author.username} picture={tempRef(author.authorImg)} />
            <Container variant='dark'>
                <Col lg={5}>
                    <Form onSubmit={this.onSubmit} >
                        <br/>
                      <h3><span style={{color: 'green'}}> 
                      <FontAwesomeIcon icon={faPlusSquare} /></span> Add Book</h3>
                        <br/>
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Book Name</Form.Label>
                      <Form.Control required type="text" placeholder="Book name" 
                        value={book.bookname} onChange={(e)=>{
                              book.bookname = e.target.value
                              this.setState({author})
                        }} onBlur={this.validateBookname}>
                        </Form.Control>
                      </Form.Group>

                      <p style={{color: 'red'}}>{validb} </p>
                      <Form.Group>
                      <Form.Label style={{fontWeight: 'bold'}}>Book price</Form.Label>
                      <Form.Control required type="text" placeholder="Book price" 
                        value={book.bookprice} onChange={(e)=>{
                              book.bookprice = e.target.value
                              this.setState({author})
                        }} onBlur={this.validateBookprice}>
                        </Form.Control>
                        <p style={{color: 'red'}}>{validp} </p>
                      </Form.Group> 
                      
                      <Form.Group>
                      <FormPicture onChange={(e)=>{
                              book.bookimg = e.target.value
                              this.setState({author})
                        }} value={book.bookimg} />
                      
                       </Form.Group>
                        <p>{output} </p>
                     <Row>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button variant="secondary" type="submit" style={{backgroundColor: 'green'}}>
                    <FontAwesomeIcon icon={faSave} /> Update
                    </Button>
                    </Row>
                    </Form>
                </Col>
            </Container>
            <Footer fix='bottom' />
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