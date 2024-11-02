import axios from 'axios'

export const getAllMostrar = () =>{
    return  axios.get('http://localhost:8000/forms/api/forms1/forms/')
}