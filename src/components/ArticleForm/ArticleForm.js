import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../../pages/SignUpPage.module.scss";

const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  text: yup.string().required("text is required"),
});

const ArticleForm = ({ existingArticle = {}, existingTags = [], onSubmit }) => {
  const { title, description, text } = existingArticle;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: title || "",
      description: description || "",
      text: text || "",
    },
  });

  const [tags, setTags] = useState(existingTags);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (existingTags.length > 0) {
      setTags(existingTags);
    }
  }, [existingTags]);

  const addTag = () => {
    if (input.trim() && !tags.some((tag) => tag.name === input.trim())) {
      setTags([...tags, { name: input.trim(), isEditing: false }]);
      setInput("");
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
    setTags(newTags);
  };

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, tags: tags.map((tag) => tag.name) });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
  );
};

export { ArticleForm };
