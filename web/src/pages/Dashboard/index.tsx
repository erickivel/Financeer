import React from 'react';

import { Doughnut } from 'react-chartjs-2';

import { ChartData } from 'chart.js';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container,
  InvestmentsInformations,
  CategoriesSection,
  CategoryItemContainer,
  CategoryItem,
  TotalContainer,
  RegisterSection,
} from './styles';

const Dashboard: React.FC = () => {
  const chartData: ChartData = {
    labels: ['Ações', 'Fundos Imobilários', 'ETFs', 'BDRs'],
    datasets: [
      {
        label: 'categorias',
        data: [864, 1234, 1234, 1243],
        backgroundColor: ['#3A49D0', '#3396CE', '#793BC9', '#2CA487'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Header />
      <Container>
        <InvestmentsInformations>
          <CategoriesSection>
            <div>
              <strong className="categories-title">Categorias</strong>
              <Doughnut
                data={chartData}
                width={320}
                height={320}
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
              <CategoryItem>
                <strong>AÇÕES</strong>
                <section>
                  <div>
                    <small>Saldo na categoria</small>
                    <strong>R$ 1463,12</strong>
                  </div>
                  <div>
                    <small>% carteira</small>
                    <strong>45,15</strong>
                  </div>
                </section>
              </CategoryItem>
              <CategoryItem>
                <strong>Fundos Imobilários</strong>
                <section>
                  <div>
                    <small>Saldo na categoria</small>
                    <strong>R$ 1463,12</strong>
                  </div>
                  <div>
                    <small>% carteira</small>
                    <strong>45,15</strong>
                  </div>
                </section>
              </CategoryItem>
              <CategoryItem>
                <strong>ETFs</strong>
                <section>
                  <div>
                    <small>Saldo na categoria</small>
                    <strong>R$ 1463,12</strong>
                  </div>
                  <div>
                    <small>% carteira</small>
                    <strong>45,15</strong>
                  </div>
                </section>
              </CategoryItem>
              <CategoryItem>
                <strong>BDRs</strong>
                <section>
                  <div>
                    <small>Saldo na categoria</small>
                    <strong>R$ 1463,12</strong>
                  </div>
                  <div>
                    <small>% carteira</small>
                    <strong>45,15</strong>
                  </div>
                </section>
              </CategoryItem>
            </CategoryItemContainer>
          </CategoriesSection>
          <TotalContainer>
            <h2>Total Investido</h2>
            <strong>R$ 11241,45</strong>
          </TotalContainer>
        </InvestmentsInformations>
        <RegisterSection>
          <h1>Asdw</h1>
        </RegisterSection>
      </Container>
    </>
  );
};

export default Dashboard;
