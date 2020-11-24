import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  div.react-select-container {
    margin-top: 8px;

    .react-select__control {
      height: 43px;
      background: #dad5d5;
      font-size: 14px;
      color: #8c8986;
      border-radius: 7px;
      border: 0;

      &:hover {
        border-color: #636363;
      }
    }

    .react-select__menu {
      background: #dad5d5;
      color: #464141;

      .react-select__option--is-selected {
        background: ${shade(0.2, '#dad5d5')};
        color: #f4ede8;
      }

      .react-select__option--is-focused {
        background: ${shade(1.3, '#dad5d5')};
      }
    }
  }
`;
