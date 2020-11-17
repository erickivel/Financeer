import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  label: string;
  scale: 'large' | 'small';
}

const Input: React.FC<InputProps> = ({ name, label, scale, type, ...rest }) => {
  return (
    <Container scale={scale} className={name} type={type}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} {...rest} list="fundosss" />
    </Container>
  );
};

export default Input;
