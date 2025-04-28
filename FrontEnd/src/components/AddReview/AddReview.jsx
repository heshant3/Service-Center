import React, { useState } from "react";
import styles from "./AddReview.module.css";

const AddReview = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // For hover effect

  const handleSubmit = () => {
    if (feedback.trim() && rating > 0) {
      onSubmit({ feedback, rating }); // Pass feedback and rating to the parent handler
      setFeedback("");
      setRating(0);
      onClose();
    } else {
      alert("Please provide valid feedback and rating.");
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={starValue}
          className={`${styles.star} ${
            starValue <= (hoverRating || rating) ? styles.filledStar : ""
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      );
    });
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
          <div className={styles.starsContainer}>{renderStars()}</div>
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
