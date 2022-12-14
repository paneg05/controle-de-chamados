import './Modal.css'
import { FiX } from 'react-icons/fi'

function Modal({conteudo,close}){
    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={23} color='#fff'/>
                    voltar
                </button>

                <h2>
                    detalhes do chamado
                </h2>
                <div className='row'>
                    <span>
                        Cliente: <a>{conteudo.cliente}</a>
                    </span>
                </div>
                <div className='row'>
                    <span>
                        Assunto: <a>{conteudo.assunto}</a>
                    </span>
                </div>
                <div className='row'>
                    <span>
                        cadastrado em: <a>{conteudo.data}</a>
                    </span>
                </div>
                <div className='row'>
                    <span>
                        Status: <a style={{color:'#fff',backgroundColor:conteudo.status==='Aberto' ? '#5cb85c' :'#999'}}>{conteudo.status}</a>
                    </span>
                </div>
                {
                    conteudo.complemento !== '' &&(
                        <>
                            <h3>Complemento</h3>
                            <p>{conteudo.complemento}</p>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Modal

