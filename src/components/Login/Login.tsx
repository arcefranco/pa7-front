import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import { useSelector } from "react-redux/es/exports";
import styles from "./Login.module.css";
import { login, reset, resetToken } from "../../reducers/Login/loginSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  var d = document.getElementById("select") as HTMLSelectElement;
  const { user, isError, message, isSuccess } = useSelector(
    (state: RootState) => state.login
  );
  interface LoginInput {
    empresa: string;
    empresaReal: string;
    login: string;
    password: string;
    codigoMarca: number;
    marca: string;
    codigoEmpresa: number;
    empresaContabiliza: boolean;
  }
  const [input, setInput] = useState<LoginInput>({
    empresa: "",
    empresaReal: "",
    login: "",
    password: "",
    codigoMarca: 0,
    marca: "",
    codigoEmpresa: 0,
    empresaContabiliza: false,
  });

  React.useEffect(() => {
    dispatch(resetToken());
    console.log(process.env);
  }, []);

  React.useEffect(() => {
    dispatch(reset());
    if (isError) {
      Swal.fire({
        icon: "error",
        title: message,
      });
    }
    if (user?.newUser === 1) {
      Swal.fire({
        icon: "info",
        title: `${message}`,
        showConfirmButton: true,
        timer: 5000,
      }).then((result) => {
        if (result.isConfirmed)
          window.localStorage.setItem("db", user.empresaReal);
        navigate(user.link ? user.link : "/552");
      });
      dispatch(reset());
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
    }
  }, [user, isError, isSuccess, message, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newForm = {
      ...input,
      empresa: d?.options[d.selectedIndex].id,
      [name]: value,
    };

    setInput(newForm);
  };

  useEffect(() => {
    switch (input.empresaReal) {
      case "Car Group S.A.":
        const newForm = {
          ...input,
          codigoMarca: 2,
          codigoEmpresa: 8,
          marca: "FIAT",
          empresaContabiliza: false,
        };
        console.log(newForm, "aca");
        setInput(newForm);
        break;
      case "Gestión Financiera S.A.":
        setInput({
          ...input,
          ["codigoMarca"]: 2,
          ["codigoEmpresa"]: 1,
          ["marca"]: "FIAT",
          ["empresaContabiliza"]: true,
        });
        break;
      case "AutoNet S.A":
        setInput({
          ...input,
          ["codigoMarca"]: 2,
          ["codigoEmpresa"]: 3,
          ["marca"]: "FIAT",
          ["empresaContabiliza"]: false,
        });
        break;
      case "Alizze S.A.":
        setInput({
          ...input,
          ["codigoMarca"]: 11,
          ["codigoEmpresa"]: 14,
          ["marca"]: "PEUGEOT",
          ["empresaContabiliza"]: false,
        });
        break;
      case "Gestión Financiera Luxcar":
        setInput({
          ...input,
          ["codigoMarca"]: 10,
          ["codigoEmpresa"]: 13,
          ["marca"]: "VOLKSWAGEN",
          ["empresaContabiliza"]: true,
        });
        break;
      case "Autos del Plata S.A.":
        setInput({
          ...input,
          ["codigoMarca"]: 6,
          ["codigoEmpresa"]: 7,
          ["marca"]: "CHERY",
          ["empresaContabiliza"]: false,
        });
        break;
      case "Detroit S.A.":
        setInput({
          ...input,
          ["codigoMarca"]: 7,
          ["codigoEmpresa"]: 9,
          ["marca"]: "JEEP",
          ["empresaContabiliza"]: false,
        });
        break;
      case "Elysees S.A.":
        setInput({
          ...input,
          ["codigoMarca"]: 12,
          ["codigoEmpresa"]: 15,
          ["marca"]: "CITROEN",
          ["empresaContabiliza"]: true,
        });
        break;
    }
  }, [input.empresa]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(input));
    setInput({
      ...input,
      empresa: "",
      empresaReal: "",
      login: "",
      password: "",
      codigoMarca: 0,
      marca: "",
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={styles.title}>Planes de Ahorro 7</h3>

        <span>Iniciar sesión</span>
        <div style={{ position: "relative", margin: "1rem" }}>
          <select
            className={styles.input}
            id="select"
            name="empresaReal"
            value={input.empresaReal}
            onChange={handleChange}
            required
          >
            <option value="">-Elegir empresa-</option>
            <option id="pa7_cg" value="Car Group S.A.">
              Car Group S.A.
            </option>
            <option id="pa7" value="Gestión Financiera S.A.">
              Gestion Financiera S.A.
            </option>
            <option id="pa7" value="AutoNet S.A.">
              AutoNet S.A
            </option>
            <option id="pa7" value="Autos del Plata S.A.">
              Autos del Plata S.A.
            </option>
            <option id="pa7" value="Detroit S.A.">
              Detroit S.A.
            </option>
            <option id="pa7_elysees" value="Elysees S.A.">
              Elysees S.A.
            </option>
            <option id="pa7" value="Gestión Financiera Luxcar">
              Gestión Financiera Luxcar
            </option>
            <option id="pa7" value="Alizze S.A.">
              Alizze S.A.
            </option>
          </select>
        </div>
        <div style={{ position: "relative", margin: "1rem" }}>
          <BiIcons.BiUser className={styles.icon} />
          <input
            value={input.login}
            name="login"
            onChange={handleChange}
            className={styles.input}
            placeholder="Usuario"
            type="text"
          />
        </div>
        <div style={{ position: "relative", margin: "1rem" }}>
          <BiIcons.BiLockAlt className={styles.icon} />
          <input
            value={input.password}
            name="password"
            onChange={handleChange}
            className={styles.input}
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <hr className={styles.hr} />
        <Link to={"/recovery"} className={styles.forgotLink}>
          Olvidó su contraseña?
        </Link>
        <button type="submit" className={styles.btn}>
          Loguearse
        </button>
      </form>
    </div>
  );
};
