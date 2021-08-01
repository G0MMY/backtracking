import {useState} from "react";


export const useFetch = (url:string) =>{
    const [state, setState] = useState({data:null, loading:true})

    fetch(url)
    .then((x)=>x.json())
    .then((y)=>{
        setState({data:y, loading:false})
    })

    return state
}