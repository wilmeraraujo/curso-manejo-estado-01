import React from "react";
import { Loading } from "./loading";

class ClassState extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            error : true,
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
                this.setState({loading : false});
                console.log("Terminando la validacion");
            },3000); 
        }
    }
    
    render(){
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escriba el codigo de seguridad.</p>
                
                {this.state.error && (
                    <p>Error: el codigo es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading/>
                )}
                <input placeholder="Código de seguridad"/>
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