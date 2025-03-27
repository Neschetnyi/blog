import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignUpPage.module.scss";
import { createUser, getUser, loginUser, updateUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup
    .string()
    .notRequired()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be at most 20 characters"),
  email: yup.string().notRequired().email("Invalid email address"),
  password: yup
    .string()
    .notRequired()
    .test(
      "password-length",
      "Must be at least 6 characters and at most 40 characters",
      (value) => !value || (value.length >= 6 && value.length <= 40)
    ),
  avatar: yup.string().notRequired().url("Invalid URL format"),
  agree: yup.bool(),
});

function EditUserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((store) => store.user.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    data.token = token;
    dispatch(updateUser(data))
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .then((response) => {
        dispatch(getUser(data));
        navigate("/");
        return response;
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Profile</h2>
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
          <label>New Password</label>
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
          <label>Avatar URL</label>
          <input
            placeholder="Avatar URL"
            className={`${styles.inputField} ${
              errors.avatar ? styles.inputError : ""
            }`}
            type="text"
            {...register("avatar")}
          />
          <p className={styles.errorText}>{errors.avatar?.message}</p>
        </div>

        <button className={styles.button}>Save</button>
      </form>
    </div>
  );
}

export { EditUserPage };
