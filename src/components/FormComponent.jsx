import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/reducers/contactReducer";
import style from "./styles/Form.module.css";

// Generate a profile image URL based on a seed
const generateProfileImageUrl = (seed) => {
  return `https://robohash.org/${seed}.png`;
};

// Generate a unique ID for a new contact
const generateId = () => {
  return Date.now().toString(35) + Math.random().toString(36).slice(2);
};

const FormComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    favorite: false,
  });
  const [error, setError] = useState(null); // State for error handling

  // Handle input changes for the form
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value, // Handle checkbox separately
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContact = {
        ...formData,
        id: generateId(),
        avatar: generateProfileImageUrl(formData.first_name + formData.last_name),
      };
      await dispatch(addContact(newContact)); // Dispatch action to add contact
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        favorite: false,
      });
      setError(null); // Clear error on successful submission
    } catch (error) {
      setError("Failed to add contact. Please try again."); // Set error message on failure
    }
  };

  return (
    <section className={style.form}>
      {error && <div className={style.error}>{error}</div>} {/* Display error if present */}

      <article className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <section className={style.section}>
            <input
              type="text"
              id="first_name"
              className={style.input}
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </section>

          <section className={style.section}>
            <input
              type="text"
              id="last_name"
              className={style.input}
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </section>

          <section className={style.section}>
            <input
              type="text"
              id="email"
              className={style.input}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </section>

          <div className={style.checkboxContainer}>
            <label htmlFor="favorite" className={style.checkboxLabel}>
              Enable like favorite
            </label>
            <input
              type="checkbox"
              id="favorite"
              className={style.checkbox}
              checked={formData.favorite}
              onChange={handleChange}
            />
          </div>
          <div className={style.buttonContainer}>
            <button type="submit" className={style.button}>
              Save
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default FormComponent;
