import { InputForm } from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/userSchema";
import "./Login.css";
import { useAuth } from "../../context/AuthContext/useAuth";

export const Login = () => {
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { login, responseLogin, loadingLogin, errorLogin } = useAuth();

  const onSubmit = (data) => {
    console.log("Enviando datos... :", data);

    login({ credentials: data });

    reset();
  };

  const onError = (errors) => {
    console.log(errors);
    alert("Por favor, complete correctamente los campos.");
  };

  return (
    <section className="login">
      <h1 className="login__title">INICIAR SESIÓN</h1>

      <form className="login__form" onSubmit={handleSubmit(onSubmit, onError)}>
        <InputForm
          label="Correo Electrónico"
          id={`${id}-email`}
          name="email"
          type="email"
          placeholder="Correo electrónico"
          register={register}
          errors={errors}
        />

        <InputForm
          label="Contraseña"
          id={`${id}-password`}
          name="password"
          type="password"
          placeholder="Contraseña"
          register={register}
          errors={errors}
        />

        <button className="login__button">Iniciar Sesión</button>

        {loadingLogin ? (
          <p>Cargando ...</p>
        ) : errorLogin ? (
          <p>{errorLogin}</p>
        ) : (
          responseLogin && <p>Usuario logueado con éxito.</p>
        )}
      </form>
    </section>
  );
};
