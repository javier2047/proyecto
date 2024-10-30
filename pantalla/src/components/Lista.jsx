import { useEffect } from "react"
import {getAllMostrar} from '../components/mostrar.api'



export function Lista() {

useEffect(()=>{
    async function cargartarea(){
        const rest = getAllMostrar()
        console.log(rest)
    }
cargartarea();
},[])


    return(
        <div>Lista</div>
    )
}