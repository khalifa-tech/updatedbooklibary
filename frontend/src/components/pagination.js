import React from 'react'

const Pagination = ({pageSize,totalElements,paginate})=>{
    const pageNumber = [];
    for(let i=1; i <= Math.ceil(totalElements/pageSize); i++){
        pageNumber.push(i)
    }

    return(
        <div>
            <ul className='pagination'>
                {pageNumber.map(number =>(
                    <li key={number} className="btn-primarry">
                        <a onClick={()=> paginate(number)} className="btn-primary">
                            {number}
                        </a>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination; 