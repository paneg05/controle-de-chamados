import {BrowserRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import  AuthProvider  from './contexts/authContext'
import Routs from './routs'

import 'react-toastify/dist/ReactToastify.css';

function App(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer autoClose={3000}/>
                <Routs/>
            </BrowserRouter>
        </AuthProvider>

    )
}

export default App