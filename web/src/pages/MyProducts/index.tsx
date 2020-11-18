import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

import { useExtract } from '../../hooks/extract';
import formatValue from '../../utils/formatValue';

import Header from '../../components/Header';

import {
  Container,
  TableContainer,
  CategoriesSection,
  CategoryItemContainer,
  CategoryItem,
} from './styles';

const MyProducts: React.FC = () => {
  const { categoriesBalance, balancesByName } = useExtract();

  const chartData: ChartData = {
    labels: categoriesBalance.categoriesBalances.map(
      balance => balance.category_name,
    ),
    datasets: [
      {
        label: 'categorias',
        data: categoriesBalance.categoriesBalances.map(
          balance => balance.total_value_invested,
        ),
        backgroundColor: ['#3A49D0', '#3396CE', '#793BC9', '#2CA487'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Meus Produtos</h1>
        <div className="content">
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Ativo</th>
                  <th>Quantidade</th>
                  <th>Valor total aplicado</th>
                  <th>Categoria</th>
                </tr>
              </thead>

              <tbody>
                {balancesByName.map(balance => (
                  <tr>
                    <td>{balance.product_name}</td>
                    <td>{balance.total_amount}</td>
                    <td className="value-applied">
                      {formatValue(balance.total_value_invested)}
                    </td>
                    <td>{balance.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
          <CategoriesSection>
            <div>
              <strong className="categories-title">Categorias</strong>
              <Doughnut
                data={chartData}
                width={192}
                height={192}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  legend: {
                    display: false,
                  },
                  cutoutPercentage: 65,
                  tooltips: {
                    displayColors: false,
                    bodyFontSize: 16,
                    bodyFontFamily: 'Poppins',
                    yPadding: 12,

                    callbacks: {
                      label: (tooltipItem, data: ChartData) => {
                        const thisData: number[] =
                          data.datasets && data.datasets[0].data
                            ? (data.datasets[0].data as number[])
                            : [0];

                        const tooltipValue =
                          tooltipItem.index !== undefined && thisData
                            ? thisData[tooltipItem.index]
                            : 0;

                        const dataLabel =
                          data.labels && tooltipItem.index !== undefined
                            ? data.labels[tooltipItem.index]
                            : '';

                        return (
                          `${dataLabel}: ${formatValue(tooltipValue)}` || ''
                        );
                      },
                    },
                  },
                }}
              />
            </div>
            <CategoryItemContainer>
              {categoriesBalance.categoriesBalances.map(balance => (
                <CategoryItem
                  onClick={() => console.log(balance.category_name)}
                >
                  <strong>{balance.category_name}</strong>
                  <section>
                    <div>
                      <small>Saldo na categoria</small>
                      <strong>
                        {formatValue(balance.total_value_invested)}
                      </strong>
                    </div>
                    <div>
                      <small>% carteira</small>
                      <strong>{balance.category_percentage}</strong>
                    </div>
                  </section>
                </CategoryItem>
              ))}
            </CategoryItemContainer>
          </CategoriesSection>
        </div>
      </Container>
    </>
  );
};

export default MyProducts;
