import React, { useState } from "react";
import styles from "./AddReview.module.css";

const AddReview = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (feedback.trim() && rating > 0) {
      onSubmit({ feedback, rating });
      setFeedback("");
      setRating(0);
      onClose();
    } else {
      alert("Please provide valid feedback and rating.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Add Review</h2>
        <div className={styles.formGroup}>
          <label>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            min="0"
            max="5"
            step="0.1"
            className={styles.input}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
