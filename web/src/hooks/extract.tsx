import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface Category {
  id: string;
  name: string;
}

interface Movement {
  product_name: string;
  category_id: string;
  movement_date: Date;
  financial_institution: string;
  movement_value: number;
  movement_type: 'application' | 'redemption';
  amount: number;
}

interface CategoryBalance {
  category_name: string | undefined;
  total_value_invested: number;
  category_percentage: number;
}

interface CategoriesBalanceWithTotal {
  categoriesBalances: CategoryBalance[];
  total: number;
}

interface BalanceByName {
  product_name: string;
  total_value_invested: number;
  total_amount: number;
}

interface ExtractContext {
  categoriesBalance: CategoriesBalanceWithTotal;
  movements: Movement[];
  productNames: string[];
  // categoryNames;
  // createMovement();
  // balancesByName;
}

const ExtractContext = createContext<ExtractContext | null>(null);

const ExtractProvider: React.FC = ({ children }) => {
  const [categoriesBalance, setCategoriesBalance] = useState<
    CategoriesBalanceWithTotal
  >({
    categoriesBalances: [],
    total: 0,
  });
  const [movements, setMovements] = useState<Movement[]>([]);
  const [productNames, setProductNames] = useState(['']);

  useEffect(() => {
    async function loadCategoriesBalance(): Promise<void> {
      const response = await api.get('/balance/category');

      setCategoriesBalance(response.data);
    }

    async function loadMovements(): Promise<void> {
      const response = await api.get('/movements');

      const movementsRequest: Movement[] = response.data;

      const productNamesWithoutDuplicates = movementsRequest
        .map(movement => movement.product_name)
        .filter((product_name, index) => {
          return (
            movementsRequest
              .map(movement => movement.product_name)
              .indexOf(product_name) === index
          );
        });

      setMovements(movementsRequest);
      setProductNames(productNamesWithoutDuplicates);
    }

    loadMovements();

    loadCategoriesBalance();
  }, []);

  const value = React.useMemo(
    () => ({ categoriesBalance, movements, productNames }),
    [categoriesBalance, movements, productNames],
  );

  console.log(productNames);

  return (
    <ExtractContext.Provider value={value}>{children}</ExtractContext.Provider>
  );
};

function useExtract(): ExtractContext {
  const context = useContext(ExtractContext);

  if (!context) {
    throw new Error(`useExtract must be used within a ExtractProvider`);
  }

  return context;
}

export { ExtractProvider, useExtract };
