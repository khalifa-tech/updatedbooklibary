import React from 'react'
import axios from 'axios'
import {Table,  Col, Container} from 'react-bootstrap'
import Pagination from './pagination'
import Navbar from './navbar'
import AuthorNav from './authorNavbar'
import Footer from './footer'

export default class Authorlist extends React.Component{
    state={
        loading: false,
        authorlist: [],
        currentPage: 1,
        postPerPage: 7,
        checking: false,
        username : '',
        fix: 'bottom'
    }

    componentDidMount(){
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
    
        axios.get("http://localhost:90/api/authors")
        .then(response =>{
            this.setState({
                loading: false,
                authorlist: response.data
            })
            
        })
        .catch(err => console.log(err))
        
    }

    paginate = (pageNumber) =>{
        this.setState({currentPage: pageNumber})
    }

    render(){

        const {authorlist, loading, currentPage,  postPerPage,checking, username} = this.state

        const indexoflastPost = currentPage * postPerPage;
        const indexoffirstPost = indexoflastPost - postPerPage;
        const currentPost = authorlist.slice(indexoffirstPost, indexoflastPost)

        const navbar = checking ? (<Navbar/>) : (<AuthorNav username={username}/>)

        const allAuthors = loading ? (<p>Loading</p>) : (currentPost && currentPost.map((author, index)=>{

            return(
                <tr key={author.authorid}>
                    <td>{index+1}</td>
                    <td>{author.firstname}</td>
                    <td>{author.lastname}</td>
                </tr>
            )
        }))

        return(
            <>
            {navbar}
            <div className='booklist'>
            <br/>
            <Container style={{marginLeft: 40}}>
            <Col lg={8}>
            
            <h2 style={{color: 'white', textAlign: 'center'}}>
                AuthorList
            </h2>
           
            <Table striped hover variant="light"  >
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                
              </tr>
            </thead>
            <tbody>
              {allAuthors}
            </tbody>
          </Table>
          <Pagination pageSize={postPerPage} totalElements={authorlist.length} paginate={this.paginate} />
          </Col>
          
          </Container>
          
          </div>
          <Footer fix={this.state.fix}/>
          </>
        )
    }
} 