import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  scale: 'large' | 'small';
}

const Input: React.FC<InputProps> = ({ name, label, scale, ...rest }) => {
  return (
    <Container scale={scale} className={name}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </Container>
  );
};

export default Input;
