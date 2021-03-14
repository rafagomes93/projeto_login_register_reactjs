import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: '',
            email: '',
            password: ''
        };
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }    

    register(e){
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async () => {
        try{
            const {nome, email, password} = this.state;

            await firebase.register(nome, email, password);
            //Após cadastro, o usuário é logado automaticamente.
            this.props.history.replace('/dashboard');

        }catch(error){
            alert(error.message);
        }
    }

    render(){
        return(
            <div>
               <h1 className='register-h1'>Novo Usuário</h1>  
               <form onSubmit={this.register} id='register'>
                   <label>Nome</label> 
                   <input type='text' value={this.state.nome} autoComplete='off' autoFocus onChange={(e) => this.setState({nome: e.target.value})}/>
                   <label>Email</label> 
                   <input type='text' value={this.state.email} autoComplete='off' onChange={(e) => this.setState({email: e.target.value})}/>
                   <label>Senha</label> 
                   <input type='text' value={this.state.password} autoComplete='off' onChange={(e) => this.setState({password: e.target.value})}/>
                   <button type='submit' >Cadastrar</button>
               </form>     
            </div>    
        );
    }
}

export default withRouter(Register);
