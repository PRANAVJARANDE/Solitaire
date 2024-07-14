import React from 'react'
function Card({shape=null,value=null,covered=false}){
    if(shape==null && value==null)
    {
        //empty card
        return(
            <div className='card'>E</div>
        )
    }
    if(shape && value)
    {
        if(covered===true)
        {
            return(
                <span>
                    <img className='card' src={`/assets/covered.png`}/>
                </span>
            )
        }
        else
        {
            return(
                <img className='card' src={`/assets/${shape}${value}.png`}/>
            )
        }
        
    }
    if(shape=='S')return(<span className='card'>♤</span>)
    if(shape=='H')return(<span className='card'>♥</span>)
    if(shape=='D')return(<span className='card'>♦</span>)
    if(shape=='C')return(<span className='card'>♣</span>)
    return (
        <></>
    )
}
export default Card