import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface CategoryItemContainerProps {
  categoryFiltered: string | null;
}

export const Container = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;

  h1 {
    margin-top: 76px;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 36px;
    text-align: center;
    color: #464141;
  }

  div.content {
    display: flex;
    justify-content: center;
  }
`;

export const TableContainer = styled.div`
  margin-top: 48px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #636363;
      font-weight: normal;
      font-family: 'Poppins';
      padding: 20px 12px 16px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 12px 16px 32px;
      border: 0;
      background: #f4ede8;
      font-family: 'Poppins';
      font-size: 16px;
      font-weight: normal;
      color: #464141;
    }

    td.value-applied {
      color: #12a454;
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

export const CategoriesSection = styled.section`
  display: flex;
  justify-content: space-between;
  min-height: 344px;

  background: #f4ede8;
  border-radius: 15px;
  padding: 16px;
  margin-top: 80px;
  margin-left: 30px;

  div {
    .categories-title {
      font-family: 'Poppins';
      font-weight: 600;
      font-size: 24px;
      color: #464141;
    }

    canvas {
      margin: 39px 9px 0 8px;
    }
  }

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CategoryItemContainer = styled.section<CategoryItemContainerProps>`
  margin: 11px;

  > div + div {
    margin-top: 32px;
  }

  ${props =>
    props.categoryFiltered !== null &&
    css`
      .${props.categoryFiltered} {
        background: ${shade(0.1, '#dedcdc')};
      }
    `}
`;

export const CategoryItem = styled.div`
  border-radius: 7px;
  padding: 4px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background: ${shade(0.1, '#dedcdc')};
  }

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
      margin-left: 32px;
      align-items: flex-end;
    }
  }
`;
