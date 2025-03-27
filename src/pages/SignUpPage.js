import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignUpPage.module.scss";
import { createUser, loginUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be at most 20 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(40, "Must be at most 40 characters")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
  agree: yup
    .bool()
    .oneOf([true], "You must agree to the processing of personal information"),
});

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    dispatch(createUser(data))
      .then((response) => {
        console.log("response in SignUpPage", response);
        if (response.error) {
          const { email, username } = response.payload.errors;

          if (email) {
            setError("email", {
              type: "manual",
              message: "Email is already taken.",
            });
          }
          if (username) {
            setError("username", {
              type: "manual",
              message: "Username is already taken.",
            });
          }
        } else {
          return response;
        }
      })
      .then((response) => {
        console.log(
          "response after creatingUser before redirecting with login",
          response
        );
        const data = {
          email: response.meta.arg.email,
          password: response.meta.arg.password,
        };
        dispatch(loginUser(data));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label>User Name</label>
          <input
            placeholder="User Name"
            className={`${styles.inputField} ${
              errors.username ? styles.inputError : ""
            }`}
            {...register("username")}
          />
          <p className={styles.errorText}>{errors.username?.message}</p>
        </div>

        <div className={styles.inputGroup}>
          <label>Email Address</label>
          <input
            placeholder="Email Address"
            className={`${styles.inputField} ${
              errors.email ? styles.inputError : ""
            }`}
            type="email"
            {...register("email")}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            placeholder="Password"
            className={`${styles.inputField} ${
              errors.password ? styles.inputError : ""
            }`}
            type="password"
            {...register("password")}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </div>

        <div className={styles.inputGroup}>
          <label>Repeat Password</label>
          <input
            placeholder="Repeat Password"
            className={`${styles.inputField} ${
              errors.repeatPassword ? styles.inputError : ""
            }`}
            type="password"
            {...register("repeatPassword")}
          />
          <p className={styles.errorText}>{errors.repeatPassword?.message}</p>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register("agree")}
          />
          <label>I agree to the processing of my personal information</label>
        </div>
        <p className={styles.errorText}>{errors.agree?.message}</p>

        <button className={styles.button}>Create</button>
      </form>
      <p className={styles.signInText}>
        Already have an account?{" "}
        <Link to="/signIn" className={styles.link}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export { SignUpPage };
