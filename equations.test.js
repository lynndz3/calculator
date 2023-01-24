import expect from 'expect';
import { add, subtract, multiply, divide } from './equations.js'

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(6, -3.5)).toBe(2.5);
});

test('subtract', () => {
    expect(subtract(4, 1)).toBe(3);
    expect(subtract(-2, -2)).toBe(0);
  });

test('multiply', () => {
    expect(multiply(12, 2)).toBe(24);
    expect(multiply(13.6, 2.4)).toBe(32.64);
  });

test('divide', () => {
    expect(divide(12, 6)).toBe(2);
    expect(divide(-2, 16)).toBe(-0.125);
  });