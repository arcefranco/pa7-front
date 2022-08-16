import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Login } from './components/Login/Login';
import Home from './components/Home/Home';
import SideBar from './components/SideBar/SideBar';
import { ResetPassword } from './components/ForgotPassword/ResetPassword';
import { RecoveryPass } from './components/ForgotPassword/RecoveryPass';
import GerentesTable from './components/GerentesTable/GerentesTable';
import UsuariosTable from './components/UsuariosTable/UsuariosTable';
import { useSelector } from 'react-redux';
import AltaUsuariosForm from './components/UsuariosTable/AltaUsuariosForm';
function App() {
  const {user} = useSelector(
    (state) => state.login)
  return (
    user ?
    <div className="App">
        <SideBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/gerentes' element={<GerentesTable/>}/>
          <Route path='/usuarios' element={<UsuariosTable/>}/>
          <Route path='altaUsuarios' element={<AltaUsuariosForm/>}/>
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
