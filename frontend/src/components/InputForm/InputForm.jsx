import "./InputForm.css";

export const InputForm = ({
  label,
  type,
  placeholder,
  id,
  name,
  register,
  errors = {},
}) => {
  return (
    <div className="input-form">
      <label htmlFor={id} className="input-form__label">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        className="input-form__input"
        {...register(name)}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};
