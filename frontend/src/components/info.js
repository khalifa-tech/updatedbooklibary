import React from 'react'
import Navbar from './navbar'

 const Info = ()=>{

    const myMargin = {
        marginTop: '30px'
    }

    return(
        <>
        <Navbar/>
        <div className='back' >
                <br/><br/>
               <h1>Hello, world!</h1>
               <p>
                 Welcome to the online bookshop, a place where you can find any book you want.
               </p>
               <p>
                 You can also sign up as an author, give us your feedback.
               </p>
        </div>
        </>
    )
}

export default Info;


