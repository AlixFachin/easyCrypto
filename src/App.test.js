import { render, screen } from '@testing-library/react';
import App from './App';
import KeyGenerator, { isPrime } from './keyGenerator';

// to test the arithmetic utils
import JSBI from 'jsbi';
import { findModuloInverses, gcd, getCoprimeList, encodeOneCharacter, decodeOneCharacter} from './utils/mathUtils';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Trying to help/i);
  expect(linkElement).toBeInTheDocument();
});

test('Arithmetic GCD helper works', () => {
  // gcd(2,14) = 2;
  expect(JSBI.EQ(gcd(JSBI.BigInt(14),JSBI.BigInt(2)),2)).toEqual(true);
  // gcd(252,105) = 21 
  expect(JSBI.EQ(gcd(JSBI.BigInt(252),JSBI.BigInt(105)),21)).toEqual(true);
  // gcd(59,97) = 1
  expect(JSBI.EQ(gcd(JSBI.BigInt(59),JSBI.BigInt(97)),1)).toEqual(true);
});

test('Get Coprime List function', () => {
  // coprime list;
  const firstValue = JSBI.BigInt(14);
  const secondValue = JSBI.BigInt(6);
  let coprimeList = getCoprimeList(firstValue, secondValue);
  let expectedList = [5];
  expect(coprimeList.length).toEqual(expectedList.length);
  for (let i=0; i<expectedList.length; i++) {
    expect(JSBI.EQ(coprimeList[i],expectedList[i])).toEqual(true);
  }
  // Second test
  coprimeList  = getCoprimeList(JSBI.BigInt(30), JSBI.BigInt(56));
  expectedList = [11,13,17,19,23,29,31,37,41,43,47,53];
  expect(coprimeList.length).toEqual(expectedList.length);
  for (let i=0; i<expectedList.length; i++) {
    expect(JSBI.EQ(coprimeList[i],expectedList[i])).toEqual(true);
  }

});

test('Find modulo inverses', () => {
  let invertList = findModuloInverses(JSBI.BigInt(5), JSBI.BigInt(6));
  const expectedList = [5,11,17,23,29];
  for (let i=0; i<expectedList.length; i++) {
    expect(JSBI.EQ(invertList[i],expectedList[i])).toEqual(true);
  }
})

test('Encoding and decoding functions', () => {
  for (let x of 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    expect(decodeOneCharacter(encodeOneCharacter(x,JSBI.BigInt(107), JSBI.BigInt(143)),JSBI.BigInt(83), JSBI.BigInt(143))).toEqual(x);
  }
})

test('satisfactory test if a number is prime', () => {
  render(<KeyGenerator />);
  expect(isPrime).toBeDefined();
  expect(isPrime(5)).toEqual(true);
  expect(isPrime(4)).toEqual(false);
  expect(isPrime(54)).toEqual(false);
});