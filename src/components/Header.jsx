import {useContext} from'react'
import {Link}from 'react-router-dom'
import { FiHome,FiUser,FiSettings } from "react-icons/fi";
import {AuthContext}from '../contexts/authContext.js'
import avatar from '../assets/avatar.png'
import './header.css'

export default function Header(){
    const {user}=useContext(AuthContext)
    return(
        <div className="sidebar">
            <div>
                <img alt='avatar' src={user.avatar===null?avatar:user.avatar}/>
            </div>
            <Link to={'/dashboard'}>
                <FiHome color='#fff' size={24}/>
                Chamados
            </Link>
            <Link to={'/custumers'}>
                <FiUser color='#fff' size={24}/>
                Clientes
            </Link>
            <Link to={'/profile'}>
                <FiSettings color='#fff' size={24}/>
                Configurações
            </Link>
        </div>
    )
}