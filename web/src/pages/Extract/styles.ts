import styled from 'styled-components';

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
`;

export const TableContainer = styled.div`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #636363;
      font-weight: normal;
      font-family: 'Poppins';
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #f4ede8;
      font-family: 'Poppins';
      font-size: 16px;
      font-weight: normal;
      color: #464141;
    }

    td.application {
      color: #12a454;
    }

    td.redemption {
      color: #e83f5b;
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
