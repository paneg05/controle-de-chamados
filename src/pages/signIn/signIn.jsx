import { useState,useEffect, useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContext.js'
import './styles/signIn.css'
import logo from './../../assets/logo.png'

function SignIn(){
    const {logIn,signed,loadingAuth} =useContext(AuthContext)
    const navigate =useNavigate()
    const[email,setEmail]=useState('')
    const[senha,setSenha]=useState('')


    async function handleSubmit(e){
        e.preventDefault()
        logIn(email,senha)
    }

    if(signed){
        navigate('/dashboard')
    }


    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='logo do sistema'/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="" id="" placeholder='digite seu email'/>
                    <input value={senha} onChange={(e)=>setSenha(e.target.value)} type="password" name="" id="" placeholder='digite sua senha' />
                    <button type="submit">{loadingAuth?'Carregando...':'Entrar'}</button>
                </form>
                    <Link to='/register'>Não possui cadastro ? crie uma conta</Link>
            </div>
        </div>
    )
}

export default SignIn