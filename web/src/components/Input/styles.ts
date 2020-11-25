import styled, { css } from 'styled-components';

interface ContainerProps {
  scale: 'small' | 'large';
  type: string;
}

export const Container = styled.div<ContainerProps>`
  height: 50px;

  ${props =>
    props.scale === 'small' &&
    css`
      display: flex;
      flex-direction: column;
    `}

  label {
    font-size: 18px;
    color: #464141;
  }

  input {
    width: ${props => (props.scale === 'small' ? css`152px` : css`320px`)};

    margin-top: 8px;
    padding: ${props => (props.type === 'date' ? '22px 8px' : '12px 8px')};
    background: #dad5d5;
    border: 1px solid transparent;
    border-radius: 7px;

    color: #464141;
    transition: border-color 0.2s;

    &::placeholder {
      font-size: 14px;
      color: #8c8986;
    }

    &:focus {
      border-color: #636363;
    }
  }
`;
