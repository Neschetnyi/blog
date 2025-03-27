import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignUpPage.module.scss";
import { loginUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(40, "Must be at most 40 characters")
    .required("Password is required"),
});

function SignInPage() {
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

    dispatch(loginUser(data))
      .then((response) => {
        if (response.error) {
          if (response.error) {
            setError("password", {
              type: "manual",
              message: "no such password or email",
            });
          }
          if (response.error) {
            setError("email", {
              type: "manual",
              message: "no such email or password.",
            });
          }
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label>User email</label>
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

        <button className={styles.button}>Login</button>
      </form>
      <p className={styles.signInText}>
        Don't have an account?{" "}
        <Link to="/signUp" className={styles.link}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export { SignInPage };
