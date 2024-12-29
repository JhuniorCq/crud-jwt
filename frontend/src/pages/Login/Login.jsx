import { InputForm } from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import { useEffect, useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/userSchema";
import "./Login.css";
import { usePost } from "../../hooks/usePost";
import { URL_SERVER } from "../../utils/constants";
import { useManualGet } from "../../hooks/useManualGet";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const id = useId();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { responsePost, loadingPost, errorPost, postData } = usePost();
  const { responseGet, loadingGet, errorGet, getData } = useManualGet();

  const onSubmit = (data) => {
    console.log("Enviando datos... :", data);

    const body = {
      email: data.loginEmail,
      password: data.loginPassword,
    };

    postData(`${URL_SERVER}/auth/login`, body, { withCredentials: true });
  };

  const onError = (errors) => {
    console.log(errors);
    alert("Por favor, complete correctamente los campos.");
  };

  useEffect(() => {
    if (responsePost?.success) {
      // Hacemos un GET
      getData(`${URL_SERVER}/auth/verify`, { withCredentials: true });
    }
  }, [responsePost]);

  useEffect(() => {
    if (responseGet?.success) {
      // TODO: Hacer el componente para profile y el botón de Cerrar Sesión
      navigate("/profile", { state: { user: responseGet.data } });
    }
  }, [responseGet]);

  return (
    <section className="login">
      <h1 className="login__title">INICIAR SESIÓN</h1>

      <form className="login__form" onSubmit={handleSubmit(onSubmit, onError)}>
        <InputForm
          label="Correo Electrónico"
          id={`${id}-email`}
          name="loginEmail"
          type="email"
          placeholder="Correo electrónico"
          register={register}
          errors={errors}
        />

        <InputForm
          label="Contraseña"
          id={`${id}-password`}
          name="loginPassword"
          type="password"
          placeholder="Contraseña"
          register={register}
          errors={errors}
        />

        <button className="login__button">Iniciar Sesión</button>

        {loadingPost ? (
          <p>Cargando ...</p>
        ) : errorPost ? (
          <p>{errorPost}</p>
        ) : (
          responsePost && (
            <p>Usuario logueado con éxito. En unos instantes serán llevados</p>
          )
        )}
      </form>
    </section>
  );
};
