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

export function findFirstPrimes(n=100) {
  // input: n is an integer, which says the maximum number of 100
  const primeList = [];
  for (let i=2; i < n; i++){
    // We look if we can find divisors in the prime list
    let foundDivisors = false;
    let k=0
    while (!foundDivisors && k < primeList.length ) {
      if (i % primeList[k] === 0) {
        foundDivisors = true;
      } else {
        k = k +1;
      }
    }
    if (!foundDivisors) {
      primeList.push(i);
    }
  }
  return primeList;
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

export function encodeOneCharacter(character, publicKey1, publicKey2) {
  // formula = characterCode**publicKey1 [mod publicKey2] 
  const charCode = JSBI.BigInt(character.charCodeAt(0));
  const codedChar = JSBI.remainder( JSBI.exponentiate(charCode, publicKey1),publicKey2 )
  // return String.fromCharCode(JSBI.toNumber(codedChar) );
  // console.log(`Output of the encoding: ${codedChar}`)
  return codedChar;
}

export function decodeOneCharacter(JSBIcode, privateKey, publicKey2) {
  // formula = characterCode**privateKey [mod publicKey2]
  // const charCode = JSBI.BigInt(character.charCodeAt(0));
  const decodedChar = JSBI.remainder( JSBI.exponentiate(JSBIcode, privateKey),publicKey2 )
  // console.log(`Output of decoding: ${codedChar}`);
  return String.fromCharCode(JSBI.toNumber(decodedChar) );
}

export function encodeString(inputString, privateKey1, privateKey2) {
  // utf-8 table: 
  // characters between #21 and #7E




}