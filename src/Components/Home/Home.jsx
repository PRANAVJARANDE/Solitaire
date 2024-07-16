import React, { useState ,useEffect} from 'react'
import './Home.css'
import Card from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux';
import { clicked, initialize,togglestock,addmove,setwin,setmoves,starty} from '../../store/stateslice';
import Win from '../Win/Win';


function Home() {
    const dispatch=useDispatch();
    const tableau=useSelector((state)=>{return state.tableau});
    const stock=useSelector((state)=>{return state.stock});
    const view=useSelector((state)=>{return state.view});
    const foundations=useSelector((state)=>{return state.foundations});
    const win=useSelector((state)=>{return state.win});
    let moves=useSelector((state)=>{return state.moves});
    let time=useSelector((state)=>{return state.time});
    const start=useSelector((state)=>{return state.start});

    useEffect(()=>{
        if(start==false)
        {
            dispatch(initialize());
            dispatch(starty());
        }
    },[start])

    useEffect(()=>{
        if(foundations['H']===13 && foundations['D']===13 && foundations['S']===13 && foundations['C']===13)
        {
            dispatch(setwin());
            const storedBest = JSON.parse(localStorage.getItem('best'));
            if (storedBest) {
                if(storedBest.moves>moves)
                {
                    storedBest.moves=moves;
                }
                if(storedBest.time>time)
                {
                    storedBest.time=time;
                }
                localStorage.setItem('best', JSON.stringify(storedBest));
            }
            else
            {
                localStorage.setItem('best', JSON.stringify({moves:moves,time:time}));
            }
            dispatch(setbest({moves:moves,time:time}));
            dispatch(setmoves());
        }
    },[foundations]);


    return (
        <div id='mainarea'>
            <div id='ubox'>   
                <div className='stock'>
                    <button onClick={()=>{
                        dispatch(togglestock());
                        dispatch(addmove());
                    }}>
                        {stock.length==0 && (<Card/>)}
                        {stock.length!=0 && (<div className='covered'></div>)}
                    </button>
                    <div>
                        {view==null && <Card/>}
                        {view!=null && <span onClick={()=>{dispatch(clicked({shape:view.shape,value:view.value}))}}><Card shape={view.shape} value={view.value}/></span>}
                    </div>
                </div>
                <div className='foundationcard'>
                    <Card shape={'H'} value={useSelector((state)=>(state.foundations['H']))}/>
                    <Card shape={'S'} value={useSelector((state)=>(state.foundations['S']))}/>
                    <Card shape={'D'} value={useSelector((state)=>(state.foundations['D']))}/>
                    <Card shape={'C'} value={useSelector((state)=>(state.foundations['C']))}/>
                </div>
            </div>

            <div id='dbox'>
                {win && <Win/>}
                {tableau.map((arr,inde)=>( 
                   <span key={inde} className='container' >
                  {arr.map((x,index)=>(
                    <span key={index} className='containercard'>
                       {x.covered && <Card shape={x.shape} value={x.value} covered={x.covered}/>}
                       {!x.covered && <span onClick={()=>{dispatch(clicked({shape:x.shape,value:x.value}))}}><Card shape={x.shape} value={x.value} covered={x.covered}/></span>}
                    </span>
                  ))}


                </span>
                     
              ))}

            </div>
        </div>
    )
    
}

export default Home