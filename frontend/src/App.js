import React from 'react';
import './App.css';
import Navbars from './components/navbar'
import  axio from 'axios'
import {BrowserRouter as Router, Route, Link, Switch,Redirect } from 'react-router-dom'
import Info from './components/info'
import Footer from './components/footer'
import Booklist from './components/booklist'
import Addbook from './components/addbook'
import Addauthor from './components/addauthor'
import Authorlist from './components/authorlist'
import Signin from './components/signin'
import Welcome from './components/welcomePage'
import Profile from './components/editProfile'
import Editbook from './components/editBook'


class App extends React.Component{

 state = {

 }

  render(){

    return(
      <Router>
        <Switch>
          <Route path='/' exact component={Info} />
         <Route path='/book/booklist' exact component={Booklist} />
          <Route path='/book/addbook' exact component={Addbook} />
          <Route path='/author/addauthor' exact component={Addauthor} />
          <Route path='/author/authorlist' exact component={Authorlist}/>
          <Route path='/author/signin' exact component={Signin} />
          <Route path='/author/welcome' exact component={Welcome}/>
          <Route path='/author/profile' exact component={Profile}/>
          <Route path='/book/updatebook' exact component={Editbook}/>
        </Switch>
       
      </Router>
    )
  }
}

export default App;
