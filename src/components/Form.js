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
}
  
