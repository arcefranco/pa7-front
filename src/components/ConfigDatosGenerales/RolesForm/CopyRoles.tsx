import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import styles from "./Roles.module.css";
import {
  copyRoles,
  getAllUsuarios,
  reset,
  replaceRoles,
} from "../../../reducers/ConfigDatosGenerales/Usuarios/UsuariosSlice";
import Select from "../../../styled-components/inputs/Select";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import { AppDispatch, RootState } from "../../../store";

const CopyRoles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { usuarios, rolStatus, isSuccess } = useSelector(
    (state: RootState) => state.usuarios
  );
  const { user } = useSelector((state: RootState) => state.login);
  useEffect(() => {
    Promise.all([dispatch(getAllUsuarios()), dispatch(reset())]);
  }, []);
  useEffect(() => {
    if (rolStatus && Object.keys(rolStatus).length && !rolStatus.status) {
      Swal.fire({
        icon: "info",
        timer: 15000,
        text: rolStatus?.message,
      }).then((result) => {
        if (result.isConfirmed && isSuccess) {
          navigate("/roles");
        }
      });
    } else if (rolStatus?.status) {
      Swal.fire({
        icon: "info",
        showConfirmButton: true,
        showCancelButton: true,
        timer: 5000,
        text: rolStatus.message,
      }).then((result) => {
        if (result.isConfirmed) {
          let fromElement = document.getElementById(
            "userFrom"
          ) as HTMLInputElement;
          let toElement = document.getElementById("userTo") as HTMLInputElement;
          const userData = {
            userFrom: fromElement.value,
            userTo: toElement.value,
          };
          dispatch(replaceRoles(userData));
        }
      });
    }
  }, [rolStatus]);

  const handleUserChange = () => {
    var userFrom = document.getElementById("userFrom") as HTMLInputElement;
    var userTo = document.getElementById("userTo") as HTMLInputElement;
    console.log("userFrom: ", userFrom.value, "userTo:", userTo.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var userFrom = document.getElementById("userFrom") as HTMLInputElement;
    var userTo = document.getElementById("userTo") as HTMLInputElement;
    const userData = {
      userFrom: userFrom.value,
      userTo: userTo.value,
    };
    !rolStatus?.status &&
      Swal.fire({
        icon: "info",
        showConfirmButton: true,
        showCancelButton: true,
        timer: 5000,
        text: `Esta seguro que desea copiar los roles de ${userData.userFrom} a ${userData.userTo}?`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(copyRoles(userData));
        }
      });
  };
  return (
    <div style={styles.formContainer}>
      <TitleLogo style={{ marginInlineEnd: "auto", marginBottom: ".8rem" }}>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>Copiar Roles</TitlePrimary>
      </TitleLogo>
      <div className={styles.container}>
        <form action="">
          <div className={styles.selects}>
            <div className={styles.select}>
              <span>Copiar de: </span>
              <Select name="" id="userFrom" onChange={handleUserChange}>
                <option value="">---</option>
                {usuarios &&
                  usuarios.map((e) => (
                    <option key={e.Usuario} value={e.Usuario}>
                      {e.Nombre}
                    </option>
                  ))}
              </Select>
            </div>
            <div className={styles.select}>
              <span>a: </span>
              <Select name="" id="userTo" onChange={handleUserChange}>
                <option value="">---</option>
                {usuarios &&
                  usuarios.map((e) => (
                    <option key={e.Usuario} value={e.Usuario}>
                      {e.Nombre}
                    </option>
                  ))}
              </Select>
            </div>
          </div>
          <hr style={{ width: "25rem" }} />
          <ButtonPrimary type="submit" onClick={(e) => handleSubmit(e)}>
            Copiar
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default CopyRoles;
