import React from 'react';

import Header from '../../components/Header';

import { Container, TableContainer } from './styles';

const Extract: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <h1>Extrato</h1>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Instituição Financeira</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>ITSA4</td>
                <td>12432</td>
                <td className="application">R$ 12423,12</td>
                <td>Ações</td>
                <td className="application">Aplicação</td>
                <td>Rico</td>
                <td>14/11/2020</td>
              </tr>
              <tr>
                <td>ITSA4</td>
                <td>12432</td>
                <td className="redemption">R$ 1241,12</td>
                <td>Ações</td>
                <td className="redemption">Resgate</td>
                <td>Rico</td>
                <td>14/11/2020</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Extract;
