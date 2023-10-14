import { useState } from "react";
import * as yup from "yup";

let schema = yup.object().shape({
  name: yup
    .string()
    .required("ismini göremedim")
    .min(3, "En az 3 karakter giriniz"),
  email: yup
    .string()
    .email("Eposta adresinde bir hata olabilir mi?")
    .required("Email zorunlu")
    .notOneOf(["waffle@syrup.com"], "Bu email adresi kullanılıyor"),
  pass: yup
    .string()
    .required("Şifre zorunlu")
    .min(6, "Şifreniz en az 6 karakter olmalı")
    .matches(/[^0-9]/, "Şifre sadece sayı olamaz harf falan ekle"),
  terms: yup.boolean().oneOf([true], "Kullanım koşullarını kabul etmelisiniz"),
});

const Form = (props) => {
  const initialForm = {
    name: "",
    email: "",
    pass: "",
    terms: false,
  };

  const [formData, setFormData] = useState(initialForm);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const kontrolFonksiyonuAlanlar = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        const newErrorState = {
          ...formErrors,
          [name]: "",
        };
        setFormErrors(newErrorState);
      })
      .catch(function (err) {
        err.errors;
        console.log("error", err.name, err.errors[0]);
        const newErrorState = {
          ...formErrors,
          [name]: err.errors[0],
        };
        setFormErrors(newErrorState);
      });
  };

  const kontrolFonksiyonuButunForm = (formVerileri) => {
    // check validity
    schema.isValid(formVerileri).then(function (valid) {
      console.log(valid, "valid");
      if (valid === true) {
        console.log(
          "Axios ile sunucuya gönderilebilir buton aktif edilebilir."
        );
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    });
  };

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    let newValue = type === "checkbox" ? checked : value;
    const newState = {
      ...formData,
      [name]: newValue,
    };

    setFormData(newState);
    kontrolFonksiyonuButunForm(newState);
    kontrolFonksiyonuAlanlar(name, newValue);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitted", event);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">İsim:</label>
        <input
          value={formData.name}
          onChange={changeHandler}
          type="text"
          name="name"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          value={formData.email}
          onChange={changeHandler}
          type="text"
          name="email"
        />
      </div>
      <div>
        <label htmlFor="pass">Şifre:</label>
        <input
          value={formData.pass}
          onChange={changeHandler}
          type="text"
          name="pass"
        />
      </div>
      <div>
        <label htmlFor="terms">Koşullar:</label>
        <input
          value={formData.pass}
          onChange={changeHandler}
          type="checkbox"
          name="terms"
        />
      </div>
      <button disabled={isDisabled} type="submit">
        Gönder
      </button>
    </form>
  );
};

export default Form;
