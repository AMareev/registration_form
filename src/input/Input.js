import React from 'react';
import styles from "./form-input.module.css";

const Input = (
    {
        label,
        name,
        type,
        value,
        isTouched,
        isValid,
        isMatches,
        errorMessage,
        errorConfirmMessage,
        validationFn,
        change
    }
) => {
    return (
        <div className={styles.inputContainerWrapper}>
            <div className={styles.inputContainer}>
                <label className={styles.label}>{label}</label>
                <div className={styles.wrapper}>
                    <input
                        className={styles.input}
                        type={type}
                        name={name}
                        value={value}
                        onChange={change}
                        onBlur={validationFn}
                    />
                </div>
            </div>
            {isTouched && !isValid && <ul className={styles.errors}>
                <li className={styles.error}>
                    {errorMessage}
                    {errorConfirmMessage}
                </li>
            </ul>}

            {isTouched && !isMatches && <ul className={styles.errors}>
                <li className={styles.error}>

                    {errorConfirmMessage}
                </li>
            </ul>}

        </div>
    );
};

export default Input;