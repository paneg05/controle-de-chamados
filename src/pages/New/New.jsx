import Header from "../../components/Header"
import Title from "../../components/Title/Title"

import './New.css'

import { FiPlus } from "react-icons/fi"


import { AuthContext } from "../../contexts/authContext"
import { useState,useContext,useEffect } from "react"
import {toast} from 'react-toastify'
import {db} from '../../firebaseConfig/firebaseConnection'
import { addDoc, collection,getDocs,doc,getDoc, updateDoc } from "firebase/firestore"
import {useParams,useNavigate} from 'react-router-dom'

export default function New(){
    const navigate=useNavigate()
    const{id}=useParams()
  

    const [loadCustumers,setLoadCustumer]=useState(true)
    const [custumers,setCustumers]=useState([])
    const [custumerSelected,setCustumerSelected]=useState(0)

    const [assunto,setAssunto]=useState('suporte')
    const [status,setStatus]=useState('Aberto')
    const [complemento,setComplemento]=useState('')

    const [idCustumer,setIdCustumer]=useState(false)

    const {user} = useContext(AuthContext)

    useEffect(()=>{
        async function loadCustumers (){
            const docRef=collection(db,'Custumers')
            const docSnap = await getDocs(docRef)
            let lista= []
            docSnap.forEach(e=>{
                let id=e.id
                lista.push({

                   id:e.id,
                    ...e.data()
                })
            })
            setCustumers(lista)
            if(lista.length===0){
                console.log('nem uma empresa encontrada')
                setLoadCustumer(false)
                return
            }
            setCustumers(lista)
            setLoadCustumer(false)

            if(id){
                loadId(lista)
            }
        }

        loadCustumers()
        
    },[])

    async function loadId(lista){
        const docRef=doc(db,'chamados',id)
        const docSnap= await getDoc(docRef)
        if(docSnap.exists()){
            setAssunto(docSnap.data().assunto)
            setStatus(docSnap.data().status)
            setComplemento(docSnap.data().complemento)
            
            let index = lista.findIndex(item=>item.id===docSnap.data().ClienteId)
            setCustumerSelected(index)
            setIdCustumer(true)
        }else{
            console.log('erro no id passado')
            setIdCustumer(false)
        }
    }

    async function handleRegister(e){
        e.preventDefault()

        if(idCustumer){
            const docRef = doc(db,'chamados',id)
            await updateDoc(docRef,{
                cliente: custumers[custumerSelected].nomeFantasia,
                ClienteId:custumers[custumerSelected].id,
                assunto,
                status,
                complemento,
                userId:user.uid
            }).then(()=>{
                navigate('/dashboard')
                toast.success('Chamado editado com sucesso !!')

            })
            return
        }

        const docRef = collection(db,'chamados')
        const ms = Date.now();
        const agora = new Date(ms)
        await addDoc(docRef,{
            created: agora,
            cliente: custumers[custumerSelected].nomeFantasia,
            ClienteId:custumers[custumerSelected].id,
            assunto,
            status,
            complemento,
            userId:user.uid
        }).then(e=>{
            toast.success('salvo')
        }).catch(e=>{
            console.log(e)
            toast.error('erro')
        })
    }

    async function handleChangeSelect(e){
        setAssunto(e.target.value)
    }

    async function handleOptionChange(e){
        setStatus(e.target.value)
    }

    async function handleChangeCustumer (e){
        setCustumerSelected(e.target.value)
    }


    return (
        <div>
            <Header/>

            <div className="content">
            <Title name='Novo'>
                <FiPlus size={25}/>
                
            </Title>
            <div className="container">
                <form className="form-profile" onSubmit={handleRegister}>
                    <label>Cliente</label>

                    {loadCustumers === true? (
                        <input type="text" disabled={true} value='carregando Cliente ...' />
                    ): (
                        <select value={custumerSelected} onChange={handleChangeCustumer}>
                            {custumers.map((item,i)=>{
                                return(
                                    <option key={item.id} value={i}>
                                        {item.nomeFantasia}
                                    </option>
                                )
                            })}
                        </select>
                    )}

                    
                    <label>assunto</label>
                    <select value={assunto} onChange={handleChangeSelect}>
                        <option  value={'suporte'}>Suporte</option>
                        <option value={'visita técnica'}>Visita técnica</option>
                        <option value={'financeiro'}>Financeiro</option>
                    </select>
                    <label>Status</label>
                    <div className="status">
                        <input  type="radio" onChange={handleOptionChange} name="radio" value={'Aberto'} checked={status==='Aberto'}/>
                        <span>Em aberto</span>
                        <input  type="radio" onChange={handleOptionChange} name="radio" value={'Progresso'} checked={status==='Progresso'}/>
                        <span>Progresso</span>
                        <input  type="radio" onChange={handleOptionChange} name="radio" value={'Atendido'} checked={status==='Atendido'}/>
                        <span>Atendido</span>
                    </div>
                    <label>Complemento</label>
                    <textarea value={complemento} onChange={e=>setComplemento(e.target.value)} type='text' placeholder="Descreva seu problema (opcional)"/>
                    <button type="submit">Registrar</button>
                </form>
            </div>
            </div>

        </div>
    )
}