import React, { useEffect } from "react";
import styles from "./ActualPre.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as BsIcons from "react-icons/bs";
import Swal from "sweetalert2";
import {
  deletePago,
  updatePago,
} from "../../../reducers/Operaciones/actualPre/actualPreSlice";
import { AppDispatch, RootState } from "../../../store";
import { Senia } from "../../../types/Operaciones/Senia";
import { Interes } from "../../../types/Operaciones/Interes";

const FormaPagoItem = ({
  FechaSenia,
  ImpoSenia,
  Interes,
  NomFormaPago,
  CodFormaDePago,
  NroRecibo,
  FechaCheque,
  isReadOnly,
  ID,
  Tarjeta,
  NroTarjeta,
  Cupon,
  FechaCupon,
  Lote,
  CantPagos,
  CuotaACobrar,
}) => {
  const [inEdit, setInEdit] = useState(false);
  const { formasPago, tarjetas, intereses, seniaStatus, senias } = useSelector(
    (state: RootState) => state.ActualPre
  );
  const { user } = useSelector((state: RootState) => state.login);
  const [interesesFiltered, setInteresesFiltered] = useState<Interes[]>([]);
  const [totalAbonado, setTotalAbonado] = useState(
    senias.reduce(
      (total, array) =>
        !array.ImpoSenia
          ? 0
          : array.ImpoSenia * (!array.Interes ? 0 : array.Interes / 100) +
            array.ImpoSenia
          ? 0
          : array.ImpoSenia + total,
      0
    )
  );

  const [seniasFiltered, setSeniasFiltered] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  const [inputPago, setInputPago] = useState<Senia>({
    ID: ID,
    CuotaACobrar: CuotaACobrar,
    codigoMarca: user?.codigoMarca ? user.codigoMarca : 0,
    seniasFiltered: seniasFiltered,
    Fecha: FechaSenia?.slice(0, 10),
    Importe: ImpoSenia,
    Interes: Interes,
    ImpAbonado: ImpoSenia,
    FormaDePago: CodFormaDePago,
    Tarjeta: Tarjeta,
    NroTarjeta: NroTarjeta,
    NroCupon: Cupon,
    FechaCupon: FechaCupon,
    Lote: Lote,
    CantPagos: typeof CantPagos === "string" ? parseInt(CantPagos) : CantPagos,
    NroRecibo: NroRecibo,
    FechaVto: FechaCheque?.slice(0, 10),
  });
  const handlePago = (e) => {
    const { name, value } = e.target;

    const newForm = { ...inputPago, [name]: value };

    setInputPago(newForm);
  };

  const handleDelete = () => {
    Swal.fire({
      icon: "info",
      title: "Desea eliminar el pago?",
      text: "Recuerde que este proceso no eliminará el asiento contable",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && user?.codigoMarca) {
        dispatch(deletePago({ codigoMarca: user?.codigoMarca, ID: ID }));
      }
    });
  };

  const handleUpdate = () => {
    if (
      !inputPago.Fecha ||
      !inputPago.Importe ||
      !inputPago.FormaDePago ||
      isNaN(inputPago.Interes) ||
      !inputPago.ImpAbonado ||
      !inputPago.NroRecibo
    ) {
      alert("Faltan campos");
      return;
    }
    if (
      formasPago.length &&
      formasPago.find((e) => e.Codigo === parseInt(inputPago.FormaDePago))
        ?.EsTarjeta === 1 &&
      (!inputPago.Tarjeta ||
        !inputPago.NroTarjeta ||
        !inputPago.CantPagos ||
        !inputPago.NroCupon ||
        !inputPago.FechaCupon ||
        !inputPago.Lote)
    ) {
      alert("Faltan información de su tarjeta");
      return;
    }
    Swal.fire({
      icon: "info",
      title: "Desea modificar el pago?",
      text: "Recuerde que este proceso no modificará el asiento contable",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && user?.codigoMarca) {
        dispatch(updatePago(inputPago));
      }
    });
  };

  const onBlurImporte = () => {
    setInputPago({
      ...inputPago,
      CantPagos: 0,
    });

    if (
      formasPago &&
      formasPago.find((e) => e.Codigo === parseFloat(inputPago.FormaDePago))
        ?.EsTarjeta !== 1
    ) {
      setInputPago({ ...inputPago, Interes: 0, ImpAbonado: inputPago.Importe });
    }
  };

  const onBlurFormaDePago = (e) => {
    setInputPago({
      ...inputPago,
      cuentaContable:
        formasPago &&
        formasPago?.find((e) => e.Codigo === parseFloat(inputPago.FormaDePago))
          ?.CuentaContable
          ? formasPago?.find(
              (e) => e.Codigo === parseFloat(inputPago.FormaDePago)
            )?.CuentaContable
          : "",
      Interes:
        formasPago &&
        formasPago?.find((e) => e.Codigo === parseFloat(inputPago.FormaDePago))
          ?.EsTarjeta === 1
          ? 1
          : 0,
      ImpAbonado:
        formasPago &&
        formasPago?.find((e) => e.Codigo === parseFloat(inputPago.FormaDePago))
          ?.EsTarjeta === 1
          ? 0
          : inputPago.Importe,
    });
  };

  const onBlurCantPagos = () => {
    if (inputPago.Importe && interesesFiltered.length) {
      if (inputPago.CantPagos !== 1) {
        const interesSelected = interesesFiltered.find(
          (e) => e.Cantidad === CantPagos
        )?.Interes;
        if (interesSelected)
          setInputPago({
            ...inputPago,
            Interes: inputPago.Importe * (interesSelected / 100),
            ImpAbonado:
              inputPago.Importe + inputPago.Importe * (interesSelected / 100),
          });
      } else {
        setInputPago({
          ...inputPago,
          Interes: 0,
          ImpAbonado: inputPago.Importe,
        });
      }
    } else if (inputPago.Importe && !interesesFiltered.length) {
      setInputPago({ ...inputPago, ImpAbonado: inputPago.Importe });
    }
  };

  useEffect(() => {
    setSeniasFiltered(
      totalAbonado -
        (isNaN(parseInt(ImpoSenia))
          ? 0
          : parseInt(ImpoSenia) * parseInt(Interes)
          ? 0
          : Interes / 100 + parseInt(ImpoSenia)
          ? 0
          : parseInt(ImpoSenia))
    );
    setInputPago({
      ...inputPago,
      seniasFiltered:
        totalAbonado -
        (isNaN(parseInt(ImpoSenia)) ? 0 : parseInt(ImpoSenia) * Interes)
          ? 0
          : Interes / 100 + ImpoSenia
          ? 0
          : parseInt(ImpoSenia),
    });
  }, []);

  useEffect(() => {
    if (intereses) {
      setInteresesFiltered(
        intereses?.filter(
          (e) => e.MedioCobro === parseFloat(inputPago.FormaDePago)
        )
      );
    }
  }, [intereses, inputPago.FormaDePago]);

  useEffect(() => {
    if (
      seniaStatus &&
      typeof seniaStatus === "object" &&
      Object.keys(seniaStatus).includes("status") &&
      seniaStatus.status &&
      inEdit
    ) {
      setInEdit(false);
    }
  }, [seniaStatus]);

  useEffect(() => {
    if (
      inEdit &&
      formasPago &&
      formasPago.find((e) => e.Codigo === parseInt(inputPago.FormaDePago))
        ?.EsTarjeta === 1
    ) {
      setInputPago({
        ...inputPago,
        CantPagos: 0,
      });
    }
  }, [inEdit]);

  return (
    <tr className={styles.nuevoPagoTr}>
      <td style={{ width: "1rem" }}>
        <button
          className={styles.submitButton}
          disabled={isReadOnly}
          onClick={() => setInEdit(!inEdit)}
        >
          <BsIcons.BsPencilFill />
        </button>
      </td>
      <td>
        {inEdit ? (
          <input
            type="date"
            value={inputPago.Fecha}
            onChange={handlePago}
            name="Fecha"
          />
        ) : (
          FechaSenia?.slice(0, 10).split("-").reverse().join("/")
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            type="number"
            onBlur={onBlurImporte}
            value={inputPago.Importe}
            size={15}
            onChange={handlePago}
            name="Importe"
          />
        ) : Interes ? (
          ImpoSenia - Interes
        ) : (
          ImpoSenia
        )}
      </td>
      <td>
        {inEdit ? (
          <select
            name="FormaDePago"
            onBlur={onBlurFormaDePago}
            style={{ width: "7rem" }}
            value={inputPago.FormaDePago}
            onChange={handlePago}
            id=""
          >
            <option value="">---</option>
            {formasPago.length &&
              formasPago.map((e) => (
                <option value={e.Codigo}>{e.Nombre}</option>
              ))}
          </select>
        ) : (
          NomFormaPago
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            disabled
            type="number"
            value={inputPago.Interes}
            size={5}
            onChange={handlePago}
            name="Interes"
          />
        ) : (
          Interes
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            disabled
            type="number"
            value={inputPago.ImpAbonado}
            size={5}
            onChange={handlePago}
            name="ImpAbonado"
          />
        ) : (
          ImpoSenia
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            type="text"
            value={inputPago.NroRecibo}
            size={12}
            name="NroRecibo"
            onChange={handlePago}
          />
        ) : (
          NroRecibo
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            type="date"
            value={inputPago.FechaVto}
            name="FechaVto"
            onChange={handlePago}
          />
        ) : (
          FechaCheque?.slice(0, 10).split("-").reverse().join("/")
        )}
      </td>
      <td>
        {inEdit ? (
          <select
            name="Tarjeta"
            onChange={handlePago}
            value={inputPago.Tarjeta}
            id=""
          >
            <option value="">---</option>
            {tarjetas.length &&
              tarjetas.map((e) => (
                <option value={e.Codigo}>{e.Nombre}</option>
              ))}{" "}
          </select>
        ) : (
          Tarjeta && tarjetas?.find((e) => e.Codigo === Tarjeta)?.Nombre
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            type="text"
            value={inputPago.NroTarjeta}
            size={12}
            name="NroTarjeta"
            onChange={handlePago}
          />
        ) : (
          NroTarjeta
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            type="number"
            value={inputPago.NroCupon}
            size={5}
            onChange={handlePago}
            name="NroCupon"
          />
        ) : (
          Cupon
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            type="date"
            value={FechaCupon?.slice(0, 10)}
            onChange={handlePago}
            name="FechaCupon"
          />
        ) : (
          FechaCupon?.slice(0, 10).split("-").reverse().join("/")
        )}
      </td>
      <td>
        {inEdit ? (
          <input
            type="number"
            value={inputPago.Lote}
            size={5}
            onChange={handlePago}
            name="Lote"
          />
        ) : (
          Lote
        )}
      </td>
      <td>
        {inEdit &&
        formasPago.length &&
        formasPago.find((e) => e.Codigo === parseInt(inputPago.FormaDePago))
          ?.EsTarjeta === 1 ? (
          <select
            name="CantPagos"
            onChange={handlePago}
            onBlur={onBlurCantPagos}
            value={inputPago.CantPagos}
            id=""
          >
            <option value="">---</option>
            <option value={1}>1 pago sin interés</option>
            {interesesFiltered?.length &&
              interesesFiltered?.map((e) => (
                <option
                  value={e.Cantidad}
                >{`${e.Cantidad} pagos - ${e.Interes}% interés`}</option>
              ))}{" "}
          </select>
        ) : (
          CantPagos
        )}
      </td>
      <td>
        {inEdit ? (
          <button className={styles.submitButton} onClick={handleUpdate}>
            Guardar
          </button>
        ) : (
          <button className={styles.submitButton} disabled>
            Guardar
          </button>
        )}
      </td>
      <td>
        <button
          className={styles.submitButton}
          onClick={handleDelete}
          disabled={
            user?.roles.find(
              (e) => e.rl_codigo === "1" || e.rl_codigo === "1.2.2.3"
            )
              ? false
              : true
          }
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default FormaPagoItem;
