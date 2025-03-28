import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignUpPage.module.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  text: yup.string().required("text is required"),
});

function CreateArticlePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim() && !tags.some((tag) => tag.name === input.trim())) {
      setTags([
        ...tags,
        { name: input.trim(), isEditing: false }, // Новый тег добавляется с флагом редактирования
      ]);
      setInput(""); // Очищаем поле ввода после добавления
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const updateTag = (index, newName) => {
    const newTags = [...tags];
    newTags[index].name = newName;
    setTags(newTags); // Сохраняем изменения в названии тега
  };

  const onSubmit = (data) => {
    const formData = { ...data, tags: tags.map((tag) => tag.name) };
    console.log("Form Data:", formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create new Article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label>Title</label>
          <input
            placeholder="title"
            className={`${styles.inputField} ${
              errors.title ? styles.inputError : ""
            }`}
            {...register("title")}
          />
          <p className={styles.errorText}>{errors.title?.message}</p>
        </div>

        <div className={styles.inputGroup}>
          <label>Short description</label>
          <input
            placeholder="description"
            className={`${styles.inputField} ${
              errors.description ? styles.inputError : ""
            }`}
            type="text"
            {...register("description")}
          />
          <p className={styles.errorText}>{errors.description?.message}</p>
        </div>

        <div className={styles.inputGroup}>
          <label>Text</label>
          <input
            placeholder="text"
            className={`${styles.inputField} ${
              errors.text ? styles.inputError : ""
            }`}
            type="text"
            {...register("text")}
          />
          <p className={styles.errorText}>{errors.text?.message}</p>
        </div>

        {/* Поле для тегов */}
        <div className={styles.inputGroup}>
          <label>Tags</label>
          <div className={styles.tagInputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите тег..."
              className={styles.inputField}
            />
            <button
              type="button"
              onClick={clearInput}
              className={styles.deleteButton}
            >
              Delete
            </button>
            <button type="button" onClick={addTag} className={styles.addButton}>
              Add
            </button>
          </div>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tagItem}>
                {/* Поле ввода для редактирования тега */}
                <input
                  type="text"
                  value={tag.name}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className={styles.inputField}
                />
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className={styles.button}>Send</button>
      </form>
    </div>
  );
}

export { CreateArticlePage };
