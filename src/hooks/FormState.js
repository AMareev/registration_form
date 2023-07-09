import React, {useState} from 'react';

const initialState = {
    email: '',
    password: '',
    confirmPassword: ''
}


export const useFormStore = () => {
    const [formData, setFormData] = useState(initialState);

    return {
        // getState: () => formData,
        formData,
        updateState: (fieldName, value) => {
            setFormData({...formData, [fieldName]: value})
        }
    }

};

