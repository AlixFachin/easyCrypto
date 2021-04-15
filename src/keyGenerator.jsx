import React, {useState, useEffect} from 'react';
import MessageBox from './MessageBox';
import JSBI from 'jsbi';
import { getCoprimeList} from './utils/mathUtils';

export function isPrime(x) {
  for (let i=2; i< x; i++) {
    if (x % i === 0) {
      return false;
    }
  }
  return true;
}

export default function KeyGenerator() {

  const [ message, setMessage ] = useState({});
  const [ firstPrime, setFirstPrime ] = useState();
  const [ secondPrime, setSecondPrime ] = useState();

  useEffect(() => {
    console.log(firstPrime, secondPrime);
    if (firstPrime && secondPrime) {
      getPublicKey();
    }
  }, [firstPrime, secondPrime]);

  function logMessage(messageText, messageType='') {
    setMessage({ text: messageText, messageType: messageType });
  }

  function getPublicKey() {
    const b = JSBI.multiply(firstPrime, secondPrime);
    const phi_b = JSBI.multiply(JSBI.subtract(firstPrime, JSBI.BigInt(1)), JSBI.subtract(secondPrime, JSBI.BigInt(1)));
    console.log(`b=${b.toString() }, phiB=${phi_b.toString()}`);
    // Now we need to look at all the numbers between 1 and phi_b and get the list of all those ones which are coprimes
    // with both b and phi_b
    console.log(getCoprimeList(b, phi_b));
    // Now we have to suggest the list of co-primes, and for each co-prime (Which could be a private key)
    // we need to choose a number such that e*d = 1 mod( phi_b )

  }

  function get100Primes() {
    let tempResult = [];
    for (let i=1; i<100; i++) {
      if (isPrime(i)) {tempResult.push(i);}
    }
    return tempResult;
  }

  function inputChange(e){
    const inputValue = e.target.value;
    if (isNaN(Number(inputValue)) || Number(inputValue) > 1000 ) {
      logMessage('invalid Input!');
    } else if (Number(inputValue) > 1000) {
      logMessage('input too big!');
    } else if (!isPrime(Number(inputValue))) {
        logMessage('input not prime!');
    } else {
      // Proper input
      const inputPrime = JSBI.BigInt(inputValue);
      console.log(inputPrime);
      if (e.target.id === 'firstPrimeInput') {
        setFirstPrime(inputPrime);
      } else {
        setSecondPrime(inputPrime);
      }
    }
  }

  return (<div className="panel">
    <header> <h2>Public / Private Key Generator</h2> </header>
    <section>
      <h3>Please enter two prime numbers of your choice:</h3>
      <MessageBox text={message.text} messageType={message.messageType}/>
      <input type="text" id="firstPrimeInput" onChange={ inputChange }></input>
      <input type="text" id="secondPrimeInput" onChange={ inputChange }></input>
      <hr></hr>
      <h4>The first prime numbers are: </h4>
      <p> { get100Primes().join(',') } </p>
      <hr></hr>
      <h3>Here are your public keys:</h3><span className="numberField" id="publicKeys"></span>
      <h3>Here is your private key:</h3><span className="numberField" id="privateKey"></span>
    </section>
  </div>);

}