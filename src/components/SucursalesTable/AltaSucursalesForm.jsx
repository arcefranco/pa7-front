import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from '../UsuariosTable/AltaUsuarios.module.css'
import { getSucursalById } from "../../reducers/Sucursales/SucursalesSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import {FcApproval} from 'react-icons/fc';


const AltaSucursalesForm = () => {
    const {id} = useParams()
const dispatch = useDispatch()
const {sucursalById} = useSelector(
    (state) => state.sucursales)

const navigate = useNavigate()

useEffect(() => {
    if(id) {  
        dispatch(getSucursalById({id: id}))
        }
  }, [id])

  return (
    <div>
        <h1>Alta Sucursales</h1>
    </div>
  )

}

export default AltaSucursalesForm