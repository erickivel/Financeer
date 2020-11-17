import styled from 'styled-components';

import { shade } from 'polished';

interface ButtonsMovementTypeProps {
  buttonSelected: string | undefined;
}

export const Container = styled.div`
  max-width: 1120px;
  width: 100%;

  margin: 0 auto;
  padding: 53px 0 0;

  display: flex;
  justify-content: space-between;

  @media (max-width: 1150px) {
    & {
      display: flex;
      flex-direction: column;

      align-items: center;
    }
  }
`;

export const InvestmentsInformations = styled.div`
  background: #f4ede8;
  padding: 12px 32px 58px 32px;
  border-radius: 15px;
  max-height: 696px;
  height: 100%;

  @media (max-width: 680px) {
    max-height: none;
  }
`;

export const CategoriesSection = styled.section`
  display: flex;
  justify-content: space-between;

  div {
    .categories-title {
      font-family: 'Poppins';
      font-weight: 600;
      font-size: 24px;
      color: #464141;
    }

    canvas {
      margin: 12px 30px 0 32px;
    }
  }

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CategoryItemContainer = styled.section`
  margin-top: 49px;

  > div + div {
    margin-top: 32px;
  }
`;

export const CategoryItem = styled.div`
  strong:first-child {
    font-size: 16px;
    font-weight: 500;
    color: #3a49d0;
  }

  section {
    margin-top: 4px;
    display: flex;

    div {
      display: flex;
      flex-direction: column;

      small {
        font-size: 12px;
        color: #636363;
      }

      strong {
        font-weight: 500;
        color: #464141;
      }
    }

    div + div {
      margin-left: 40px;
      align-items: flex-end;
    }
  }
`;

export const TotalContainer = styled.div`
  margin: 96px 32px 18px;
  padding-top: 72px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid #3f414b;

  h2 {
    max-width: 72px;
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 24px;
    color: #464141;
  }

  strong {
    font-size: 24px;
    font-weight: 500;
    color: #26a149;
  }
`;

export const RegisterSection = styled.section`
  background: #f4ede8;
  border-radius: 15px;
  padding: 32px;
  width: 384px;
  max-height: 696px;
  height: 100%;

  h2 {
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 24px;
    color: #464141;
  }

  form {
    display: flex;
    flex-direction: column;

    .movement-type {
      margin-top: 40px;

      strong {
        font-weight: 500;
        color: #464141;
      }
    }

    .react-select__value-container--is--selected {
      border-color: red;
    }

    div.react-select-container {
      .react-select__control {
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

    .movement_data {
      margin-top: 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 50px);
      grid-row-gap: 32px;
      grid-column-gap: 16px;
      grid-template-areas:
        'a a'
        'b c'
        'd e'
        'f f';

      .financial-institution {
        grid-area: a;
      }

      .product-name {
        grid-area: b;
      }

      .amount {
        grid-area: c;
      }

      .movement-value {
        grid-area: d;
      }

      .movement-date {
        grid-area: e;
      }

      .category {
        grid-area: f;
      }
    }

    button[type='submit'] {
      margin-top: 67px;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 45px;

      border: 0;
      border-radius: 7px;
      background-color: #26a149;

      font-family: 'Poppins';
      font-weight: 500;
      font-size: 18px;
      color: #f4ede8;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${shade(0.2, '#26a149')};
      }
    }
  }
`;

export const ButtonsMovementType = styled.div<ButtonsMovementTypeProps>`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  .application-button {
    background: ${props =>
      props.buttonSelected === 'application'
        ? 'rgba(18, 164, 84, 0.3)'
        : '#f4ede8'};
    border-radius: 7px;
    padding: 9px 30px;
    font-family: 'Poppins';
    font-size: 18px;
    font-weight: 500;
    color: #12a454;
    border: 1px solid #12a454;
    transition: background-color 0.2s;

    &:hover {
      background: rgba(18, 164, 84, 0.3);
    }
  }

  .redemption-button {
    background: ${props =>
      props.buttonSelected === 'redemption'
        ? 'rgba(232, 63, 91, 0.3)'
        : '#f4ede8'};
    border-radius: 7px;
    padding: 9px 38px;
    font-family: 'Poppins';
    font-size: 18px;
    font-weight: 500;
    color: #e83f5b;
    border: 1px solid #e83f5b;
    transition: background-color 0.2s;

    &:hover {
      background: rgba(232, 63, 91, 0.3);
    }
  }
`;
