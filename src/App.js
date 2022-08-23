import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Login } from './components/Login/Login';
import Home from './components/Home/Home';
import PrivateRoute from './PrivateRoute';
import SideBar from './components/SideBar/SideBar';
import { ResetPassword } from './components/ForgotPassword/ResetPassword';
import { RecoveryPass } from './components/ForgotPassword/RecoveryPass';
import GerentesTable from './components/GerentesTable/GerentesTable';
import UsuariosTable from './components/UsuariosTable/UsuariosTable';

import { useSelector } from 'react-redux';
import AltaUsuariosForm from './components/UsuariosTable/AltaUsuariosForm';
import  GerentesFormulario  from './components/GerentesTable/GerentesFormulario.jsx';
function App() {
  const {user} = useSelector(
    (state) => state.login)
  return (
    user && (user?.newUser === 0 || user?.newUser === null || !user?.newUser) ?
    <div className="App">
        <SideBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/gerentes' element={<GerentesTable/>}/>
          <Route path='/altaGerentes/' element={<PrivateRoute rol={'1.7.18.1' && '1'}/>} >
          <Route path='/altaGerentes/' element={<GerentesFormulario/>}/>
          </Route>
          <Route path='/modificarGerentes/:id' element={<PrivateRoute rol={'1.7.18.2' && '1'}/>}>
          <Route path='/modificarGerentes/:id' element={<GerentesFormulario/>}/>
          </Route>
          <Route path='/usuarios' element={<UsuariosTable/>}/>
          <Route path='/altaUsuarios' element={<PrivateRoute rol={'1.2.2' && '1'}/>}>
              <Route path='/altaUsuarios' element={<AltaUsuariosForm/>}/>
          </Route>
          <Route path='/modifUsuarios/:id' element={<PrivateRoute rol={'1.2.2' && '1'}/>} >
          <Route path='/modifUsuarios/:id' element={<AltaUsuariosForm/>}/>
          </Route>
        </Routes> 
       
    </div> :

    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/recovery' element={<RecoveryPass/>}/>
    <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
    </Routes> 
   
  );
}

export default App;
