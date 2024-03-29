import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../../styles/Table.module.css";
import {
  updateOficiales,
  reset,
  createOficiales,
  endUpdate,
  getOficialCategoria,
} from "../../../reducers/ConfigDatosGenerales/Oficiales/OficialesSlice";
import {
  getAllUsuarios,
  getAllSupervisores,
} from "../../../reducers/ConfigDatosGenerales/Usuarios/UsuariosSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import { AppDispatch, RootState } from "../../../store";
import { Oficial } from "../../../types/ConfigDatosGenerales/Oficiales/Oficiales";

const OficialesForm = () => {
  const { id, categoria } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { oficialById, oficialStatus, oficialCategoria } = useSelector(
    (state: RootState) => state.oficiales
  );
  const { user } = useSelector((state: RootState) => state.login);
  const { usuarios, supervisores } = useSelector(
    (state: RootState) => state.usuarios
  );

  const navigate = useNavigate();
  const [input, setInput] = useState<Oficial>({
    Codigo: "",
    login: "",
    Inactivo: null,
    Nombre: "",
    Activo: 0,
    HNMayor40: 0,
    Usuario: "",
    Objetivo: 0,
    TipoOficialMora: 0,
    Supervisor: null,
  });

  useEffect(() => {
    if (oficialStatus && oficialStatus.status === false) {
      Swal.fire({
        icon: "error",
        text: oficialStatus.message,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    }
    if (oficialStatus && oficialStatus.status === true) {
      Swal.fire({
        icon: "success",
        showConfirmButton: true,
        text: oficialStatus.message,
      }).then((result) => {
        if (result.isConfirmed && categoria) {
          dispatch(getOficialCategoria(categoria));
          window.location.assign(`/oficiales/${categoria}`);
        }
      });
    }
  }, [oficialStatus]);

  useEffect(() => {
    if (oficialStatus && oficialStatus.status === false) {
      Swal.fire({
        icon: "error",
        title: oficialStatus.message,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/oficiales");
        }
      });
    }
  }, [oficialStatus]);

  useEffect(() => {
    dispatch(reset());
    dispatch(getAllUsuarios());
    if (categoria) {
      dispatch(getOficialCategoria(categoria));
    }
    if (categoria === "Subite") dispatch(getAllSupervisores());
    return () => {
      if (id) {
        dispatch(
          endUpdate({
            categoria: oficialCategoria,
            Codigo: parseInt(id),
          })
        );
      }
    };
  }, []);
  const oficialUsuario = oficialById?.IdUsuarioLogin
    ? usuarios?.find((e) => e.Usuario === oficialById?.IdUsuarioLogin) //puede estar en una propiedad o en la otra,
    : oficialById?.login
    ? usuarios?.find((e) => e.Usuario === oficialById?.login)
    : null; //segun el tipo de oficial

  const oficialSupervisor = supervisores?.find(
    (e) => e.Codigo === oficialById?.Supervisor
  );
  useEffect(() => {
    setInput({
      Nombre: oficialById?.Nombre ? oficialById.Nombre : "",
      Usuario: oficialUsuario ? oficialUsuario.Usuario : "",
      /*         ? oficialUsuario?.Usuario
        : oficialUsuario?.IdUsuarioLogin ?  oficialUsuario?.IdUsuarioLogin : null, */
      Activo:
        oficialById?.Activo ||
        oficialById?.Inactivo === null ||
        oficialById?.Inactivo === 0
          ? 1
          : 0,
      Objetivo: oficialById ? oficialById.Objetivo : 0,
      TipoOficialMora: oficialById?.TipoOficialMora
        ? oficialById?.TipoOficialMora
        : 0,
      HNMayor40: oficialById?.HNMayor40 ? oficialById?.HNMayor40 : 0,
      Supervisor: oficialById ? oficialById.Supervisor : null,
    });
  }, [oficialById]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...input, [name]: value };
    setInput(newForm);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(
      updateOficiales({
        categoria: categoria ? categoria : null,
        Codigo: id ? id : "",
        Nombre: input.Nombre,
        Usuario: input.Usuario,
        Activo: input.Activo,
        TipoOficialMora: input.TipoOficialMora,
        HNMayor40: input.HNMayor40,
        Supervisor: input.Supervisor,
        Objetivo: input.Objetivo,
      })
    );
    setInput({
      Codigo: "",
      login: "",
      Inactivo: null,
      Nombre: "",
      Activo: 0,
      HNMayor40: 0,
      Usuario: "",
      Objetivo: 0,
      TipoOficialMora: 0,
      Supervisor: null,
    });
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        Activo: 1,
      });
    } else if (!e.target.checked) {
      setInput({
        ...input,
        Activo: 0,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createOficiales({
        categoria: categoria,
        Nombre: input.Nombre,
        Usuario: input.Usuario,
        Activo: input.Activo,
        TipoOficialMora: input.TipoOficialMora,
        HNMayor40: input.HNMayor40,
        Supervisor: input.Supervisor,
        Objetivo: input.Objetivo,
      })
    );

    setInput({
      Codigo: "",
      login: "",
      Inactivo: null,
      Nombre: "",
      Activo: 0,
      HNMayor40: 0,
      Usuario: "",
      Objetivo: 0,
      TipoOficialMora: 0,
      Supervisor: null,
    });
  };

  const floatingLabel = {
    textAlign: "start",
    padding: "0.5em",
    width: "17rem",
    marginTop: "1rem",
  };
  return (
    <div className={styles.container}>
      <TitleLogo style={{ marginTop: "1.1rem", alignSelf: "flex-start" }}>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
      </TitleLogo>
      <Form action="" className={styles.form} style={{ minWidth: "35rem" }}>
        <Stack className={styles.titleContainer} direction="horizontal" gap={3}>
          <TitlePrimary>
            {id?.length ? "Modificar Oficial" : `Alta Oficiales (${categoria})`}
          </TitlePrimary>

          <Link
            className="ms-auto"
            style={{ marginRight: "1rem", marginTop: "-1rem" }}
            to={"/oficiales"}
          >
            <ButtonPrimary>Volver</ButtonPrimary>
          </Link>
        </Stack>

        <div className={styles.containerInputText}>
          <Row className="g-2">
            <Form.Group
              as={Col}
              style={{ marginTop: ".5rem", marginBottom: ".2rem" }}
            >
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Nombre"
                style={{
                  textAlign: "start",
                  padding: "0.5em",
                  width: "17rem",
                  marginTop: "1rem",
                }}
              >
                <Form.Control
                  type="text"
                  value={input.Nombre}
                  name="Nombre"
                  placeholder="Nombre"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          {categoria === "Subite" || categoria === "Compra" ? (
            <div className={styles.inputSelect}>
              <Row className="g-2" style={{ margin: ".7rem" }}>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">HNMayor40</InputGroup.Text>
                  <Form.Select
                    size="sm"
                    name="HNMayor40"
                    value={input.HNMayor40 ? input.HNMayor40 : ""}
                    onChange={handleChange}
                    id=""
                  >
                    <option value={0}>Menor a 50.000</option>
                    <option value={1}>Mayor a 50.000</option>
                  </Form.Select>
                </InputGroup>
              </Row>{" "}
            </div>
          ) : null}

          {categoria === "Subite" ||
          categoria === "Compra" ||
          categoria === "Mora" ||
          categoria === "Scoring" ||
          categoria === "Licitaciones" ? (
            <div className={styles.inputSelect}>
              <Row className="g-2" style={{ margin: ".7rem" }}>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
                  <Form.Select
                    size="sm"
                    name="Usuario"
                    required
                    value={input.Usuario}
                    onChange={handleChange}
                    id=""
                  >
                    {oficialUsuario ? (
                      <option value={oficialUsuario.Usuario}>
                        {oficialUsuario.Usuario}
                      </option>
                    ) : (
                      <option value={oficialById?.IdUsuarioLogin}>
                        {oficialById?.IdUsuarioLogin}
                      </option>
                    )}
                    {usuarios &&
                      usuarios.map((e) => (
                        <option value={e.Usuario}>{e.Usuario}</option>
                      ))}
                  </Form.Select>
                </InputGroup>
              </Row>{" "}
            </div>
          ) : null}

          {categoria === "Scoring" ? (
            <Row className="g-2">
              <Form.Group
                as={Col}
                style={{ marginTop: ".5rem", marginBottom: ".2rem" }}
              >
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Objetivo"
                  style={{
                    textAlign: "start",
                    padding: "0.5em",
                    width: "17rem",
                    marginTop: "1rem",
                  }}
                >
                  <Form.Control
                    type="text"
                    value={input.Objetivo ? input.Objetivo : ""}
                    name="Objetivo"
                    placeholder="Objetivo"
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
          ) : null}
          {categoria === "Mora" ? (
            <div className={styles.inputSelect}>
              <Row className="g-2" style={{ margin: ".7rem" }}>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    Tipo Oficial Mora
                  </InputGroup.Text>
                  <Form.Select
                    size="sm"
                    name="TipoOficialMora"
                    value={input.TipoOficialMora ? input.TipoOficialMora : ""}
                    onChange={handleChange}
                    id=""
                  >
                    <option>none</option>
                    <option value={1}>Temprana</option>
                    <option value={2}>Especializada</option>
                    <option value={3}>Encuadre</option>
                  </Form.Select>
                </InputGroup>
              </Row>{" "}
            </div>
          ) : null}
          {categoria === "Subite" ? (
            <div className={styles.inputSelect}>
              <Row className="g-2" style={{ margin: ".7rem" }}>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    Supervisor
                  </InputGroup.Text>
                  <Form.Select
                    size="sm"
                    name="Supervisor"
                    value={input.Supervisor ? input.Supervisor : ""}
                    onChange={handleChange}
                    id=""
                  >
                    {oficialSupervisor ? (
                      <option value={oficialSupervisor.Nombre}>
                        {oficialSupervisor.Nombre}
                      </option>
                    ) : (
                      <option
                        value={
                          oficialById?.Supervisor ? oficialById.Supervisor : ""
                        }
                      >
                        {oficialById?.Supervisor}
                      </option>
                    )}
                    {supervisores &&
                      supervisores.map((e) => (
                        <option value={e.Codigo}>{e.Nombre}</option>
                      ))}
                  </Form.Select>
                </InputGroup>
              </Row>{" "}
            </div>
          ) : null}
          <Row className="g-2">
            <Form.Group
              as={Col}
              style={{
                placeContent: "center",
                marginBottom: ".7rem",
                alignItems: "center",
              }}
            >
              {input.Activo === 1 ? (
                <input
                  onChange={(e) => handleCheck(e)}
                  type="checkbox"
                  checked
                />
              ) : (
                <input onChange={(e) => handleCheck(e)} type="checkbox" />
              )}
              <span>Activo</span>
            </Form.Group>
          </Row>
        </div>
        {id?.length ? (
          <ButtonPrimary
            type="submit"
            style={{ marginBottom: ".4rem" }}
            onClick={(e) => handleUpdate(e)}
          >
            Actualizar
          </ButtonPrimary>
        ) : (
          <ButtonPrimary
            onClick={handleSubmit}
            style={{ marginBottom: ".4rem" }}
            type="submit"
          >
            Enviar
          </ButtonPrimary>
        )}
      </Form>
    </div>
  );
};

export default OficialesForm;
