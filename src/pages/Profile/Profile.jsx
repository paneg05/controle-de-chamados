import { useState,useContext } from 'react'
import './Profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title/Title.jsx'
import avatarimg from '../../assets/avatar.png'

import { auth, db, storage } from '../../firebaseConfig/firebaseConnection'
import { doc,setDoc,updateDoc } from 'firebase/firestore'
import { ref, uploadBytes,getDownloadURL } from 'firebase/storage'


import { FiSettings,FiUpload } from 'react-icons/fi'

import {AuthContext}from '../../contexts/authContext'

export default function Profile(){
    
    const {user,signOut,setUser,storageUser} = useContext(AuthContext)

    const [nome,setNome]=useState(user && user.nome)
    const [email,setEmail]=useState(user && user.email)

    const [avatar,setAvatar]=useState(user && user.avatar)
    const [imageAvatar,setImageAvatar]=useState(null)


    const handleFile = async (e)=>{
        console.log(e.target.files[0].type)
        if(e.target.files[0]){
            const image =e.target.files[0]
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image)
                setAvatar(URL.createObjectURL(image))
               
            }else{
                alert('envie uma imagem do tipo PNg ou JPEG')
                setAvatar(null)
                return null
            }
        }

    }

   const handleUpload = async ()=>{
        const currentUid = user.uid

        const storageref =  ref(storage,`images/${currentUid}/${imageAvatar.name}`)
        await uploadBytes(storageref,imageAvatar).then(async (snapShot)=>{
            console.log('imagem enviada!')
            getDownloadURL(storageref).then(async (url)=>{
                let urlFoto = url
                const docRef = doc(db,'users',user.uid)
                await updateDoc(docRef,{
                    avatar:url
                }).then(()=>{
                    let data ={
                        ...user,
                        avatar: url,
                        nome:nome
                    }
                    setUser(data)
                    storageUser(data)
                })
               
            })
        }).catch(e=>{
            console.log(e)
        })


    }

    const handleSave = async (e)=>{
        e.preventDefault()
        
        if(imageAvatar === null &&nome !==''){

            const docRef = doc(db,'users',user.uid)
            await setDoc(docRef,{nome},{merge:true}).then((e)=>{
                let data ={
                    ...user,
                    nome:nome
                }
                setUser(data)
                storageUser(data)
            })
        }else if(nome !== '' && imageAvatar !== null){
            handleUpload()
        }
        
    }

    return (
        <div className="profile">
            <Header/>

            <div className="content">
                <Title name='Meu perfil'>
                    <FiSettings size={25}/>
                </Title>

                <div className="container">
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className="avatar">
                            <span>
                                <FiUpload color='#fff' size={25}/>
                            </span>
                            <input type="file" accept='image/*' onChange={handleFile} /><br/>
                        
                            {
                                <img src={ avatar ===null ? avatarimg : avatar}alt='foto de perfil' width='250' height='250px'/>
                            }

                        </label>

                        <label>nome</label>
                        <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)} />
                        
                        <label>nome</label>
                        <input type="text" value={email} disabled={true} readOnly={true} />

                        <button type='submit'>salvar</button>

                    </form>
                </div>
                
                <div className='container'>
                    <button className='logout-btn' onClick={()=>{signOut()}}>
                        Sair
                    </button>
                </div>

            </div>
        </div>
    )
}