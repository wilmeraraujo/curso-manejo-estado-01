import React from "react";

const SECURITY_CODE='paradigma';

function UseState({name}){
    const [state,setState] = React.useState({
        value : '',
        error : false,
        loading : false,
        deleted: false,
        confirmed: false,
    });
    //const [value,setValue] = React.useState('');
    //const [error,setError] = React.useState(false);
    //const [loading,setLoading] = React.useState(false);
    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        });
    }
    const onError = () => {
        setState({
            ...state,
            error:true,
            loading: false,
        });
    }
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    }
    const onCheck = () => {
        setState({
            ...state,
            loading:true,
        });
    }
    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    }
    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        });
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
    },[state.loading])

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
                        onWrite(event.target.value);
                        //setError(false);//funciona
                        //setValue(event.target.value);
                    }}
                />
                <button onClick={()=> {
                    onCheck();
                }}>Comprobar</button>
            </div>
        );
    }else if (!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>¿Desea confirmar?</p>
                <button
                    onClick={() =>{
                        onDelete();
                    }}
                >Si, Eliminar</button>
                <button
                    onClick={() =>{
                        onReset();
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
                        onReset();
                    }}
                >Resetear, volver atras</button>
            </React.Fragment>
        );
    }
}

export {UseState};