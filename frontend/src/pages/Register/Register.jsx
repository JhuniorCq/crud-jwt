import { useId } from "react";
import { InputForm } from "../../components/InputForm/InputForm";
import "./Register.css";
import { useForm } from "react-hook-form";

export const Register = () => {
  const id = useId();
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data) => {};

  return (
    <section className="register">
      <h1 className="register__title">REGÍSTRATE</h1>

      <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          label="Nombre de usuario"
          type="text"
          placeholder="Nombre de usuario"
          id={`${id}-username`}
          name="registerUsername"
          // onChange={}
        />

        <InputForm
          label="Correo Electrónico"
          type="email"
          placeholder="Correo electrónico"
          id={`${id}-email`}
          name="registerEmail"
          // oncChange={}
        />

        <InputForm
          label="Contraseña"
          type="password"
          placeholder="Contraseña"
          id={`${id}-password`}
          name="registerPassword"
          // onChange={}
        />

        <button className="register__button">Registrar</button>
      </form>
    </section>
  );
};
