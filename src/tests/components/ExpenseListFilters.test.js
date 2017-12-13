import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('Should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilters with alternative data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('Should handle text change correctly', () => {
  const value = 'rent';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Should sort by date correctly', () => {
  wrapper.find('select').simulate('change', {
    target: { value: 'date' }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('Should sort by amount correctly', () => {
  wrapper.find('select').simulate('change', {
    target: { value: 'amount' }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('Should handle date changes correctly', () => {
  const startDate = moment(0).add(2, 'days');
  const endDate = moment(0).add(15, 'days');
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Should handle date focus change correctly', () => {
  const calendarFocus = 'endDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocus);
  expect(wrapper.state('calendarFocus')).toEqual(calendarFocus);
});