import { useCallback, useState } from "react";

export default function useValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const validity = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((oldState) => {
      return { ...oldState, [name]: value };
    });

    setErrors((oldState) => {
      return { ...oldState, [name]: validationMessage };
    });

    setIsInputValid((oldState) => {
      return { ...oldState, [name]: validity };
    });

    setIsFormValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsFormValid(false);
  }

  const setDefaults = useCallback((name, value) => {
    setValues((oldState) => {
      return { ...oldState, [name]: value };
    });
  }, []);

  return {
    values,
    errors,
    isInputValid,
    isFormValid,
    handleChange,
    reset,
    setDefaults,
  };
}
