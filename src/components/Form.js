import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const OnBoardingForm = ({ errors, touched, values, status }) => {
  const [person, setPerson] = useState([]);
  console.log("testing touch", touched);
  useEffect(() => {
    if (status) {
      setPerson([...person, status]);
    }
  }, [status]);

  return (
    <div className="personal-form">
      <h1>Onboarding</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <Field
          type="text"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
        </label>

        {touched.tos && errors.tos && (<p className="error">{errors.tos}</p>)}

        <button type="submit">Submit!</button>

        {person.map(personal => (
        <ul key={personal.id}>
          <li>Name: {personal.name}</li>
          <li>Email: {personal.email}</li>
          <li>Password: {personal.password}</li>
        </ul>
      ))}
      </Form>

    </div>
  );
};

const personalInfo = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      tos: tos || false,
      password: password || "",
      name: name || "",
      email: email || "",
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("You need to provide your name"),
    email: Yup.string().required("You must provide an email"),
    password: Yup.string().required("Please enter a password"),
    tos: Yup.boolean().oneOf([true], "Must accept Terms of Service")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(OnBoardingForm);

export default personalInfo;
