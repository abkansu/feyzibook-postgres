import React from "react";

const ButtonPrimary = (props) => {
  const { onClick, disabled, text } = props;
  return (
    <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default ButtonPrimary;
