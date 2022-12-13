import { useContext,useState, useEffect } from "react"
import {AuthContext} from '../../contexts/authContext.js'
import { db } from "../../firebaseConfig/firebaseConnection.jsx"
import { doc,getDocs,collection,where,query,orderBy, limit, startAfter, startAt } from "firebase/firestore"
import { format, set } from "date-fns"
import { Link } from "react-router-dom"

 import './Dashboard.css'

import Header from "../../components/Header.jsx"
import Title from '../../components/Title/Title'

import { FiMessageSquare,FiPlus,FiSearch,FiEdit2 } from "react-icons/fi"

import Modal from '../../components/Modal/Modal.jsx'


export default function Dashboard(){
    const {signOut,user}=useContext(AuthContext)

    const [c,setC] = useState([])
    const [chamados,setChamados] = useState([])
    const [loadingChamado,setLoadingChamado]=useState(true)
    const [loadMore,setLoadMore]=useState(false)
    const [lastDoc,setLastDoc]=useState(2)

    const [showPostModal,setShowpostModal]=useState(false)
    const [detail,setDetail]=useState()

    useEffect(()=>{
        
        loadChamados()


        return ()=>{

        }
    },[])


    async function loadChamados(){

        const docRef = collection(db,'chamados')
        const q = await query(docRef,orderBy('created'))
        const docSnap= await getDocs(q).catch((e)=>{
            console.log(e)
            setLoadMore(false)
        })

        
        let lista = docSnap.docs.map((item)=>{
            let data =item.data().created.toDate().toLocaleString('pt-Br', { timeZone: 'UTC' })
            return{
                ...item.data(),
                data,
                id:item.id
            }
        })
        let todosChamados= []
        todosChamados=[...lista]
        let ViewChamados=[]
        for(let i=0;i<=lastDoc;i++){
            ViewChamados.push(todosChamados[i])
        }

        setChamados(ViewChamados)
        setLoadingChamado(false)
        setC(todosChamados)


        
    }

    async function handleMore(){
        setLoadMore(true)
       
       let view=[]
       for(let i=0;i<=lastDoc+3;i++){
        view.push(c[i])
       }
       setChamados([...c])
       setLastDoc(lastDoc+3)
       setLoadMore(false)

    }

    function   toglePostModal(item){
        setShowpostModal(!showPostModal)
        setDetail(item)
    }

    if (loadingChamado){
        return(
            <div>
                <Header/>

                <div className="content">
                    <Title name='Atendimento'>
                        <FiMessageSquare size={25}/>
                    </Title>
                    
                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }




    return(
        <div>
            <Header />

            <div className="content">
                <Title name='Atendimento'>
                    <FiMessageSquare size={25}/>
                </Title>

                {chamados.length  === 0 ? (
                    
                    <div className="container dashboard">
                        <span>Nem um chamado registrado</span>

                        <Link to='/new' className="new">
                        <FiPlus size={25} color='#fff'/>
                            Novo Chamado
                        </Link>

                    </div>

                ):(
                    <>
                        <Link to='/new' className="new">
                            <FiPlus size={25} color='#fff'/>
                            Novo Chamado
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((item,i)=>{
                                    return(
                                        <tr key={i}>
                                            <td data-label='cliente'>{item.cliente}</td>
                                            <td data-label='suport'>{item.assunto}</td>
                                            <td data-label='status'>
                                                <span style={{backgroundColor: item.status==='Aberto'?'#5cb85c':'#999'}} className="badger">{item.status}</span>
                                            </td>
                                            <td data-label='cadastrado'>{item.data}</td>
                                            <td data-label='#'>
                                                <button className="action" style={{backgroundColor:'#3583f6'}} onClick={()=>toglePostModal(item)}>
                                                    <FiSearch color={'#fff'} size={17}/>
                                                </button>
                                                <Link className="action" style={{backgroundColor:'#f6a935'}} to={`/new/${item.id}`}>
                                                    <FiEdit2 color={'#fff'} size={17}/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )

                                })}
                                       
                                </tbody>
                        </table>
                        
                        {
                            loadMore&&<h3 style={{textAlign:'center',marginTop:15}}>Buscando chamados...</h3>
                        }
                        {
                            !loadMore && chamados.length<c.length &&    <button className="btn-more" onClick={handleMore}>Buscar Mais</button>
                        }
                        
                    </>
                )}

                
            </div>
            {
                showPostModal && (
                    <Modal
                        conteudo={detail}
                        close={toglePostModal}
                    />
                )
            }
        </div>
    )

}