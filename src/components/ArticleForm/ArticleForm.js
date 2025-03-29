import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../../pages/SignUpPage.module.scss";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .test(
      "no-whitespace",
      "Title cannot be empty or only spaces",
      (value) => value.trim().length > 0
    ),
  description: yup
    .string()
    .required("Description is required")
    .test(
      "no-whitespace",
      "Description cannot be empty or only spaces",
      (value) => value.trim().length > 0
    ),
  text: yup
    .string()
    .required("Text is required")
    .test(
      "no-whitespace",
      "Text cannot be empty or only spaces",
      (value) => value.trim().length > 0
    ),
});

const ArticleForm = ({ existingArticle = {}, existingTags = [], onSubmit }) => {
  const { title, description, body } = existingArticle;
  console.log("existingArticle in Article form", existingArticle);
  console.log("existingTags in Article form", existingTags);

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
      text: body || "",
    },
  });

  const [tags, setTags] = useState(existingTags);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (existingTags.length > 0) {
      setTags(existingTags);
    }
  }, [existingTags]);

  useEffect(() => {
    if (existingArticle.title) {
      setValue("title", existingArticle.title);
    }
    if (existingArticle.description) {
      setValue("description", existingArticle.description);
    }
    if (existingArticle.body) {
      setValue("text", existingArticle.body);
    }
  }, [existingArticle, setValue]);

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, tags });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input type="hidden" value={existingArticle.slug} {...register("slug")} />
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
        <textarea
          placeholder="Enter article text"
          className={`${styles.inputField} ${
            errors.text ? styles.inputError : ""
          }`}
          {...register("text")}
          rows="9"
          style={{ resize: "none" }}
        />
        <p className={styles.errorText}>{errors.text?.message}</p>
      </div>

      <div className={styles.inputGroup}>
        <label>Tags</label>
        <div className={styles.tagInputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите тег..."
            className={styles.tagInputField}
          />
          <button
            type="button"
            onClick={clearInput}
            className={`${styles.deleteButton} ${styles.little_button}`}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={addTag}
            className={`${styles.addButton} ${styles.little_button}`}
          >
            Add Tag
          </button>
        </div>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <div key={index} className={styles.tagInputContainer}>
              <input
                type="text"
                value={tag}
                onChange={(e) => {
                  const updatedTags = [...tags];
                  updatedTags[index] = e.target.value;
                  setTags(updatedTags);
                }}
                className={styles.tagInputField}
              />
              <button
                type="button"
                onClick={() => removeTag(index)}
                className={`${styles.deleteButton} ${styles.little_button}`}
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
