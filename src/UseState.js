import React from "react";

const SECURITY_CODE='paradigma';

function UseState({name}){
    const [state,setState] = React.useState({
        value : '',
        error : false,
        loading : false,
    });
    //const [value,setValue] = React.useState('');
    //const [error,setError] = React.useState(false);
    //const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("Empezando el efecto");

        if(!!state.loading){
            setTimeout( () => {
                console.log("Haciendo la validacion");
                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                    });
                    //setLoading(false);
                }else{
                    setState({
                        ...state,
                        error:true,
                        loading: false,
                    });
                    //setError(true);
                    //setLoading(false);
                }
                
                console.log("Terminando la validacion");
            },3000); 
        }
        console.log("Terminando el efecto");
    },[state.loading])

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
                    setState({
                        ...state,
                        value: event.target.value,
                    });
                    //setError(false);//funciona
                    //setValue(event.target.value);
                }}
            />
            <button onClick={()=> {
                //setError(false);//funciona
                setState({
                    ...state,
                    loading:true,
                });
                //setLoading(true);
            }}>Comprobar</button>
        </div>
    );
}

export {UseState};