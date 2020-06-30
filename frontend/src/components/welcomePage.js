import React,{Component} from 'react'
import {Button,Table, Container, Col, ButtonGroup} from 'react-bootstrap'
import AuthorNav from './authorNavbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList,faEdit, faTrash,} from '@fortawesome/free-solid-svg-icons'
import Grid from "@material-ui/core/Grid";
import Example from './modal'
import Footer from './footer'

export default class Welcome extends Component{

    constructor(props){
        super(props)

        this.state = {
            author: {books: []},
            loading: false,
            currentPage: 1,
            postPerPage: 7,
            show: false
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

    paginate = (pageNumber) =>{
        this.setState({currentPage: pageNumber})
    }

    deleteBook = (bookid) => {
    
     return fetch(`http://localhost:90/api/book/${bookid}/delete`, {

         method: 'DELETE'
     } )
    .then((res)=>{

    })
    .then((data)=>{
 
        this.state.author['books'] = this.state.author.books.filter(
            book => {return book.bookid != bookid}
        );
        this.setState({show: false});
        this.forceUpdate();
    })
    .catch(err => console.log(err))
};

editBook = (bookid)=> {
    localStorage.setItem('bookid', bookid);
    this.props.history.push('/book/updatebook')
}

handleClose = ()=>{
    this.setState({show: false})
}

handleShow = (bookid)=>{
    this.setState({show: true})
}

    render(){

        const { author, loading, show} = this.state

          let tempRef = (base64Stringuri) => `${base64Stringuri}`;
          
        const allBooks = loading && (<p>Loading</p> )

        return(
            <>
            <AuthorNav logout={this.logOut} username={author.username} picture={tempRef(author.authorImg)} />
           <Grid container spacing={10}>
               <Grid item sm={8} xs={12}>

            <Container style={{marginLeft: 40}}>
                <br/>
            <Col lg={8}>
            <h2 style={{color: 'black'}}>
            <FontAwesomeIcon icon={faList} /> BookList
            </h2>
            <br/>
            <Table striped bordered hover variant="light"  >
            <thead>
              <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Book Name</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {author.books && author.books.length === 0 ? 
              <tr align="center">
              <td colSpan="7">No Books Available.</td>
            </tr> : author.books && author.books.map((book, index)=>{
                
                return(
                    <tr key={book.bookid}>
                        <td>{index+1}</td>
                        <th><img src={tempRef(book.bookimg)} style={{width: 70, height: 60}} /></th>
                        <td>{book.bookname}</td>
                        <td>{book.isbn}</td>
                        <td>#{book.bookprice}</td>
                        <td>
                            <ButtonGroup aria-label="Basic example">
                               <Example show={show} handleClose={this.handleClose} 
                               handleShow={this.handleShow.bind(this, book.bookid)}
                               handleDelete={this.deleteBook.bind(this, book.bookid)}
                               />   
                               <Button variant="secondary" 
                               onClick={this.editBook.bind(this, book.bookid)} >
                                   <FontAwesomeIcon icon={faEdit}   />
                                   </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            })
            }
            </tbody>
          </Table>
          {/* <Pagination pageSize={postPerPage} totalElements={author.books.length} paginate={this.paginate} /> */}
          </Col>
          
          </Container>
               
             </Grid>
               <Grid item sm={4} xs={12}>
               <br/>
               <br/>
               <br/>
                 <h4 style={{textDecoration: 'underline'}}>Basic Details</h4>
                 <br/>
                 <h6>Username: <span style={{marginLeft: 40,fontStyle: 'italic', color: 'gray'}}>
                     {author.username}</span>  </h6>
                 <h6>Firstname:  <span style={{marginLeft: 40,fontStyle: 'italic',color: 'gray'}}>
                     {author.firstname}</span> </h6>
                 <h6>Lastname:  <span style={{marginLeft: 40,fontStyle: 'italic', color: 'gray'}}>
                     {author.lastname}</span>  </h6>
                 <h6>Date of Birth:  <span style={{marginLeft: 15,fontStyle: 'italic', color: 'gray'}}>
                     {author.dob}</span>  </h6>
             </Grid>
           </Grid>
           <Footer fix='bottom'/>
            </>
        )
    }
}
