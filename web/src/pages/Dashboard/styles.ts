import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  height: 65vh;
  width: 100%;
  margin: 0 auto;
  padding: 53px 0 0;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 96px;
`;

export const InvestmentsInformations = styled.div`
  background: #f4ede8;
  padding: 12px 32px 58px 32px;
  border-radius: 15px;
`;

export const CategoriesSection = styled.section`
  display: flex;

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
  margin: 80px 32px;
  padding: 56px 0 -100px 0;
  border-top: 1px solid #3f414b;

  display: flex;
  align-items: center;
  justify-content: space-between;

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
`;
