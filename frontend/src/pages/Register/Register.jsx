import { useId } from "react";
import { InputForm } from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/userSchema";
import { usePost } from "../../hooks/usePost";
import { URL_SERVER } from "../../utils/constants";
import "./Register.css";

export const Register = () => {
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { responsePost, loadingPost, errorPost, postData } = usePost();

  const onSubmit = (data) => {
    console.log("Enviando datos ...: ", data);

    console.log("Body: ", data);

    postData(`${URL_SERVER}/auth/register`, data);

    reset();
  };

  const onError = (errors) => {
    alert("Por favor, complete correctamente los campos");
  };

  return (
    <section className="register">
      <h1 className="register__title">REGÍSTRATE</h1>

      <form
        className="register__form"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <InputForm
          label="Nombre de usuario"
          type="text"
          placeholder="Nombre de usuario"
          id={`${id}-username`}
          name="username"
          register={register}
          errors={errors}
        />

        <InputForm
          label="Correo Electrónico"
          type="email"
          placeholder="Correo electrónico"
          id={`${id}-email`}
          name="email"
          register={register}
          errors={errors}
        />

        <InputForm
          label="Contraseña"
          type="password"
          placeholder="Contraseña"
          id={`${id}-password`}
          name="password"
          register={register}
          errors={errors}
        />

        <button className="register__button">Registrar</button>

        {loadingPost ? (
          <p>Cargando ...</p>
        ) : errorPost ? (
          <p>{errorPost}</p>
        ) : (
          responsePost && <p>Usuario creado con éxito !!!</p>
        )}
      </form>
    </section>
  );
};
