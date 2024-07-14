import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    tableau: [[], [], [], [], [], [], []],
    foundations: {
        'H':0,
        'D':0,
        'S':0,
        'C':0
    },
    stock: [],
    view:null,
    moves:0,
    invalidmoves:0,
    time:0,
    win:false,
    best:{
        moves:null,
        time:null,
    },
    start:false
};

function foundationmatch(state,shape,value)
{
    if(state.foundations[shape]+1===value)return 1;
    return 0;
}

function contradictmatch(src,dst)
{
    if((src.shape==='H' || src.shape==='D') && (dst.shape==='S' || dst.shape==='C'))
    {
        if(src.value+1===dst.value)return 1;
        return 0;
    }
    if((src.shape==='S' || src.shape==='C') && (dst.shape==='H' || dst.shape==='D'))
    {
        if(src.value+1===dst.value)return 1;
        return 0;
    }
    return 0;
}

function sameobj(ob1,ob2)
{
    if(ob1.shape===ob2.shape && ob1.value===ob2.value)return 1;
    return 0;
}


export const stateSlice=createSlice({
    name: 'cards',
    initialState,
    reducers:{
        initialize:(state)=>{
            state.win=false;
            const deck=[];
            const suits=['H','D','S','C'];
            state.foundations['H']=0;
            state.foundations['D']=0;
            state.foundations['S']=0;
            state.foundations['C']=0;
            state.moves=0;
            state.time=0;
            for(let j=0;j<4;j++)
            {
                for(let i=1;i<=13;i++)
                {
                    deck.push({shape:suits[j],value:i,covered:false});
                }
            }
            for(let i=0;i<52;i++)
            {
                let j=Math.floor(Math.random() * 52);
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
            let z=0;
            for(let i=0;i<7;i++)
            {
                let arr=[];
                for(let j=0;j<=i;j++)
                {
                    if(j!=i)
                    {
                        deck[z].covered=true;
                    }
                    arr.push(deck[z]);
                    z++;
                }
                state.tableau[i]=arr;
            }
            let arr=[];
            while(z<52)
            {
                arr.push(deck[z]);
                z++;
            }
            state.stock=arr;
            state.view=state.stock[0];
            state.stock.shift();
        },
        setbest:(state,action)=>{
            if(state.best.moves===null)
            {
                state.best.moves=action.payload.moves;
                state.best.time=action.payload.time;
            }
            state.best.moves=Math.min(action.payload.moves,state.best.moves);
            state.best.time=Math.min(action.payload.time,state.best.time);
        },
        setmoves:(state)=>{
            state.moves=0;
            state.time=0;
        },
        setwin:(state)=>{
            state.win=true;
        },
        addmove:(state)=>{
            state.moves++;
        },
        incrementTime: (state) => {
            state.time++;
        },
        togglestock:(state)=>{
            if(state.view!==null)
            {
                state.stock.push(state.view);
            }
            if(state.stock.length!==0)
            {
                state.view=state.stock[0];
                state.stock.shift();
            }
        },
        starty:(state)=>{
            state.start=true;
        },
        clicked:(state,action)=>{
            const shape=action.payload.shape;
            const value=action.payload.value;
            const obj={
                shape:shape,
                value:value
            }

            //CLICKED ON STATE.VIEW
            if(state.view!=null && sameobj(obj,state.view))
            {
                //MATCH FOUND IN FOUNDATION
                if(foundationmatch(state,shape,value))
                {
                    state.moves++;
                    state.foundations[shape]++;
                    state.view=null;
                    if(state.stock.length!==0)
                    {
                        state.view=state.stock[0];
                        state.stock.shift();
                    }
                }
                else 
                {
                    let possible=[];
                    state.tableau.map((arr,index)=>{
                        let len=arr.length;
                        if(len===0)
                        {
                            if(value===13)
                            {
                                possible.push(index);
                            }
                        }
                        else
                        {
                            if(contradictmatch(obj,arr[len-1]))
                            {
                                possible.push(index);
                            }
                        }
                    })
                    if(possible.length!==0)
                    {
                        let rand=Math.floor(Math.random() * possible.length);
                        state.tableau[possible[rand]].push(obj);
                        state.view=null;
                        if(state.stock.length!==0)
                        {
                            state.view=state.stock[0];
                            state.stock.shift();
                        }
                        state.moves++;
                    }

                }
            }
            else
            {
                state.tableau.map((arr,index)=>{
                    if(arr.length)
                    {
                        if(sameobj(obj,arr[arr.length-1]) && foundationmatch(state,shape,value))
                        {
                            state.moves++;
                            state.foundations[shape]++;
                            state.tableau[index].pop();
                            let len=state.tableau[index].length;
                            if(len!=0)state.tableau[index][len-1].covered=false;
                            return;
                        }
                    }
                })

                
                let possible=[];
                state.tableau.map((arr,index)=>{
                    let len=arr.length;
                    if(len===0)
                    {
                        if(value===13)
                        {
                            possible.push(index);
                        }
                    }
                    else
                    {
                        if(contradictmatch(obj,arr[len-1]))
                        {
                            possible.push(index);
                        }
                    }
                })
                if(possible.length!==0)
                {
                    let rand=Math.floor(Math.random()*possible.length);
                    let src=[];
                    state.tableau.map((arr,index)=>{
                        arr.map((x,ind)=>{
                            if(sameobj(x,obj))
                            {
                                src=state.tableau[index].splice(ind);
                                let le=state.tableau[index].length;
                                if(le!=0)
                                {
                                    state.tableau[index][le-1].covered=false;
                                }
                                
                            }
                        })
                    })
                    state.tableau[possible[rand]]=state.tableau[possible[rand]].concat(src); 
                    state.moves++;
                } 
            }
        },
    }
})

//EXPORTING REDUCERS
export const {initialize,togglestock,clicked,addmove,incrementTime,setwin,setbest,setmoves,starty} =stateSlice.actions

//CONNECTING STORE WITH REDUCERS
export default stateSlice.reducer