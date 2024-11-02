import { useEffect } from "react"
import {getAllMostrar} from './mostrar.api'



export function Lista() {

useEffect(()=>{
    async function cargartarea(){
        const rest = await getAllMostrar()
        console.log(rest)
    }
cargartarea();
},[])


    return(
        <div>Lista</div>
    )
}