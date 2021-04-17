import JSBI from 'jsbi';

// JSBI help : https://github.com/GoogleChromeLabs/jsbi
// coprime help: https://www.cuemath.com/learn/Mathematics/coprime-numbers/
// Eddie Woo RSA help: https://www.youtube.com/watch?v=oOcTVTpUsPQ&t=2s

// Babel JSBI transpiling stuff: https://github.com/GoogleChromeLabs/babel-plugin-transform-jsbi-to-bigint


export function isPrime(x) {
  // To do -> Converting to JSBI library
  // To do -> optimizing this
  for (let i=2; i< x; i++) {
    if (x % i === 0) {
      return false;
    }
  }
  return true;
}

export function gcd(a, b) {
  if (JSBI.EQ(a,0)) {
    return b;
  } else if(JSBI.EQ(b,0)) {
    return a;
  }
  // Euclid's identity : GCD(A,B) = GCD(B, A mod B)
  return gcd(b, JSBI.remainder(a,b));
}

export function getCoprimeList(a,b) {
  // input: a and b are JSBI big integers
  // output: array containing all the numbers between 2 and b which are coprime to a and b
  const coprimeArray = [];
  let i = JSBI.BigInt(2);
  while (JSBI.LE(i,b)) {
    if (JSBI.EQ(gcd(i,a),1) && JSBI.EQ(gcd(i,b),1)) {
      coprimeArray.push(i);
    }
    i = JSBI.ADD(i,JSBI.BigInt(1));
  }
  return coprimeArray;

}

export function findModuloInverses(a, b, n=5) {
  // Returns a list of the first n integers k which are such that a*k = 1 mod b
  let i= JSBI.BigInt(2);
  let nbFound = 0;
  let result = [];
  while (nbFound < n && JSBI.lessThan(i, JSBI.BigInt(500))) {
    if (JSBI.equal(JSBI.BigInt(1),JSBI.remainder(JSBI.multiply(a,i),b))) {
      result.push(i);
      nbFound++;
    }
    // Going to the next loop
    i = JSBI.add(i, JSBI.BigInt(1));
  }
  return result;
}