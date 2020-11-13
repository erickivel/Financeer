import React, { useState } from 'react';

import { Doughnut } from 'react-chartjs-2';

import { ChartData } from 'chart.js';

import Header from '../../components/Header';
import Input from '../../components/Input';

import formatValue from '../../utils/formatValue';

import {
  Container,
  InvestmentsInformations,
  CategoriesSection,
  CategoryItemContainer,
  CategoryItem,
  TotalContainer,
  RegisterSection,
  ButtonsMovementType,
} from './styles';

interface Movement {
  movement_type: 'application' | 'redemption';
}

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

  const [movement_type, setMovementType] = useState<
    'application' | 'redemption'
  >();

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
          <h2>Registre uma movimentação</h2>
          <form>
            <div className="movement-type">
              <strong>Tipo de Movimentação</strong>

              <ButtonsMovementType buttonSelected={movement_type}>
                <button
                  type="button"
                  className="application-button"
                  onClick={() => setMovementType('application')}
                >
                  Aplicação
                </button>
                <button
                  type="button"
                  className="redemption-button"
                  onClick={() => setMovementType('redemption')}
                >
                  Resgate
                </button>
              </ButtonsMovementType>
            </div>
            {movement_type === 'application' && (
              <>
                <div className="movement_data">
                  <Input
                    scale="large"
                    name="financial-institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    scale="small"
                    name="product-name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    scale="small"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
                    scale="small"
                    name="movement_value"
                    label="Preço de compra"
                    placeholder="Insira o preço total"
                  />
                  <Input
                    scale="small"
                    name="movement_date"
                    label="Data da compra"
                    placeholder="dd/mm/aaaa"
                  />
                  <Input
                    scale="large"
                    name="category"
                    label="Categoria do ativo"
                    placeholder="Ex: Ações, Fiis, BDRs, ETFs"
                  />
                </div>

                <button type="submit">Confirmar</button>
              </>
            )}
            {movement_type === 'redemption' && (
              <>
                <div className="movement_data">
                  <Input
                    scale="large"
                    name="financial-institution"
                    label="Instituição Financeira"
                    placeholder="Onde foi realizada a movimentação"
                  />
                  <Input
                    scale="small"
                    name="product-name"
                    label="Ticker do ativo"
                    placeholder="Ex: ITSA4"
                  />
                  <Input
                    scale="small"
                    name="amount"
                    label="Quantidade"
                    placeholder="Quantidade de cotas"
                  />
                  <Input
                    scale="small"
                    name="movement_value"
                    label="Preço de Venda"
                    placeholder="Insira o preço total"
                  />
                  <Input
                    scale="small"
                    name="movement_date"
                    label="Data da venda"
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <button type="submit">Confirmar</button>
              </>
            )}
          </form>
        </RegisterSection>
      </Container>
    </>
  );
};

export default Dashboard;
