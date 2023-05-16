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
 

    React.useEffect(() => {
        console.log("Empezando el efecto");

        if(!!state.loading){
            setTimeout( () => {
                console.log("Haciendo la validacion");
                if(state.value === SECURITY_CODE){
                    dispatch({ type:'CONFIRM' });
                }else{
                    dispatch({ type:'ERROR' });
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
                    onChange={ (event) => {
                        dispatch({ type:'WRITE' });
                        //onWrite(event.target.value);
                    }}
                />
                <button onClick={()=> {
                    dispatch({ type:'CHECK' });
                    //onCheck();
                }}>Comprobar</button>
            </div>
        );
    }else if (!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>¿Desea confirmar?</p>
                <button
                    onClick={() =>{
                        dispatch({ type:'DELETE' });
                        //onDelete();
                    }}
                >Si, Eliminar</button>
                <button
                    onClick={() =>{
                        dispatch({ type:'RESET' });
                        //onReset();
                    }}
                >No, Cancelar</button>
            </React.Fragment>
        );    
    }else{
        return(
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() =>{
                        dispatch({ type:'RESET' });
                        //onReset();
                    }}
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

//const reducer = (state,action) => {
//};
//PRIMERA FORMA DE UTILIZAR LOS REDUCER
const reducerIf = (state,action) => {
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
};
//TERCERA FORMA DE UTILIZAR LOS REDUCER => se divide en dos pasos
const reducerObject = (state) => ({
    'CONFIRM':{
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    'DELETE':{
        ...state,
        deleted: true,
    },
    'RESET':{
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
    'ERROR': {
        ...state,
        error:true,
        loading:false,  
    },
    'CHECK':{
        ...state,
        loading:true,
    },
});

const reducer = (state,action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state)[action.type]
    }else{
        return state;
    }
};

export { UseReducer };
