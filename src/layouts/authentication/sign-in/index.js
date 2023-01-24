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
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("ahmediglez@gmail.com");
  const [password, setPassword] = useState("admin1234");

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await signIn(email, password);
      console.log(response);
      history.push("/admin/dashboard");
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoverLayout
      title="Bienvenido de nuevo!"
      color="white"
      description="Inicia sesión para continuar"
      image={bgSignIn}
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
              Error al iniciar sesión
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
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            No tienes cuenta?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
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
