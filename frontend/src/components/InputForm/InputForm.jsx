import "./InputForm.css";

export const InputForm = ({ label, type, placeholder, id, name, onChange }) => {
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
        onChange={onChange}
        className="input-form__input"
      />
    </div>
  );
};
