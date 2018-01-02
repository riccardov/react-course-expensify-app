import selectExpenseTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const result = selectExpenseTotal([]);
  expect(result).toEqual(0);
});

test('should return total sum of expenses', () => {
  const result = selectExpenseTotal(expenses);
  expect(result).toEqual(114195);
});
