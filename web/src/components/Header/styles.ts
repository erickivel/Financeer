import styled, { css } from 'styled-components';

interface ContainerProps {
  selected: string;
}

export const Container = styled.div<ContainerProps>`
  background: #26a149;
  width: 100%;

  header {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 10px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      flex-direction: row;
      align-items: center;

      a {
        text-decoration: none;
        color: #f4ede8;
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 18px;
        padding: 12px 0;
        margin: 0 12px;

        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        opacity: 0.8;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }

        &::before {
          content: '';
          border-bottom: 2px solid #f4ede8;
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 0;
          transition: 0.3s;
        }

        svg {
          margin-right: 4px;
        }
      }

      ${props => {
        return css`
          a.${props.selected} {
          opacity: 1;

          ::before {
            content: '';
            border-bottom: 2px solid #f4ede8;
            position: absolute;
            bottom: 2px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 100%;
          }
        `;
      }}
    }
  }
`;
