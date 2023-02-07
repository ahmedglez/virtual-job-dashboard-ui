import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

// Services
import { signIn } from "services/auth.services";

// React
import { useDispatch, connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthenticationServices from "services/auth.services";
import LocalStorageUtils from "utils/localStorageUtils";

//Redux Actions
import {
  registrerSuccess,
  registrerFail,
  userLoaded,
  authError,
  setToken,
} from "../../../actions/auth.actions";

function SignIn() {
  const authenticationServices = AuthenticationServices();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleValidation = () => {
    if (email === "") {
      setError(true);
      setMessage("El campo email es requerido");
      return false;
    }
    if (password === "") {
      setError(true);
      setMessage("El campo contraseña es requerido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    const isvalid = handleValidation();
    if (isvalid) {
      setLoading(true);
      try {
        const response = await authenticationServices.signIn(email, password);
        if (response.token && response.refreshToken) {
          const payload = {
            token: response.token,
            refreshToken: response.refreshToken,
            logoutAt: new Date(new Date().getTime() + 15 * 60 * 1000),
            username: email,
            password: password,
          };
          dispatch(registrerSuccess(payload));
          history.push("/admin/dashboard");
        } else {
          dispatch(registrerFail());
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
      setMessage("Complete los campos requeridos");
    }
  };

  return (
    <CoverLayout
      title="Bienvenido de nuevo!"
      color="white"
      description="Inicia sesión para continuar"
      image={bgSignIn}
      children={null}
    >
      <VuiBox component="form" role="form">
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="email"
              placeholder="Escribe tu correo aquí..."
              fontWeight="500"
              onChange={handleChangeEmail}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Contraseña
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Escibe tu contraseña aquí..."
              onChange={handleChangePassword}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          {error && (
            <VuiTypography variant="button" color="error" fontWeight="medium">
              Error al iniciar sesión. {" "} 
              Por favor, intente nuevamente.
            </VuiTypography>
          )}
          {loading === true ? (
            <VuiButton variant="contained" color="primary" size="large" fullWidth disabled>
              Iniciando sesión...
            </VuiButton>
          ) : (
            <VuiButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => handleSubmit()}
            >
              Iniciar sesión
            </VuiButton>
          )}
        </VuiBox>
        <VuiBox textAlign="center">
          <VuiTypography
            variant="button"
            component={Link}
            to="/authentication/forgot-password"
            color="white"
            fontWeight="medium"
          >
            Olvidaste tu contraseña?
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            No tienes cuenta?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              fontWeight="medium"
              color="primary"
            >
              Regístrate
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
