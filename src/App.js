import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Login } from './components/Login/Login';
import Home from './components/Home/Home';
import PrivateMasterRoute from './PrivateMasterRoute';
import SideBar from './components/SideBar/SideBar';
import { ResetPassword } from './components/ForgotPassword/ResetPassword';
import { RecoveryPass } from './components/ForgotPassword/RecoveryPass';
import GerentesTable from './components/GerentesTable/GerentesTable';
import CopyRoles from './components/RolesForm/CopyRoles';
import ErrorDB from './pages/ErrorDB';
import UsuariosTable from './components/UsuariosTable/UsuariosTable';
import SupervisoresTable from './components/SupervisoresTable/SupervisoresTable';
import { useSelector } from 'react-redux';
import AltaUsuariosForm from './components/UsuariosTable/AltaUsuariosForm';
import  GerentesFormulario  from './components/GerentesTable/GerentesFormulario.jsx';
import  SupervisoresFormulario  from './components/SupervisoresTable/SupervisoresFormulario.jsx';
import NotPermission from './NotPermission';
import RolesForm from './components/RolesForm/RolesForm';
import TeamLeadersTable from './components/TeamLeadersTable/TeamLeadersTable';
import TeamLeadersFormulario from './components/TeamLeadersTable/TeamLeadersFormulario';
import VendedoresTable from './components/VendedoresTable/VendedoresTable';
import VendedoresFormulario from './components/VendedoresTable/VendedoresFormulario';
function App() {
  const {user, toggle} = useSelector(
    (state) => state.login)
  return (
    user && (user?.newUser === 0 || user?.newUser === null || !user?.newUser) ?
    <div className="App">
        <SideBar/>
        <div className='appContainer' style={{
          width: '100%',
          maxHeight:'100vh',
          position: 'absolute',
          paddingLeft: '5em',
          overflow:'hidden',
       
          
          
        }}>
          <div style={{
         width: '100%',
         height: '100vh',
         opacity: 0.5,
         position: 'absolute',
         zIndex: toggle ? 1 : -1,
         backgroundColor: 'black',
         display: !toggle && 'none',
          
        }}></div>
        <Routes>
          <Route path='/' element={<Home/>}/>
         <Route path='/gerentes' element={<PrivateMasterRoute rol={'1.7.18'}/>}> 
            <Route path='/gerentes' element={<GerentesTable/>}/>
          </Route>
          <Route path='/altaGerentes/' element={<PrivateMasterRoute rol={'1.7.18.1'}/>} > 
            <Route path='/altaGerentes/' element={<GerentesFormulario/>}/>
          </Route> 
          <Route path='/modificarGerentes/:id' element={<PrivateMasterRoute rol={'1.7.18.2'}/>}>
            <Route path='/modificarGerentes/:id' element={<GerentesFormulario/>}/>
          </Route>
          <Route path='/teamleaders' element={<TeamLeadersTable/>}/>
          <Route path='/altaTeamLeaders' element={<TeamLeadersFormulario/>}/>
          <Route path='/modificarTeamLeaders/:id' element={<TeamLeadersFormulario/>}/>
          <Route path='/supervisores' element={<SupervisoresTable/>}/>
          <Route path='/altaSupervisores/' element={<SupervisoresFormulario/>}/>
          <Route path='/modificarSupervisores/:id' element={<SupervisoresFormulario/>}/>
          <Route path='/usuarios' element={<PrivateMasterRoute rol={'1.7.16'}/>}>
            <Route path='/usuarios' element={<UsuariosTable/>}/>
          </Route>
          <Route path='/vendedores' element={<VendedoresTable/>}/>
          <Route path='/altaVendedores/' element={<VendedoresFormulario/>}/>
          <Route path='/modificarVendedores/:id' element={<VendedoresFormulario/>}/>
          <Route path='/altaUsuarios' element={<PrivateMasterRoute rol={'1.7.16.3.1'}/>}>
              <Route path='/altaUsuarios' element={<AltaUsuariosForm/>}/>
          </Route>
          <Route path='/modifUsuarios/:id' element={<PrivateMasterRoute rol={'1.7.16.3.2'}/>}>
              <Route path='/modifUsuarios/:id' element={<AltaUsuariosForm/>}/>
          </Route>
          <Route path='/roles' element={<RolesForm/>}/>
          <Route path='/copyRoles' element={<CopyRoles/>}/>
          <Route path='/permission' element={<NotPermission/>}/>
          <Route path='/480' element={<ErrorDB/>}></Route>
        </Routes> 
        </div>
       
    </div> :

    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/recovery' element={<RecoveryPass/>}/>
    <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
    </Routes> 
   
  );
}

export default App;
