import { useState,useEffect,createContext } from "react";
import { createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc,getDoc, snapshotEqual} from "firebase/firestore";
import {auth,db} from '../firebaseConfig/firebaseConnection'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext=createContext()

function AuthProvider({children}){

    const [user,setUser] =useState(null)
    const [loadingAuth,setLoadingAuth]=useState(false)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{

       async function load(){

            const storageUser= localStorage.getItem('@userDatail')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        

       }

       load()

    },[])

    //logando usuário
    async function logIn(email,senha){
        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth,email,senha).then(async credendials=>{
            let uid=credendials.user.uid
            const docRef = doc(db,'users',uid)
            const docSnap= await getDoc(docRef)
            const snap=docSnap.data()
            const data={
                uid,
                nome:snap.nome,
                email:snap.email,
                avatar:snap.avatar
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Bem vindo!!')
        }).catch((e)=>{
            console.log(e)
            toast.error('oops... algo deu errado!')
            setLoadingAuth(false)
        })
 

    }

    //cadastrando usuário
    async function createUser (email,senha,nome) {

        setLoadingAuth(true)
        await createUserWithEmailAndPassword(auth,email,senha).then( async userDetail=>{
            console.log(userDetail)
            let uid =userDetail.user.uid
            const docRef=doc(db,'users',uid)
            await setDoc(docRef,{
                nome,
                email,
                avatar:null
            }).then(()=>{
                let data = {
                    uid,
                    nome,
                    email,
                    avatar:null
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Bem vindo!!')

            }).catch((e)=>{
                console.log(e)
                setLoadingAuth(false)
                toast.error('oops... algo deu errado!')
            })
        })
        
    }

    function storageUser (data){
        localStorage.setItem('@userDatail',JSON.stringify(data))
    }
//log out
    async function signOut(){
        setLoadingAuth(true)
         signOut(auth)
         setUser(null)
         localStorage.removeItem('@userDatail')
        setLoadingAuth(false)
    }

    return(
        <AuthContext.Provider value={
            {
             signed:!!user,
             user,
             loading,
             createUser,
             signOut,
             logIn,
             loadingAuth,
             setUser,
             storageUser
            }
            }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider