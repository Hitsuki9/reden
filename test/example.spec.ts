import { formatDate } from '../client/utils/helpers';

test('exanple', () => {
  expect(formatDate(new Date('2020-01-01 00:00:00'))).toBe(
    '2020-01-01 00:00:00'
  );
});
