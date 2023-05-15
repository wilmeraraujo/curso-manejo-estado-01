import React from "react";
import { Loading } from "./loading";

const SECURITY_CODE='paradigma';

class ClassState extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            value : '',
            error : false,
            loading : false, 
        };
    }
    /*
    UNSAFE_componentWillMount(){
        console.log("componentWillMount");
    }*/
    /*
    componentDidMount(){
        console.log("componentDidMount");
    }*/
    componentDidUpdate(){
        console.log("Actualizacion");
        if(!!this.state.loading){
            setTimeout( () => {
                console.log("Haciendo la validacion");

                if(SECURITY_CODE === this.state.value){
                    this.setState({error : false, loading : false});
                }else{
                    this.setState({error : true, loading : false});
                }
                console.log("Terminando la validacion");
            },1000); 
        }
    }
    
    render(){
        //const { error,loading,value} = this.state;

        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escriba el codigo de seguridad.</p>
                
                {(this.state.error && !this.state.loading) && (
                    <p>Error: el codigo es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading/>
                )}
                <input 
                    placeholder="Código de seguridad"
                    value = {this.state.value}
                    onChange={(event) =>{
                        this.setState({value:event.target.value});
                    }}
                />
                <button onClick={() => 
                    //</div>this.setState({error:!this.state.error})
                    //this.setState(prevState => ({error: !prevState.error}))
                    this.setState({ loading:true})
                }>Comprobar</button>
            </div>
        ); 
    }
}

export {ClassState};