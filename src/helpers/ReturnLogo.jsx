import React from "react";
import fiatLogo from '../images/fiat_logo.jpg'
import peugeotLogo from '../images/peugeot.jpg'
import VWLogo from '../images/volkswagen.png'
import cheryLogo from '../images/logo_chery.jpg'
import jeepLogo from '../images/logo_jeep.jpg'
import citroenLogo from '../images/logo_citroen.png'

export const ReturnLogo = ({empresa}) => {
    let logo;
    let cssClass;
    switch(empresa)
    {
        case "Car Group S.A.":
        case "Gestión Financiera S.A.":
        case "AutoNet S.A.":
        logo = fiatLogo;
        cssClass = "logoShort"
        break;
        case "Gestión Financiera Luxcar":
        logo = VWLogo;
        cssClass = "logo"
        break;
        case "Alizze S.A.":
        logo = peugeotLogo;
        cssClass = "logoShort"
        break;
        case "Autos del Plata S.A.":
        logo = cheryLogo;
        cssClass = "logo"
        break;
        case "Detroit S.A.":
        logo = jeepLogo;
        cssClass = "logoShort"
        break;
        case "Elysees S.A.":
        logo = citroenLogo;
        cssClass = "logo"
        break;
        }

        return (
            <img src={logo} className={cssClass} />
        )
}