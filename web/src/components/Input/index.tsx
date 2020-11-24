import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  label: string;
  scale: 'large' | 'small';
}

const Input: React.FC<InputProps> = ({ name, label, scale, type, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container scale={scale} className={name} type={type}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
