import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'//Permite utilizar funciones ascyncronas
import reducer from './reducers/index'

const store = createStore (
    reducer,
    compose(applyMiddleware(thunk),  // Esto permite que las acciones retornen funciones en lugar de objetos 
    //de acción, lo que es útil para operaciones asincrónicas.
    
    typeof window.__REDUX_DEVTOOLS_EXTENSION__  !== 'undefined' ?
    window.__REDUX_DEVTOOLS_EXTENSION__() : f => f // Esto verifica si la extensión Redux DevTools está 
    //disponible en el navegador y la aplica si es así. Si no está disponible, simplemente devuelve 
    //la función de identidad (f => f).
    )
    
);
export default store;

/*Store toma reducers ,pueden haber multiples reducers donde cada uno contiene su propio STATE
*/