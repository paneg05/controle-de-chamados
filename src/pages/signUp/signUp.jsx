import { useState,useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import './styles/signUp.css'
import logo from './../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContext'

function SignUp(){



    const navigate = useNavigate()
    const {createUser,signed,loadingAuth} =useContext(AuthContext)

    const[email,setEmail]=useState('')
    const[senha,setSenha]=useState('')
    const [nome,setNome]=useState('')


    if(signed===true){
        navigate('/dashboard')
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(email!==''&senha!==''&nome!==''){
            createUser(email,senha,nome)
        }
    }



    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='logo do sistema'/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar</h1>
                    <input value={nome} onChange={(e)=>setNome(e.target.value)} type="text" name=""  placeholder='digite seu nome' />
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name=""  placeholder='digite seu email'/>
                    <input value={senha} onChange={(e)=>setSenha(e.target.value)} type="password" name=""  placeholder='digite sua senha' />
                    <button type="submit">{loadingAuth?'carregando...':'Cadastrar'}</button>
                </form>
                    <Link to='/'>já possui uma conta ? faça login</Link>
            </div>
        </div>
    )
}

export default SignUp