import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import styles from "./Estructura.module.css";

const EstructuraItem = ({ Nombre, Childrens, Title, Activo }) => {
  const [activo, setActivo] = useState(true);

  return (
    <div className={Title === "Gerente" ? styles.item : styles.subItem}>
      {Title !== "Vendedor" ? (
        activo ? (
          <MdIcons.MdOutlineKeyboardArrowDown
            className={styles.arrow}
            onClick={() => setActivo(!activo)}
          />
        ) : (
          <MdIcons.MdOutlineKeyboardArrowDown
            className={styles.arrowDown}
            onClick={() => setActivo(!activo)}
          />
        )
      ) : null}
      <span
        className={styles.text}
        style={{
          color:
            Title === "Gerente"
              ? "cornflowerblue"
              : Title === "Supervisor"
              ? "#ed6464"
              : Title === "Team Leader"
              ? "#ed9064"
              : "black",
        }}
        onClick={() => setActivo(!activo)}
      >
        {Title}:
      </span>
      <span> {Nombre}</span>
      {(Title === "Gerente" && Activo === 0) ||
      (Title === "Supervisor" && Activo === 1) ||
      (Title === "Team Leader" && Activo === 1) ||
      (Title === "Vendedor" && Activo === 1) ? (
        <span> ** INACTIVO **</span>
      ) : null}
      {activo && Childrens
        ? Childrens.map((e) => {
            return (
              <EstructuraItem
                key={e.Nombre}
                Nombre={e.Nombre}
                Childrens={e.Childrens}
                Title={e.Title}
                Activo={e.Activo}
              />
            );
          })
        : null}
    </div>
  );
};

export default EstructuraItem;
