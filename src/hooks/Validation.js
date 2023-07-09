import React, {useState} from 'react';


export const useValidation = (formData) => {
    const {email, password, confirmPassword} = formData;

    const initialValid = {
        email: {
            isValid: true,
            touched: false,
            condition: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            message: 'Некорректный email',
        },
        password: {
            isValid: true,
            touched: false,
            condition: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message: 'Пароль должен содержать минимум 8 символов, не менее одной буквы, одной цифы и одного спец.символа',
        },
        confirmPassword: {
            isValid: true,
            isMatches: true,
            touched: false,
            condition: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message: 'Пароль должен содержать минимум 8 символов, не менее одной буквы, одной цифы и одного спец.символа',
            messageNotMatches: 'Пароли должны совпадать',

        }
    }
    const [valid, setValid] = useState(initialValid);


    const setValidState = (key, value) => {
        setValid((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                isValid: value
            }
        }))
    }

    const setTouched = (key) => {
        setValid((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                touched: true
            }
        }))
    }
    const validateConfirmPassword = (key) => {
        setValid((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                isMatches: password === confirmPassword
            }
        }))
    }

    const validate = (name) => {

        let checkTarget = '';

        switch (name) {
            case 'email':
                checkTarget = email;
                break;
            case 'password':
                checkTarget = password;
                break;
            case 'confirmPassword':
                checkTarget = confirmPassword;
                validateConfirmPassword('confirmPassword');
                break;
        }
        setValidState(name, valid[name].condition.test(checkTarget))
    }



    const checkValidation = () => {

        return Object.keys(valid).every((key) =>  valid[key].touched && valid[key].isValid && password === confirmPassword)
    }

    return {
        valid,
        setTouched,
        validate,
        checkValidation
    }

};

