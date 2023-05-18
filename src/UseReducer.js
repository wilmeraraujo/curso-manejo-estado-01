import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({name}){
    const [state,dispatch] = React.useReducer(reducer,initialState);

  
    // const onWrite = (newValue) => {
    //     setState({
    //         ...state,
    //         value: newValue,
    //     });
    // }
 

    const onConfirm = () => dispatch({type:actionTypes.confirm});
    const onError = () => dispatch({type:actionTypes.error});
    const onCheck = () => dispatch({type:actionTypes.check});
    const onDelete = () => dispatch({type:actionTypes.delete});
    const onReset = () => dispatch({type:actionTypes.reset});
    const onWrite = ({target:{value}}) => {
        dispatch({type:actionTypes.write, payload:value});
    }
    
    React.useEffect(() => {
        console.log("Empezando el efecto");

        if(!!state.loading){
            setTimeout( () => {
                console.log("Haciendo la validacion");
                if(state.value === SECURITY_CODE){
                    onConfirm();
                }else{
                   onError();
                }
                
                console.log("Terminando la validacion");
            },1000); 
        }
        console.log("Terminando el efecto");
    },[state])

    if(!state.deleted && !state.confirmed){
        return(
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escriba el codigo de seguridad.</p>
                {state.error && (
                    <p>Error: el codigo es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
                <input 
                    placeholder="Código de seguridad" 
                    value={state.value}
                    onChange={onWrite}
                />
                <button onClick={onCheck}>Comprobar</button>
            </div>
        );
    }else if (!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>¿Desea confirmar?</p>
                <button
                    onClick={onDelete}
                >Si, Eliminar</button>
                <button
                    onClick={onReset}
                >No, Cancelar</button>
            </React.Fragment>
        );    
    }else{
        return(
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >Resetear, volver atras</button>
            </React.Fragment>
        );
    }
}

const initialState = {
    value : '',
    error : false,
    loading : false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm:'CONFIRM',
    write:'WRITE',
    delete:'DELETE',
    check:'CHECK',
    reset:'RESET',
    error:'ERROR',
};


//const reducer = (state,action) => {
//};
//PRIMERA FORMA DE UTILIZAR LOS REDUCER
/*const reducerIf = (state,action) => {
    if(action.type === 'ERROR'){
        return{
            ...state,
            error:true,
            loading:false,  
        };
    } else if(action.type === 'CHECK'){
        return{
            ...state,
            loading:true,
        };
    } else{
        return{
            ...state,
        };
    }
};
//SEGUNDA FORMA DE UTILIZAR LOS REDUCER
const reducerSwitch = (state,action) => {
    switch(action.type){
        case 'ERROR':
            return{
                ...state,
                error:true,
                loading:false,  
            };
        case 'CHECK':
            return{
                ...state,
                loading:true,
            };
        default:
            return{
                ...state,
            };
    }
};*/
//TERCERA FORMA DE UTILIZAR LOS REDUCER => se divide en dos pasos
const reducerObject = (state,payload) => ({
    [actionTypes.confirm]:{
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.write]:{
        ...state,
        value:payload
    },
    [actionTypes.delete]:{
        ...state,
        deleted: true,
    },
    [actionTypes.reset]:{
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
    [actionTypes.error]: {
        ...state,
        error:true,
        loading:false,  
    },
    [actionTypes.check]:{
        ...state,
        loading:true,
    },
});

const reducer = (state,action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    }else{
        return state;
    }
};

export { UseReducer };
