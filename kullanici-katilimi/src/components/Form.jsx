import { useState } from "react";

const Form = (props) => {
  const initialForm = {
    name: "",
    email: "",
    pass: "",
    terms: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    let newValue = type === "checkbox" ? checked : value;
    const newState = {
      ...formData,
      [name]: newValue,
    };

    setFormData(newState);
  };

  const submitHandler = (event) => {
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
        <label htmlFor="terms">Şifre:</label>
        <input
          value={formData.pass}
          onChange={changeHandler}
          type="checkbox"
          name="terms"
        />
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
};

export default Form;
