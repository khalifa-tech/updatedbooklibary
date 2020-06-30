import React from 'react'
import axios from 'axios'
import {Table,  Col, Container} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'
import Pagination from 'react-js-pagination'
import Navbar from './navbar'
import AuthorNav from './authorNavbar'
import Footer from './footer'
import logo from '../img/logo.jpg'


let hey;
class Booklist extends React.Component{

    state={
      loading: false,
      booklist: [],
      currentPage: 1,
      postPerPage: 6,
      checking: false,
      username : '',
      fix: '',
      bookname: '',
      show: 'show',
      mainBook: [],
      searchOutcome: ''
  }

    componentDidMount(){
      
      this.onLoad();
       
     }

     paginate = (pageNumber) =>{
      this.setState({currentPage: pageNumber})
  }

  bookSearch = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  searchBook = ()=>{
      let response;
      let bookname = this.state.bookname
    fetch(`http://localhost:90/api/book/${bookname}`)
    .then(res =>{
        response = res.status

        return res.json();
    })
    .then(data =>{
      if(data.length === 0){
        this.setState({
          booklist: this.state.mainBook,
          searchOutcome: 'not available'
        })
      }
      else{
        this.setState({
          booklist: data,
          searchOutcome: ''
        })
      }
  
    })
    .catch(err => console.log(err))
  }

  onLoad = ()=>{

    this.setState({loading: true})
      
    var username = localStorage.getItem('username');
  //  var password = localStorage.getItem('password');

    if(username === null){
      this.setState({checking: true})
    }
    else{
      this.setState({
        checking: false,
        username: username
      })
    }

    axios.get("http://localhost:90/api/bookslist")
    .then(response =>{
        this.setState({
            loading: false,
            booklist: response.data,
            mainBook: response.data
        })
        console.log(response.data)
    })
    .catch(err => console.log(err))

  }

  trimSpace = ()=>{
      let space = this.state.bookname;
    if(space.trim() === ''){
      this.setState({
        searchOutcome: ''
      })
    }
  }
   

    render(){

        const {booklist, loading, currentPage,bookname,  searchOutcome,
          show, postPerPage, checking, username} = this.state

        const indexoflastPost = currentPage * postPerPage;
        const indexoffirstPost = indexoflastPost - postPerPage;
        const currentPost = booklist.slice(indexoffirstPost, indexoflastPost)

        const navbar = checking ? (<Navbar onChange={this.bookSearch} names='bookname'
         trim={this.trimSpace}  bookname={bookname} search={this.searchBook} searchOutcome={searchOutcome} />) : 
        (<AuthorNav username={username}/>)

        let tempRef = (base64Stringuri) => `${base64Stringuri}`;


        const allBooks = loading ? (<p>Loading</p> ):(currentPost && currentPost.map((book, index)=>{

            return(
                <tr key={book.bookid}>
                    <td>{index+1}</td>
                    <th>{ 
                      book.bookimg === null ? (<img src={logo} style={{width: 50, height: 40}} />) :
                    (<img src={tempRef(book.bookimg)} style={{width: 50, height: 40}} />)}</th>
                    <td>{book.bookname}</td>
                    <td>{book.isbn}</td>
                    <td>#{book.bookprice}</td>
                </tr>
            )
        })
      )
        return(
            <>
            {navbar}
             <div className='booklist'>
            <br/>
            <Container style={{marginLeft: 40}}>
            <Col lg={8}>
            <h2 style={{color: 'white'}}>
            <FontAwesomeIcon icon={faList} /> BookList
            </h2>
            <br/>
            <Table bordered hover striped variant="primary" style={{display: show}} >
            <thead>
              <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Book Name</th>
                <th>ISBN</th>
                <th>Price</th>
                
              </tr>
            </thead>
            <tbody>
              {allBooks}
              {searchOutcome}
            </tbody>
          </Table>
          <Pagination 
            
            activePage={currentPage}
            itemsCountPerPage={postPerPage}
            totalItemsCount={booklist.length}
            pageRangeDisplayed={3}
            onChange={this.paginate}
          />
          </Col>
         
          </Container>
          
          </div>
         
          <Footer fix='fixed'/>
          </>
        )
    }
}

export default Booklist;