import { createStore } from 'redux'


const stateInitial = {
    prueba: "Hola landa Prueba",
    checked: false,
    checked1: false
}

const reducerSearch = (state = stateInitial, action) => {

    if (action.type == "Cambiar_Cheked") {
        return {
            ...state,
            checked: action.chek,
            checked1: action.check1
        }
    } else if (action.type == "Cambiar_Cheked1") {
        return {
            ...state,
            checked1: action.check1
        }

    } else if (action.type == "Cambiar_Cheked_only") {
        return {
            ...state,
            checked: action.check
        }

    }

    return state
}


export default createStore(reducerSearch)