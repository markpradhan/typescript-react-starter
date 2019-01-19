import { sum } from './foo'

test('test', () => {
  expect(sum()).toBe(0)
})

test('test-2', () => {
  expect(sum(1, 2)).toBe(3)
})
