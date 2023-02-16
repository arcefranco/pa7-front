import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BiggerTitleLogo from "../../../styled-components/containers/BiggerTitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import {
  getFormasPago,
  getIntereses,
  getModeloPrecio,
  getModelos,
  getModeloValorCuota,
  getOficialCanje,
  getOrigenSuscripcion,
  getPuntosVenta,
  getSucursales,
  getSupervisores,
  getTarjetas,
  getTeamLeaders,
  getVendedores,
  getFechaMinimaCont,
  reset,
  verifyDoc,
  verifySolicitud,
  verifySolicitudStatus,
  altaPre,
  resetStatus,
} from "../../../reducers/Operaciones/altaPre/altaPreSlice";
import styles from "./AltaPre.module.css";
import isAfterToday from "../../../helpers/isAfterToday";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../../store";
import { Interes } from "../../../types/Operaciones/Interes";
import { tipoPrecio } from "../../../types/Operaciones/PreSol";
import { Modelo } from "../../../types/ConfigDatosGenerales/Modelo/Modelo";
import { PreSol } from "../../../types/Operaciones/PreSol";
import { Vendedor } from "../../../types/ConfigDatosGenerales/Vendedor/Vendedor";
import { TeamLeader } from "../../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";

const AltaPre = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.login);
  const {
    modelos,
    sucursales,
    formasPago,
    vendedores,
    puntosventa,
    oficialesCanje,
    supervisores,
    teamleaders,
    intereses,
    tarjetas,
    origen,
    fechaMinimaCont,
    verifyResult,
    verifyStatus,
    modeloValorCuota,
    modeloPrecios,
    solicitudesDoc,
    altaPreStatus,
  } = useSelector((state: RootState) => state.AltaPre);
  const [modelosFiltered, setModelosFiltered] = useState<Modelo[]>([]);
  const [vendedorSelected, setVendedorSelected] = useState<Vendedor>();
  const [teamLeaderSelected, setTeamLeaderSelected] = useState<TeamLeader>();
  const [supervisorSelected, setSupervisorSelected] = useState<Supervisor>();
  const [interesesFiltered, setInteresesFiltered] = useState<Interes[]>([]);
  const [isTarjeta, setIsTarjeta] = useState(false);
  const [error, setError] = useState<any>();
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(true);

  const [input, setInput] = useState<PreSol>({
    Marca: user?.codigoMarca ? user.codigoMarca : 0,
    Empresa: user?.codigoEmpresa,
    empresaNombre: user?.empresaReal ? user.empresaReal : "",
    Solicitud: 0,
    FechaAlta: "",
    tipoplan: 0,
    CodModelo: 0,
    CuotaTerminal: 0,
    TipoDocumento: 0,
    NroDocumento: 0,
    NroCuil: "",
    FechaNac: "",
    tieneEmail: 0,
    Apellido: "",
    Nombres: "",
    EmailParticular: "",
    EmailLaboral: "",
    Domicilio: "",
    Numero: 0,
    Piso: 0,
    Dto: 0,
    CodPostal: 0,
    Localidad: "",
    Provincia: "",
    Telefonos: "",
    Telefonos2: "",
    Telefonos3: "",
    Telefonos4: "",
    Ocupacion: "",
    CodTipoResponsable: "",
    ContactoAD: "",
    tipoPrecio: tipoPrecio.A,
    ImporteTotalCuota: 0,
    nroRecibo1: "",
    nroRecibo2: "",
    CodSucReal: 0,
    CodFormaPago: 0,
    CuentaContable: "",
    Cantpagos: 0,
    Vendedor: 0,
    FechaCheque: "",
    FechaEstimCancelacion: "",
    CodTL: 0,
    CodSupervisor: 0,
    Importe: 0,
    CodPuntoVenta: "",
    importeAbonado: 0,
    Interes: 0,
    OficialPC: 0,
    CodTarjeta: "",
    NroTarjeta: "",
    origensuscripcion: 0,
    FechaCupon: "",
    NroCupon: "",
    DebitoAutomatico: 0,
    TieneDNI: 0,
    TieneServicio: 0,
    TieneAnexos: 0,
    PromoEspecial: 0,
    PlanSubite: 0,
    Lote: 0,
    observaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...input, [name]: value };

    setInput(newForm);
  };
  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
    const newForm = { ...input, [name]: parseFloat(value) };

    setInput(newForm);
  };
  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...input, [name]: value };
    setInput(newForm);
  };

  const handleCheckPrecio = (e) => {
    if (e.target.value === "1") {
      setInput({
        ...input,
        tipoPrecio: tipoPrecio.B,
      });
    } else {
      setInput({
        ...input,
        tipoPrecio: tipoPrecio.A,
      });
    }
  };

  const onBlurRequired = (e) => {
    let nameTarget = e.target.name;
    if (!e.target.value) {
      setError({ ...error, [nameTarget]: "Campo Requerido" });
    } else {
      setError({ ...error, [nameTarget]: "" });
    }
  };

  const onBlurSolicitud = () => {
    if (!input.Solicitud) {
      setError({
        ...error,
        Solicitud: "Debe completar el numero de solicitud",
      });
    } else {
      dispatch(verifySolicitud({ solicitud: input.Solicitud }));
      dispatch(
        verifySolicitudStatus({
          solicitud: input.Solicitud,
          codMarca: user?.codigoMarca ? user?.codigoMarca : 0,
        })
      );
      setError({ ...error, Solicitud: "" });
    }
  };

  const onBlurNacimiento = () => {
    if (
      input.FechaNac >
        `${date.getUTCFullYear() - 18}-${
          date.getUTCMonth() + 1
        }-${date.getUTCDate()}` ||
      !input.FechaNac
    ) {
      setInput({ ...input, FechaNac: "" });
      setError({
        ...error,
        FechaNac: "El Cliente debe ser mayor de 18 años",
      });
    } else {
      setError({});
    }
  };

  const onBlurFecha = () => {
    if (isAfterToday(input.FechaAlta)) {
      setError({
        ...error,
        FechaAlta: "Está ingresando una fecha posterior a la actual",
      });

      setInput({ ...input, FechaAlta: "" });
    } else if (
      input.FechaAlta <
      `${fechaMinimaCont?.ValorSTR?.slice(
        0,
        4
      )}-${fechaMinimaCont?.ValorSTR?.slice(
        4,
        6
      )}-${fechaMinimaCont?.ValorSTR.slice(
        6,
        fechaMinimaCont?.ValorSTR.length
      )}`
    ) {
      setError({
        ...error,
        FechaAlta:
          "Esta ingresando una fecha anterior a la fecha minima de contabilización",
      });

      setInput({ ...input, FechaAlta: "" });
    } else {
      setError({ ...error, FechaAlta: "" });
    }
  };

  const onBlurDoc = () => {
    if (!(input.TipoDocumento > 0) || !(input.NroDocumento > 0)) {
      setError({
        ...error,
        Documento: "Debe completar los datos del documento",
      });
      setInput({ ...input, NroDocumento: 0 });
    } else {
      setError({});
      dispatch(
        verifyDoc({
          documento: input.TipoDocumento,
          documentoNro: input.NroDocumento,
        })
      );
    }
  };

  const onBlurEmail = () => {
    if (input.EmailLaboral.length) {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailLaboral)) {
        setError({ ...error, EmailLaboral: "Email invalido" });
        setInput({ ...input, EmailLaboral: "" });
      } else {
        setError({ ...error, EmailLaboral: "" });
      }
    } else if (input.EmailParticular.length) {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailParticular)) {
        setInput({ ...input, EmailParticular: "" });
      } else {
        setError({ ...error, EmailParticular: "" });
      }
    }
  };

  const onBlurTelef = (e) => {
    let nameTarget = e.target.name;
    if (e.target.value && e.target.value.length < 8) {
      setError({ ...error, [nameTarget]: "Debe tener al menos 8 digitos" });
    } else {
      setError({ ...error, [nameTarget]: "" });
    }
  };

  const onBlurTelefUltimo = (e) => {
    let nameTarget = e.target.name;
    const telefCargados: string[] = [];
    if (input.Telefonos) telefCargados.push(input.Telefonos);
    if (input.Telefonos2) telefCargados.push(input.Telefonos2);
    if (input.Telefonos4) telefCargados.push(input.Telefonos4);
    if (input.Telefonos3) telefCargados.push(input.Telefonos3);
    console.log(telefCargados);
    if (e.target.value && e.target.value.length < 8) {
      setError({ ...error, [nameTarget]: "Debe tener al menos 8 digitos" });
    } else {
      setError({ ...error, [nameTarget]: "" });
    }
  };

  const onBlurRecibo1 = () => {
    if (input.nroRecibo1.length) {
      if (input.nroRecibo1.length < 4) {
        let difference = 4 - input.nroRecibo1.length;
        let zeros = "0".repeat(difference);
        setInput({ ...input, nroRecibo1: zeros + input.nroRecibo1 });
        setError({ ...error, nroRecibo1: "" });
      }
    } else {
      setError({ ...error, nroRecibo1: "Campo Requerido" });
    }
  };

  const onBlurRecibo2 = () => {
    if (input.nroRecibo2.length) {
      if (input.nroRecibo2.length < 8) {
        let difference = 8 - input.nroRecibo2.length;
        let zeros = "0".repeat(difference);
        setInput({ ...input, nroRecibo2: zeros + input.nroRecibo2 });
        setError({ ...error, nroRecibo2: "" });
      }
    } else {
      setError({ ...error, nroRecibo2: "Campo Requerido" });
    }
  };

  const onBlurCantpagos = () => {
    if (input.Importe && interesesFiltered.length) {
      if (input.Cantpagos !== 1) {
        const interesSelected = interesesFiltered.find(
          (e) => e.Cantidad === input.Cantpagos
        )?.Interes;
        setInput({
          ...input,
          Interes:
            (input.Importe * (interesSelected ? interesSelected : 0)) / 100,
          importeAbonado:
            input.Importe +
            (input.Importe * (interesSelected ? interesSelected : 0)) / 100,
        });
        setError({ ...error, Importe: "" });
      } else {
        setInput({ ...input, Interes: 0, importeAbonado: input.Importe });
      }
    } else if (input.Importe && !interesesFiltered.length) {
      setInput({ ...input, importeAbonado: input.Importe });
    }
  };

  const onBlurFormaDePago = (e) => {
    setInput({ ...input, Importe: 0, Cantpagos: 0, importeAbonado: 0 });

    if (!e.target.value)
      setError({ ...error, CodFormaPago: "Campo requerido" });
    else {
      if (formasPago && formasPago.length && input.CodFormaPago) {
        setInput({
          ...input,
          CuentaContable: formasPago?.find(
            (e) => e.Codigo === input.CodFormaPago
          )?.CuentaContable,
        });
      }
      setError({ ...error, CodFormaPago: "" });
    }
  };

  const onBlurTarjeta = (e) => {
    if (isTarjeta) {
      let nameTarget = e.target.name;
      if (!e.target.value) {
        setError({ ...error, [nameTarget]: "Campo Requerido" });
      } else {
        setError({ ...error, [nameTarget]: "" });
      }
    }
  };

  const onClick = () => {
    const telefCargados: string[] = [];
    const emailsCargados: string[] = [];
    if (input.Telefonos) telefCargados.push(input.Telefonos);
    if (input.Telefonos2) telefCargados.push(input.Telefonos2);
    if (input.Telefonos4) telefCargados.push(input.Telefonos4);
    if (input.Telefonos3) telefCargados.push(input.Telefonos3);
    if (input.EmailLaboral) emailsCargados.push(input.EmailLaboral);
    if (input.EmailParticular) emailsCargados.push(input.EmailParticular);
    const duplicates = telefCargados.filter(
      (item, index) => telefCargados.indexOf(item) !== index
    );
    if (!input.Solicitud) {
      setError({ ...error, Solicitud: "Debe ingresar numero de solicitud" });
      return;
    }
    if (!input.FechaAlta) {
      setError({ ...error, FechaAlta: "Debe ingresar una fecha" });
      return;
    }
    if (!input.tipoplan) {
      setError({ ...error, TipoPlan: "Debe ingresar un tipo de plan" });
      return;
    }
    if (!input.CodModelo) {
      setError({ ...error, Modelo: "Debe elegir un modelo" });
      return;
    }
    if (!input.TipoDocumento || !input.NroDocumento) {
      setError({
        ...error,
        Documento: "Debe completar los datos del documento",
      });
      return;
    }
    if (
      input.FechaNac >
        `${date.getUTCFullYear() - 18}-${
          date.getUTCMonth() + 1
        }-${date.getUTCDate()}` ||
      !input.FechaNac
    ) {
      setError({
        ...error,
        Nacimiento: "El Cliente debe ser mayor de 18 años",
      });
      return;
    }
    if (!input.Apellido) {
      setError({ ...error, Apellido: "Campo Requerido" });
      return;
    }
    if (!input.Nombres) {
      setError({ ...error, Nombre: "Campo Requerido" });
      return;
    }
    if (!emailsCargados.length && input.tieneEmail === 0) {
      alert("Debe haber al menos 1 email");
      return;
    }
    if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailParticular) &&
      input.EmailParticular
    ) {
      setError({ ...error, EmailParticular: "Email invalido" });
      return;
    }
    if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailLaboral) &&
      input.EmailLaboral
    ) {
      setError({ ...error, EmailLaboral: "Email invalido" });
      return;
    }
    if (!input.Domicilio.length) {
      setError({ ...error, Domicilio: "Campo Requerido" });
      return;
    }
    if (!input.Numero) {
      setError({ ...error, Numero: "Campo Requerido" });
      return;
    }
    if (!input.CodPostal) {
      setError({ ...error, CodPostal: "Campo Requerido" });
      return;
    }
    if (!input.Localidad.length) {
      setError({ ...error, Localidad: "Campo Requerido" });
      return;
    }
    if (!input.Provincia) {
      setError({ ...error, Provincia: "Campo Requerido" });
      return;
    }
    if (telefCargados.length < 2) {
      alert("Debe haber al menos 2(dos) teléfonos");
      return;
    }
    if (duplicates.length) {
      alert("No puede haber dos teléfonos iguales");
      return;
    }
    if (!input.CodTipoResponsable) {
      setError({ ...error, CodTipoResponsable: "Campo Requerido" });
      return;
    }
    if (!input.nroRecibo2.length) {
      setError({ ...error, nroRecibo2: "Campo Requerido" });
      return;
    }
    if (!input.nroRecibo1.length) {
      setError({ ...error, nroRecibo1: "Campo Requerido" });
      return;
    }
    if (!input.CodSucReal) {
      setError({ ...error, CodSucReal: "Campo Requerido" });
      return;
    }
    if (!input.CodFormaPago) {
      setError({ ...error, CodFormaPago: "Campo Requerido" });
      return;
    }
    if (!input.Vendedor) {
      setError({ ...error, Vendedor: "Campo Requerido" });
      return;
    }
    if (!input.Importe) {
      setError({ ...error, Importe: "Falta importe" });
      return;
    }

    if (isTarjeta && !input.CodTarjeta) {
      setError({ ...error, CodTarjeta: "Campo Requerido" });
      return;
    }
    if (isTarjeta && !input.NroCupon) {
      setError({ ...error, NroCupon: "Campo Requerido" });
      return;
    }
    if (isTarjeta && !input.NroTarjeta) {
      setError({ ...error, NroTarjeta: "Campo Requerido" });
      return;
    }
    if (isTarjeta && !input.FechaCupon) {
      setError({ ...error, FechaCupon: "Campo Requerido" });
      return;
    }
    if (isTarjeta && !input.Lote) {
      setError({ ...error, Lote: "Campo Requerido" });
      return;
    }

    if (!input.CodPuntoVenta) {
      setError({ ...error, CodPuntoVenta: "Campo Requerido" });
      return;
    }
    if (!input.origensuscripcion) {
      setError({ ...error, origensuscripcion: "Campo Requerido" });
      return;
    } else {
      const sumErrors = Object.values(error).reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0
      );
      if (sumErrors == 0) {
        dispatch(altaPre(input));
      } else {
        alert(`Hay ${sumErrors} errores`);
      }
    }
  };

  useEffect(() => {
    //Manejar actualizaciones de vendedores (ABM) y su inUpdate
    setModal(true);

    function resetModal() {
      dispatch(resetStatus());
      setModal(false);
    }

    if (altaPreStatus && Object.keys(altaPreStatus).length) {
      setTimeout(resetModal, 5000);
    }
  }, [altaPreStatus]);

  useEffect(() => {
    if (user?.codigoMarca)
      Promise.all([
        dispatch(getModelos()),
        dispatch(getSucursales()),
        dispatch(getFormasPago()),
        dispatch(getVendedores()),
        dispatch(getPuntosVenta()),
        dispatch(getOficialCanje()),
        dispatch(getTeamLeaders()),
        dispatch(getSupervisores()),
        dispatch(getIntereses()),
        dispatch(getTarjetas()),
        dispatch(getOrigenSuscripcion()),
        dispatch(getFechaMinimaCont({ marca: user?.codigoMarca })),
      ]);

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (verifyResult.length && input.Solicitud) {
      alert(
        "El numero de solicitud ingresado ya se encuentra en Operaciones ingresadas"
      );
      setInput({ ...input, Solicitud: 0 });
    } else if (verifyStatus && Object.keys(verifyStatus).length) {
      if (verifyStatus.CodSupervisor) {
        alert("La solicitud ingresada ya se encuentra asignada");
        setInput({ ...input, Solicitud: 0 });
      }
      if (verifyStatus.Anulada) {
        alert("La solicitud ingresada se encuentra anulada");
        setInput({ ...input, Solicitud: 0 });
      }
    }
  }, [verifyResult, verifyStatus]);

  //OPTIONS MODELOS

  useEffect(() => {
    if (input.tipoplan !== 0 && modelos.length) {
      setInput({ ...input, ImporteTotalCuota: 0, CuotaTerminal: 0 });
      setModelosFiltered(
        modelos?.filter(
          (e) =>
            e.TipoPlan === input.tipoplan &&
            e.Marca === user?.codigoMarca &&
            e.Activo === 1 &&
            e.CuotaTerminal !== null
        )
      );
    } else {
      setInput({ ...input, ImporteTotalCuota: 0, CuotaTerminal: 0 });
      setModelosFiltered([]);
    }
  }, [input.tipoplan]);

  //VALOR CUOTA TERMINAL

  useEffect(() => {
    if (modelos.length && input.CodModelo && user?.codigoMarca) {
      dispatch(
        getModeloValorCuota({
          codMarca: user?.codigoMarca,
          modelo: input.CodModelo,
          tipoPlan: input.tipoplan,
        })
      );
      dispatch(
        getModeloPrecio({
          codMarca: user?.codigoMarca,
          modelo: input.CodModelo,
          tipoPlan: input.tipoplan,
        })
      );
    }
  }, [input.CodModelo]);

  useEffect(() => {
    if (modeloValorCuota?.CuotaTerminal)
      setInput({ ...input, CuotaTerminal: modeloValorCuota?.CuotaTerminal });
  }, [modeloValorCuota]);

  useEffect(() => {
    if (
      input.tipoPrecio === "B" &&
      modeloPrecios &&
      Object.keys(modeloPrecios).length
    ) {
      setInput({
        ...input,
        ImporteTotalCuota: modeloPrecios.PrecioB.CuotaACobrar,
      });
    } else {
      if (modeloPrecios && Object.keys(modeloPrecios).length) {
        setInput({
          ...input,
          ImporteTotalCuota: modeloPrecios.PrecioA.CuotaACobrar,
        });
      }
    }
  }, [modeloPrecios, input.tipoPrecio]);

  useEffect(() => {
    if (
      input.importeAbonado &&
      input.importeAbonado > input.ImporteTotalCuota
    ) {
      alert(
        "El valor abonado no puede ser superior al importe total de la cuota"
      );
      setInput({ ...input, Importe: 0, Cantpagos: 0, importeAbonado: 0 });
    } else if (
      input.importeAbonado &&
      input.importeAbonado < input.ImporteTotalCuota &&
      !input.FechaEstimCancelacion
    ) {
      setError({ ...error, FechaEstimCancelacion: "Campo Requerido" });
    } else if (input.importeAbonado === input.ImporteTotalCuota) {
      setError({ ...error, FechaEstimCancelacion: "" });
    }
  }, [input.importeAbonado]);

  useEffect(() => {
    if (vendedores && input.Vendedor) {
      setVendedorSelected(
        vendedores.find((e) => e.Codigo === input.Vendedor)
          ? vendedores.find((e) => e.Codigo === input.Vendedor)
          : undefined
      );
    }
  }, [input.Vendedor]);

  useEffect(() => {
    if (teamleaders && vendedorSelected)
      setTeamLeaderSelected(
        teamleaders.find((e) => e.Codigo === vendedorSelected?.TeamLeader)
          ? teamleaders.find((e) => e.Codigo === vendedorSelected?.TeamLeader)
          : undefined
      );
  }, [vendedorSelected]);

  useEffect(() => {
    if (supervisores && teamLeaderSelected)
      setSupervisorSelected(
        supervisores?.find((e) => e.Codigo === teamLeaderSelected?.Sucursal)
      );
  }, [teamLeaderSelected]);

  useEffect(() => {
    setInput({
      ...input,
      CodTL: teamLeaderSelected?.Codigo,
      CodSupervisor: supervisorSelected?.Codigo,
      Vendedor: input.Vendedor,
    });
  }, [supervisorSelected]);

  useEffect(() => {
    if (solicitudesDoc?.docStatus?.length) {
      let suscriptor = solicitudesDoc.suscriptor[0];
      Swal.fire({
        icon: "success",
        title:
          "El cliente posee la(s) siguiente(s) operacion(es) " +
          `${solicitudesDoc.docStatus.map((e) => {
            return `Solicitud: ${e.Solicitud} Empresa: ${e.Empresa}`;
          })}`,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setInput({
            ...input,
            FechaNac: suscriptor.FechaNac.slice(0, 10),
            Nombres: suscriptor.Nombres,
            Apellido: suscriptor.Apellido,
            EmailLaboral: suscriptor.EmailLaboral,
            EmailParticular: suscriptor.EmailLaboral,
            Domicilio: suscriptor.Domicilio,
            Numero: suscriptor.NumeroCalle,
            Piso: suscriptor.Piso,
            Dto: suscriptor.Dto,
            CodPostal: suscriptor.CodPostal,
            Localidad: suscriptor.Localidad,
            Provincia: suscriptor.Provincia,
            Telefonos: suscriptor.Telefonos,
            Telefonos2: suscriptor.Telefonos2,
            Telefonos3: suscriptor.Telefonos3,
            Telefonos4: suscriptor.Telefonos4,
            Ocupacion: suscriptor.Ocupacion,
          });
        }
      });
    }
  }, [solicitudesDoc]);

  useEffect(() => {
    setInput({ ...input, Importe: 0, Cantpagos: 0, importeAbonado: 0 });

    if (input.CodFormaPago && intereses) {
      setInteresesFiltered(
        intereses.filter((e) => e.MedioCobro === input.CodFormaPago)
      );
    }
  }, [input.CodFormaPago]);

  useEffect(() => {
    if (
      formasPago?.find((e) => e.Codigo === input.CodFormaPago)?.EsTarjeta === 1
    )
      setIsTarjeta(true);
    else {
      setIsTarjeta(false);
      setError({
        ...error,
        CodTarjeta: "",
        FechaCupon: "",
        NroCupon: "",
        Lote: "",
        NroTarjeta: "",
      });
      setInput({
        ...input,
        CodTarjeta: "",
        FechaCupon: "",
        NroCupon: "",
        Lote: 0,
        NroTarjeta: "",
      });
    }
  }, [input.CodFormaPago]);

  useEffect(() => {
    if (altaPreStatus && Object.keys(altaPreStatus).includes("status")) {
      if (altaPreStatus.status) {
        Swal.fire({
          icon: "success",
          title: altaPreStatus.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: altaPreStatus.message,
        });
      }
    }
  }, [altaPreStatus]);

  return (
    <div className={styles.container}>
      <BiggerTitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary style={{ textAlign: "start" }}>
          Alta de Pre-Solicitudes({user?.marca})
        </TitlePrimary>
      </BiggerTitleLogo>

      <div className={styles.wholeForm}>
        <div className={styles.section}>
          <div className={styles.formTitleContainer}>
            <h5 style={{ margin: "0" }}>Datos Generales</h5>
          </div>
          <div className={styles.inputSection3}>
            <div className={styles.input}>
              <span>Nro Solicitud </span>
              <div className={styles.containerError}>
                <input
                  name="Solicitud"
                  onBlur={onBlurSolicitud}
                  onChange={handleChange}
                  value={input.Solicitud}
                  type="text"
                />
                {error?.Solicitud && (
                  <div className={styles.error}>{error.Solicitud}</div>
                )}
              </div>
            </div>

            <div className={styles.input}>
              <span>Fecha Alta </span>
              <div className={styles.containerError}>
                <input
                  name="FechaAlta"
                  onBlur={onBlurFecha}
                  onChange={handleChange}
                  value={input.FechaAlta}
                  type="date"
                />
                {error?.FechaAlta && (
                  <div className={styles.error}>{error.FechaAlta}</div>
                )}
              </div>
            </div>

            <div className={styles.input}>
              <span>Tipo Plan </span>
              <div className={styles.containerError}>
                <select
                  onBlur={onBlurRequired}
                  onChange={handleChangeNumber}
                  value={input.tipoplan}
                  name="tipoplan"
                  id=""
                >
                  <option value={0}>---</option>
                  <option value={1}>100%</option>
                  <option value={2}>70/30</option>
                  <option value={3}>60/40</option>
                  <option value={4}>75/25</option>
                  <option value={5}>80/20</option>
                  <option value={6}>90/10</option>
                </select>
                {error?.TipoPlan && (
                  <div className={styles.error}>{error.TipoPlan}</div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputSection2}>
            <div className={styles.input}>
              <span>Modelo </span>
              <div className={styles.containerError}>
                <select
                  onChange={handleChangeNumber}
                  onBlur={onBlurRequired}
                  value={input.CodModelo}
                  name="CodModelo"
                  id=""
                >
                  <option value="">---</option>
                  {modelosFiltered.length &&
                    modelosFiltered.map((e) => (
                      <option value={e.Codigo}>{e.Nombre}</option>
                    ))}
                </select>
                {error?.Modelo && (
                  <div className={styles.error}>{error.Modelo}</div>
                )}
              </div>
            </div>
            <div className={styles.input}>
              <span>Valor Cuota Term. </span>
              <input
                name="CuotaTerminal"
                disabled
                onChange={handleChange}
                value={input.CuotaTerminal}
                type="text"
                style={{ width: "-webkit-fill-available" }}
              />
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formTitleContainer}>
            <h5 style={{ margin: "0" }}>Datos del Suscriptor</h5>
          </div>
          <div className={styles.inputSection2}>
            <div
              className={styles.col1}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <div className={styles.input}>
                <span>Documento</span>
                <div className={styles.containerError}>
                  <select
                    name="TipoDocumento"
                    onChange={handleChangeNumber}
                    value={input.TipoDocumento}
                    id=""
                  >
                    <option value={0}>---</option>
                    <option value={1}>DNI</option>
                    <option value={2}>LE</option>
                    <option value={3}>LC</option>
                    <option value={4}>CI</option>
                    <option value={5}>PAS</option>
                    <option value={6}>CUIT</option>
                  </select>
                </div>
              </div>
              <div className={styles.input}>
                <span>Número</span>
                <div className={styles.containerError}>
                  <input
                    type="number"
                    onBlur={onBlurDoc}
                    name="NroDocumento"
                    id="DocumentoNro"
                    value={input.NroDocumento}
                    onChange={handleChangeNumber}
                  />
                  {error?.Documento && (
                    <div className={styles.error}>{error.Documento}</div>
                  )}
                </div>
              </div>
              {user?.codigoEmpresa === 14 ? (
                <div className={styles.input}>
                  <span>CUIL</span>
                  <div className={styles.containerError}>
                    <input
                      type="text"
                      name="CUIL"
                      value={input.NroCuil}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className={styles.col2}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <div className={styles.input}>
                <span>Fecha de Nacimiento </span>
                <div className={styles.containerError}>
                  {input.TipoDocumento !== 6 ? (
                    <input
                      name="FechaNac"
                      onBlur={onBlurNacimiento}
                      onChange={handleChange}
                      value={input.FechaNac}
                      type="date"
                      max={`${date.getUTCFullYear() - 18}-${
                        date.getUTCMonth() + 1
                      }-${date.getUTCDate()}`}
                    />
                  ) : (
                    <input name="Nacimiento" disabled type="date" />
                  )}
                  {error?.Nacimiento && (
                    <div className={styles.error}>{error.Nacimiento}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>No tiene Email</span>
                <input
                  type="checkbox"
                  style={{ height: "12px", width: "12px" }}
                  value={input.tieneEmail}
                  name="tieneEmail"
                  onChange={handleCheckChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.inputSection2}>
            <div className={styles.col1}>
              <div className={styles.input}>
                <span>Apellido</span>
                <div className={styles.containerError}>
                  <input
                    type="text"
                    name="Apellido"
                    onBlur={onBlurRequired}
                    value={input.Apellido}
                    onChange={handleChange}
                  />
                  {error?.Apellido && (
                    <div className={styles.error}>{error.Apellido}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>Nombre</span>
                <div className={styles.containerError}>
                  <input
                    type="text"
                    name="Nombres"
                    onBlur={onBlurRequired}
                    value={input.Nombres}
                    onChange={handleChange}
                  />
                  {error?.Nombre && (
                    <div className={styles.error}>{error.Nombre}</div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.input}>
                <span>Email Particular</span>
                <div className={styles.containerError}>
                  {input.tieneEmail === 0 ? (
                    <input
                      name="EmailParticular"
                      onBlur={onBlurEmail}
                      value={input.EmailParticular}
                      onChange={handleChange}
                    />
                  ) : (
                    <input type="text" disabled />
                  )}
                  {error?.EmailLaboral && (
                    <div className={styles.error}>{error.EmailLaboral}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>Email Laboral</span>
                <div className={styles.containerError}>
                  {input.tieneEmail === 0 ? (
                    <input
                      name="EmailLaboral"
                      onBlur={onBlurEmail}
                      value={input.EmailLaboral}
                      onChange={handleChange}
                    />
                  ) : (
                    <input type="text" disabled />
                  )}
                  {error?.EmailLaboral && (
                    <div className={styles.error}>{error.EmailLaboral}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.inputSection2}>
            <div
              className={styles.col1}
              style={{ display: "grid", gridTemplateColumns: ".5fr .5fr" }}
            >
              <div className={styles.input}>
                <span>Domicilio</span>
                <div className={styles.containerError}>
                  <input
                    name="Domicilio"
                    onBlur={onBlurRequired}
                    value={input.Domicilio}
                    onChange={handleChange}
                  />
                  {error?.Domicilio && (
                    <div className={styles.error}>{error.Domicilio}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>Número</span>
                <div className={styles.containerError}>
                  <input
                    type="number"
                    name="Numero"
                    onBlur={onBlurRequired}
                    value={input.Numero}
                    onChange={handleChange}
                  />
                  {error?.Numero && (
                    <div className={styles.error}>{error.Numero}</div>
                  )}
                </div>
              </div>

              <div className={styles.input}>
                <span>Piso</span>
                <input
                  type="number"
                  name="Piso"
                  value={input.Piso}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <span>Dto.</span>
                <input name="Dto" value={input.Dto} onChange={handleChange} />
              </div>
            </div>
            <div
              className={styles.col2}
              style={{ display: "grid", gridTemplateColumns: ".5fr .5fr" }}
            >
              <div className={styles.input}>
                <span>Cód. Postal</span>
                <div className={styles.containerError}>
                  <input
                    type="number"
                    name="CodPostal"
                    onBlur={onBlurRequired}
                    value={input.CodPostal}
                    onChange={handleChangeNumber}
                  />
                  {error?.CodPostal && (
                    <div className={styles.error}>{error.CodPostal}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>Localidad</span>
                <div className={styles.containerError}>
                  <input
                    name="Localidad"
                    onBlur={onBlurRequired}
                    value={input.Localidad}
                    onChange={handleChange}
                  />
                  {error?.Localidad && (
                    <div className={styles.error}>{error.Localidad}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>Provincia</span>
                <div className={styles.containerError}>
                  <input
                    name="Provincia"
                    value={input.Provincia}
                    onBlur={onBlurRequired}
                    onChange={handleChange}
                  />
                  {error?.Provincia && (
                    <div className={styles.error}>{error.Provincia}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.inputSection2}>
            <div className={styles.input}>
              <span>Teléf. Particular</span>
              <div className={styles.containerError}>
                <input
                  type="number"
                  name="Telefonos"
                  onBlur={onBlurTelef}
                  value={input.Telefonos}
                  onChange={handleChange}
                />
                {error?.Telefonos && (
                  <div className={styles.error}>{error.Telefonos}</div>
                )}
              </div>
            </div>
            <div className={styles.input}>
              <span>Teléf. Celular</span>
              <div className={styles.containerError}>
                <input
                  type="number"
                  name="Telefonos2"
                  onBlur={onBlurTelef}
                  value={input.Telefonos2}
                  onChange={handleChange}
                />
                {error?.Telefonos2 && (
                  <div className={styles.error}>{error.Telefonos2}</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.inputSection2}>
            <div className={styles.input}>
              <span>Teléf. Laboral</span>
              <div className={styles.containerError}>
                <input
                  type="number"
                  name="Telefonos3"
                  onBlur={onBlurTelef}
                  value={input.Telefonos3}
                  onChange={handleChange}
                />
                {error?.Telefonos3 && (
                  <div className={styles.error}>{error.Telefonos3}</div>
                )}
              </div>
            </div>
            <div className={styles.input}>
              <span>Teléf. Familiar</span>
              <div className={styles.containerError}>
                <input
                  type="number"
                  name="Telefonos4"
                  onBlur={onBlurTelefUltimo}
                  value={input.Telefonos4}
                  onChange={handleChange}
                />
                {error?.Telefonos4 && (
                  <div className={styles.error}>{error.Telefonos4}</div>
                )}
              </div>
            </div>
          </div>
          {error?.Telef && <div className={styles.error}>{error.Telef}</div>}
          <div className={styles.inputSection2}>
            <div className={styles.col1}>
              <div className={styles.input}>
                <span>Ocupación</span>
                <input
                  type="text"
                  name="Ocupacion"
                  value={input.Ocupacion}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <span>Cond. Iva</span>
                <div className={styles.containerError}>
                  <select
                    name="CodTipoResponsable"
                    id=""
                    value={input.CodTipoResponsable}
                    onBlur={onBlurRequired}
                    onChange={handleChangeNumber}
                  >
                    <option value={0}>---</option>
                    <option value={1}>RESPONSABLE INSCRIPTO</option>
                    <option value={2}>RESPONSABLE NO INSCRIPTO</option>
                    <option value={3}>EXENTO</option>
                    <option value={4}>RESPONSABLE MONOTRIBUTO</option>
                    <option value={5}>CONSUMIDOR FINAL</option>
                  </select>
                  {error?.CodTipoResponsable && (
                    <div className={styles.error}>
                      {error.CodTipoResponsable}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.input}>
                <span>Contacto AD</span>
                <input
                  type="text"
                  name="ContactoAD"
                  value={input.ContactoAD}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.formTitleContainer}>
            <h5 style={{ margin: "0" }}>Datos de la operación</h5>
          </div>
          <div className={styles.inputSection2} style={{ marginTop: "2rem" }}>
            <div
              className={styles.inputSection2}
              style={{ alignContent: "center" }}
            >
              <div>
                <input
                  type="radio"
                  value={0}
                  defaultChecked
                  onChange={handleCheckPrecio}
                  name="tipoPrecio"
                />{" "}
                Precio A
              </div>
              <div>
                <input
                  type="radio"
                  value={1}
                  onChange={handleCheckPrecio}
                  name="tipoPrecio"
                />{" "}
                Precio B
              </div>
            </div>
            <div style={{ columnGap: "0" }}>
              <div className={styles.input}>
                <span>Importe Total Cuota</span>{" "}
                <input
                  type="text"
                  value={input.ImporteTotalCuota}
                  name="TotalCuota"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.inputSection2}>
            <div className={styles.input}>
              <span>Nro Recibo</span>
              <div className={styles.containerError}>
                <input
                  type="text"
                  onBlur={onBlurRecibo1}
                  minLength={4}
                  maxLength={4}
                  value={input.nroRecibo1}
                  name="nroRecibo1"
                  onChange={handleChange}
                  style={{ marginRight: "1rem" }}
                />
                {error?.nroRecibo && (
                  <div className={styles.error}>{error.nroRecibo}</div>
                )}
              </div>
              <div>
                <div className={styles.containerError}>
                  <input
                    type="text"
                    onBlur={onBlurRecibo2}
                    value={input.nroRecibo2}
                    name="nroRecibo2"
                    onChange={handleChange}
                  />
                  {error?.nroRecibo2 && (
                    <div className={styles.error}>{error.nroRecibo2}</div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.input}>
              <span>Forma Pago</span>
              <div className={styles.containerError}>
                <select
                  name="CodFormaPago"
                  value={input.CodFormaPago}
                  onBlur={onBlurFormaDePago}
                  onChange={handleChangeNumber}
                  id=""
                >
                  <option value="">---</option>
                  {formasPago &&
                    formasPago.map((e) => (
                      <option key={e.Codigo} value={e.Codigo}>
                        {e.Codigo}-{e.Nombre}
                      </option>
                    ))}
                </select>
                {error?.CodFormaPago && (
                  <div className={styles.error}>{error.CodFormaPago}</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.inputSection2}>
            <div className={styles.input}>
              <span>Vendedor</span>
              <div className={styles.containerError}>
                <select
                  name="Vendedor"
                  value={input.Vendedor}
                  onBlur={onBlurRequired}
                  onChange={handleChangeNumber}
                  id=""
                >
                  <option value="">---</option>
                  {vendedores &&
                    vendedores.map((e) => (
                      <option key={e.Codigo} value={e.Codigo}>
                        {e.Codigo}-{e.Nombre}
                      </option>
                    ))}
                </select>
                {error?.Vendedor && (
                  <div className={styles.error}>{error.Vendedor}</div>
                )}
              </div>
            </div>
            <div>
              <div
                className={styles.inputSection2}
                style={{ columnGap: "3rem" }}
              >
                <div className={styles.input}>
                  <span>Fecha Cheque</span>
                  <input
                    type="date"
                    name="FechaCheque"
                    value={input.FechaCheque}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.input}>
                  <span>Fecha Estim. Canc. Saldo</span>
                  <div className={styles.containerError}>
                    <input
                      type="date"
                      name="FechaEstimCancelacion"
                      onBlur={onBlurRequired}
                      value={input.FechaEstimCancelacion}
                      onChange={handleChange}
                    />
                    {error?.FechaEstimCancelacion && (
                      <div className={styles.error}>
                        {error.FechaEstimCancelacion}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.inputSection2}>
            <div className={styles.input}>
              <span>Sucursal</span>
              <div className={styles.containerError}>
                <select
                  name="CodSucReal"
                  value={input.CodSucReal}
                  onBlur={onBlurRequired}
                  onChange={handleChange}
                  id=""
                >
                  <option value="*">---</option>
                  {sucursales &&
                    sucursales.map((e) => (
                      <option key={e.Codigo} value={e.Codigo}>
                        {e.Codigo}-{e.Nombre}
                      </option>
                    ))}
                </select>
                {error?.CodSucReal && (
                  <div className={styles.error}>{error.CodSucReal}</div>
                )}
              </div>
            </div>

            <div className={styles.inputSection2} style={{ columnGap: "0rem" }}>
              <div className={styles.input}>
                <span>Importe</span>
                <div className={styles.containerError}>
                  <input
                    type="number"
                    name="Importe"
                    onBlur={onBlurCantpagos}
                    value={input.Importe}
                    onChange={handleChangeNumber}
                  />
                  {error?.Importe && (
                    <div className={styles.error}>{error.Importe}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>Imp Abonado</span>
                <input
                  type="number"
                  name="importeAbonado"
                  disabled
                  value={input.importeAbonado}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.inputSection2} style={{ marginTop: "2rem" }}>
            <fieldset
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "2rem",
              }}
            >
              <div className={styles.inputSection2} style={{ columnGap: "0" }}>
                <div className={styles.input}>
                  <span>Team Leader</span>
                  <b>
                    <span>{teamLeaderSelected?.Nombre}</span>
                  </b>
                </div>
                <div className={styles.input}>
                  <span>Supervisor</span>
                  <b>
                    <span>{supervisorSelected?.Nombre}</span>
                  </b>
                </div>
              </div>
              <div className={styles.input}>
                <span>Puntos de Venta</span>
                <div className={styles.containerError}>
                  {
                    <select
                      name="CodPuntoVenta"
                      value={input.CodPuntoVenta}
                      onBlur={onBlurRequired}
                      onChange={handleChange}
                      id=""
                    >
                      <option value={0}>---</option>
                      {puntosventa &&
                        puntosventa.map((e) => (
                          <option key={e.Codigo} value={e.Codigo}>
                            {e.Codigo}-{e.Nombre}
                          </option>
                        ))}
                    </select>
                  }
                  {error?.CodPuntoVenta && (
                    <div className={styles.error}>{error.CodPuntoVenta}</div>
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <span>Origen Suscripción</span>
                <div className={styles.containerError}>
                  <select
                    name="origensuscripcion"
                    value={input.origensuscripcion}
                    onBlur={onBlurRequired}
                    onChange={handleChange}
                    id=""
                  >
                    <option value="">---</option>
                    {origen &&
                      origen?.map((e) => (
                        <option key={e.Codigo} value={e.Codigo}>
                          {e.Codigo}-{e.Descripcion}
                        </option>
                      ))}
                  </select>
                  {error?.origensuscripcion && (
                    <div className={styles.error}>
                      {error.origensuscripcion}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.input}>
                <span>Oficial Plan Canje</span>
                <select
                  name="OficialPC"
                  value={input.OficialPC}
                  onChange={handleChange}
                  id=""
                >
                  <option value="">---</option>
                  {oficialesCanje &&
                    oficialesCanje?.map((e) => (
                      <option key={e.Codigo} value={e.Codigo}>
                        {e.Codigo}-{e.Nombre}
                      </option>
                    ))}
                </select>
              </div>
            </fieldset>

            <fieldset
              className={styles.fieldSet}
              disabled={
                formasPago &&
                formasPago?.find((e) => e.Codigo === input.CodFormaPago)
                  ?.EsTarjeta === 1
                  ? false
                  : true
              }
            >
              <div className={styles.divTarjetas} style={{ columnGap: "0" }}>
                <div
                  className={styles.inputSection2}
                  style={{ columnGap: "0" }}
                >
                  <div className={styles.input}>
                    <span>Tarjeta</span>
                    <div className={styles.containerError}>
                      <select
                        name="CodTarjeta"
                        value={input.CodTarjeta}
                        onBlur={onBlurTarjeta}
                        onChange={handleChange}
                        id=""
                      >
                        <option value="*">---</option>
                        {tarjetas?.length &&
                          tarjetas?.map((e) => (
                            <option value={e.Codigo}>{e.Nombre}</option>
                          ))}
                      </select>

                      {error?.CodTarjeta && (
                        <div className={styles.error}>{error.CodTarjeta}</div>
                      )}
                    </div>
                  </div>
                  <div className={styles.input}>
                    <span>Nro Tarjeta</span>
                    <div className={styles.containerError}>
                      <input
                        type="text"
                        name="NroTarjeta"
                        value={input.NroTarjeta}
                        onBlur={onBlurTarjeta}
                        onChange={handleChange}
                      />

                      {error?.NroTarjeta && (
                        <div className={styles.error}>{error.NroTarjeta}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.input}>
                  <span>Cant. Pagos</span>
                  <select
                    style={{
                      maxWidth: "118px",
                    }}
                    name="Cantpagos"
                    onBlur={onBlurCantpagos}
                    value={input.Cantpagos}
                    onChange={handleChangeNumber}
                    id=""
                  >
                    <option value="*">---</option>
                    {formasPago &&
                    formasPago?.find((e) => e.Codigo === input.CodFormaPago)
                      ?.EsTarjeta === 1 ? (
                      <option value={1}>1 pago sin interés</option>
                    ) : null}
                    {interesesFiltered.length &&
                      interesesFiltered.map((e) => (
                        <option
                          value={e.Cantidad}
                        >{`${e.Cantidad} pagos - ${e.Interes}% interés`}</option>
                      ))}
                  </select>
                  <div className={styles.input}>
                    <span>Interés</span>
                    <input
                      disabled
                      type="number"
                      name="Interes"
                      value={input.Interes}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div
                  className={styles.inputSection2}
                  style={{ columnGap: "0" }}
                >
                  <div className={styles.input}>
                    <span>Fecha Cupón</span>
                    <div className={styles.containerError}>
                      <input
                        type="date"
                        name="FechaCupon"
                        value={input.FechaCupon}
                        onBlur={onBlurTarjeta}
                        onChange={handleChange}
                      />
                      {error?.FechaCupon && (
                        <div className={styles.error}>{error.FechaCupon}</div>
                      )}
                    </div>
                  </div>
                  <div className={styles.input}>
                    <span>Nro Cupón</span>
                    <div className={styles.containerError}>
                      <input
                        type="text"
                        name="NroCupon"
                        value={input.NroCupon}
                        onBlur={onBlurTarjeta}
                        onChange={handleChange}
                      />
                      {error?.NroCupon && (
                        <div className={styles.error}>{error.NroCupon}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.input}>
                  <span>Lote</span>
                  <div className={styles.containerError}>
                    <input
                      type="number"
                      name="Lote"
                      value={input.Lote}
                      onBlur={onBlurTarjeta}
                      onChange={handleChange}
                    />
                    {error?.Lote && (
                      <div className={styles.error}>{error.Lote}</div>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <div
            className={styles.inputSection2}
            style={{ marginTop: "4rem", marginBottom: "1rem" }}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              <div className={styles.inputCheck}>
                <span>Anexos</span>
                <input
                  type="checkbox"
                  name="TieneAnexos"
                  onChange={handleCheckChange}
                />
              </div>
              <div className={styles.inputCheck}>
                <span>Promo Especial</span>
                <input
                  type="checkbox"
                  name="PromoEspecial"
                  onChange={handleCheckChange}
                />
              </div>
              <div className={styles.inputCheck}>
                <span>Plan Subite Pide Auto</span>
                <input
                  type="checkbox"
                  name="PlanSubite"
                  onChange={handleCheckChange}
                />
              </div>

              <div className={styles.inputCheck}>
                <span>Déb. Autom.</span>
                <input
                  type="checkbox"
                  name="DebitoAutomatico"
                  onChange={handleCheckChange}
                />
              </div>
              <div className={styles.inputCheck}>
                <span>DNI</span>
                <input
                  type="checkbox"
                  name="TieneDNI"
                  onChange={handleCheckChange}
                />
              </div>
              <div className={styles.inputCheck}>
                <span>Mail</span>
                <input
                  type="checkbox"
                  name="TieneServicio"
                  onChange={handleCheckChange}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <span>Observaciones: </span>
              <textarea
                name="observaciones"
                value={input.observaciones}
                onChange={handleChange}
                id=""
                cols={45}
                rows={4}
              ></textarea>
            </div>
          </div>
        </div>
        <button className={styles.submitButton} onClick={onClick}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default AltaPre;
