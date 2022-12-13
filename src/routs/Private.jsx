
import { useState,useEffect } from "react";
import { auth } from "../firebaseConfig/firebaseConnection"; 
import { onAuthStateChanged } from "firebase/auth";
import {AuthContext} from '../contexts/authContext'
import { useContext } from "react";
import { Navigate} from "react-router-dom";

export default function Private({children}){


    const {signed,loading}=useContext(AuthContext)


    if(loading){
        return(
            <div>
                Loading
            </div>
        )
    }

    if(!signed){
      return  <Navigate to='/' replace={true} />
    }


    return children

}