import React from "react";

const Input = (props) => {
  const { label, name, error, onChange, type } = props;
  return (
    <div className="form-group">
      <label style={{ color: "white" }}>{label}</label>
      <input
        name={name}
        className={error ? "form-control is-invalid" : "form-control"}
        onChange={onChange}
        type={type}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
