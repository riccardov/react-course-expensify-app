import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import validator from 'validator';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import expensesReducer from './reducers/expenses';
import filtersReducer from './reducers/filters';

import 'normalize.css/normalize.css'
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
});

store.dispatch(addExpense({
  description: 'water bill',
  amount: 100,
  createdAt: 1000
}));

store.dispatch(addExpense({
  description: 'internet bill',
  amount: 300,
  createdAt: -10000
}));

store.dispatch(addExpense({
  description: 'gas bill',
  amount: 200,
  createdAt: 100000
}));

store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));