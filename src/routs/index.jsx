import {Routes,Route} from 'react-router-dom'


import SignIn from '../pages/signIn/signIn'
import SignUp from '../pages/signUp/signUp'

import Dashboard from '../pages/Dashboard/Dashboard'
import Profile from '../pages/Profile/Profile'
import Custumers from '../pages/Custumers/Custumers'
import New from '../pages/New/New'

import Private from './Private'

import Notfound from '../pages/NotFound/Notfound'

export default function Routs(){
    return(
        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/new' element={<Private><New/></Private>}/>
            <Route path='/dashboard' element={<Private><Dashboard/></Private>} />
            <Route path='/custumers' element={<Private><Custumers/></Private>} />
            <Route path='/profile' element={<Private><Profile/></Private>}/>
            <Route path='/new/:id' element={<Private><New/></Private>} />
            <Route path='*' element={<Notfound/>}/>
        </Routes>
    )
}