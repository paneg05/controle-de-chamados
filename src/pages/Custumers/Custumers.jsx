import './Custumers.css'
import Title from '../../components/Title/Title'
import Header from '../../components/Header'

import { useState } from 'react'

import { db } from '../../firebaseConfig/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

import {toast} from 'react-toastify'

import { FiUser } from 'react-icons/fi'

export default function Custumers(){


    const [nomeFantasia, setNomeFantasia]=useState('')
    const [cnpj, setCnpj]=useState('')
    const [endereco, setEndereco]=useState('')

    async function handleAdd(e){
        e.preventDefault()

        if(nomeFantasia!=''&& cnpj!= '' && endereco != ''){
            const docRef = await collection(db,'Custumers')
            const docSnap = await addDoc(docRef,{
                nomeFantasia,
                cnpj,
                endereco
            }).then(()=>{
                setCnpj('')
                setEndereco('')
                setNomeFantasia('')
                toast.info('Empresa cadastrada com sucesso!')
            }).catch(e=>{
                console.log(e)
                toast.error('erro ao cadastrar empresa')
            })
        }else{
            toast.error('preencha todos os campos')
        }
    }


    return (
        <div className="Custumers">
            <Header/>


            <div className='content'>
                <Title name='clientes'>
                    <FiUser size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile custumers' onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type="text" placeholder='Nome da sua empresa' value={nomeFantasia} onChange={(e)=>setNomeFantasia(e.target.value)} />
                        <label>CNPJ</label>
                        <input type="text" placeholder='Seu cnpj' value={cnpj} onChange={(e)=>setCnpj(e.target.value)} />
                        <label>Edereço</label>
                        <input type="text" placeholder='Seu endereço' value={endereco} onChange={(e)=>setEndereco(e.target.value)} />

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}