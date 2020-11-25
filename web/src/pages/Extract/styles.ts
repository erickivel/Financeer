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
  overflow-y: scroll;
  max-height: 588px;
  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(140, 137, 134, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  table {
    border-spacing: 0 8px;
    width: 100%;
    position: relative;

    th {
      background-color: #dedcdc;
      position: sticky;
      top: 0;

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
