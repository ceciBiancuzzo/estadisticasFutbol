import axios from 'axios'

const clienteAxios = axios.create({
baseURL:"http://localhost:5000/"



})

export default clienteAxios;

//configura una instancia de cliente Axios con una URL base específica. Esta instancia de cliente puede
 //ser utilizada para realizar solicitudes HTTP a esa URL base en el contexto de una aplicación.