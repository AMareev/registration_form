import React, {useRef, useEffect} from 'react';
import {useFormStore} from '../hooks/FormState';
import {useValidation} from "../hooks/Validation";
import Input from "../input/Input";
import styles from "./form.module.css";


const Form = () => {
    const {formData, updateState} = useFormStore();
    const registrationButtonRef = useRef(null);

    const {
        valid,
        setTouched,
        validate,
        checkValidation
    }
        = useValidation(formData);
    const {email, password, confirmPassword} = formData;

    const change = ({target}) => {
         updateState(target.name, target.value)
        setTouched(target.name);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (checkValidation()) {
        }
        else console.error('Форма не валидна')
    }

    const blur = ({target}) => {
        setTouched(target.name);
        validate(target.name);
    }

    useEffect(() => {
      if (email.length && password.length && password === confirmPassword){
          registrationButtonRef.current.focus();
      }
    }, [formData])


    return (
        <form
            className={styles.form}
            onSubmit={onSubmit}
        >
            <Input
                label='email'
                type='text'
                key='email'
                name='email'
                value={email}
                isTouched={valid.email.touched}
                isValid={valid.email.isValid}
                errorMessage={valid.email.message}
                validationFn={blur}
                change={change}
            />

            <Input
                label='Пароль'
                type='password'
                // key='password'
                name='password'
                value={password}
                isTouched={valid.password.touched}
                isValid={valid.password.isValid}
                errorMessage={valid.password.message}
                validationFn={blur}
                change={change}
            />

            <Input
                label='Подтверждение пароля'
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                isTouched={valid.confirmPassword.touched}
                isValid={valid.confirmPassword.isValid}
                isMatches={valid.confirmPassword.isMatches}
                errorMessage={valid.confirmPassword.message}
                errorConfirmMessage={valid.confirmPassword.messageNotMatches}
                validationFn={blur}
                change={change}
            />
            <button
                disabled={!checkValidation()}
                className={styles.formButton}
                ref={registrationButtonRef}
                type="submit"
            >Зарегистрироваться
            </button>
        </form>
    );
};

export default Form;