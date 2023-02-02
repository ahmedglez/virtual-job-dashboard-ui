import axios from "axios";
import jwtDecode from "jwt-decode";

const jwtMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const token = localStorage.getItem("token");

    if (typeof action === "function") {
      return action(next, getState);
    }

    const { promise, types, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ ...rest, type: REQUEST });

    const request = promise(
      axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    request.then(
      (result) => next({ ...rest, result, type: SUCCESS }),
      (error) => next({ ...rest, error, type: FAILURE })
    );

    return request.then(
      (result) => result,
      (error) => {
        throw error;
      }
    );
  };

const refreshTokenMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (typeof action === "function") {
      return action(next, getState);
    }

    const { promise, types, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    const checkExpiration = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          // token has expired, request a new one
          const { data } = await axios.post("/refresh-token", { refreshToken });
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      } catch (error) {
        return next({ ...rest, error, type: FAILURE });
      }
    };

    next({ ...rest, type: REQUEST });

    checkExpiration().then(() => {
      const request = promise(
        axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      request.then(
        (result) => next({ ...rest, result, type: SUCCESS }),
        (error) => next({ ...rest, error, type: FAILURE })
      );

      return request.then(
        (result) => result,
        (error) => {
          throw error;
        }
      );
    });
  };

export { jwtMiddleware, refreshTokenMiddleware };
