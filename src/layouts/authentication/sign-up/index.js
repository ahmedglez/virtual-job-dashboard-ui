/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signUpImage.png";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Bienvenido!"
      color="white"
      description="Actualmente no es posible registrar nuevos usuarios a través de esta vía.
      "
      image={bgSignIn}
      cardContent
    >
      <VuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
        mb={1}
      >
        <VuiTypography variant="h6" fontWeight="400" color="text" mb={1}>
          ¡Estamos trabajando en ello!
        </VuiTypography>
        <VuiTypography variant="body2" fontWeight="400" color="text" mb={1}>
          En breve podrás registrarte en nuestra plataforma. Estamos trabajando en convertir nuestra
          aplicación en un software como servicio (SaaS) para llegar a más personas. Muchas gracias
          por tu paciencia.
        </VuiTypography>

        <VuiTypography variant="body2" fontWeight="400" color="text" mb={1}>
          En caso de querer crear una cuenta nueva, puedes contactarnos a través de nuestro correo
          electrónico.
          <VuiTypography variant="body2" fontWeight="400" color="text" mb={1}>
            <a href="mailto:soporte@stixcp.com">soporte@stixcp.com</a>
          </VuiTypography>
        </VuiTypography>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
