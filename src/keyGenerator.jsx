import React, {useState, useEffect} from 'react';
import MessageBox from './MessageBox';
import HelpPrimeBox  from './helpPrimeBox';
import NumberBox from './numberBox';
import JSBI from 'jsbi';
import { getCoprimeList, findModuloInverses, isPrime} from './utils/mathUtils';

export default function KeyGenerator() {

  const [ message, setMessage ] = useState({});
  const [ firstPrime, setFirstPrime ] = useState();
  const [ secondPrime, setSecondPrime ] = useState();
  const [ stepsList, setStepsList ] = useState([]);
  const [ coprimeArray, setCoprimeArray ] = useState([]);
  const [ privateKeyArray, setPrivateKeyArray ] = useState([]);
  const [ publicKey, setPublicKey ] = useState();
  const [ privateKey, setPrivateKey ] = useState();

  function clearStepsList() {
    setStepsList([]);
  }
  
  // Helper function to help display of intermediary steps
  function displayProductofPrimes() {
    if (firstPrime && secondPrime) {
      return JSBI.multiply(firstPrime, secondPrime).toString();
    }
    return "";
  }

  useEffect(() => {
    console.log(firstPrime, secondPrime);
    let messageArray = [];
    if (firstPrime && secondPrime) {
      clearStepsList();
      const b = JSBI.multiply(firstPrime, secondPrime);
      const phi_b = JSBI.multiply(JSBI.subtract(firstPrime, JSBI.BigInt(1)), JSBI.subtract(secondPrime, JSBI.BigInt(1)));
      
      // Now we need to look at all the numbers between 1 and phi_b and get the list of all those ones which are coprimes
      // with both b and phi_b
      setCoprimeArray(getCoprimeList(b, phi_b));
      messageArray.push('Coprime list: ' + coprimeArray.map((coprimeValue) => coprimeValue.toString()).join(', '));
      // Now we have to suggest the list of co-primes, and for each co-prime (Which could be a private key)
      // we need to choose a number such that e*d = 1 mod( phi_b )
      let potentialKeys = [];
      for (let encodingKey of coprimeArray) {
        // encodingKey is a potential for encoding Key
        potentialKeys = findModuloInverses(encodingKey, phi_b, 3);
        for (let i=0; i<potentialKeys.length; i++) {
          messageArray.push(`Potential public key: (${encodingKey.toString()},${b.toString()}), private key: ${potentialKeys[i].toString()}`);
        }
      }
      setStepsList(messageArray);
    }
  }, [firstPrime, secondPrime]);
  
  useEffect(() => {
    // when the public key changes, we have to update the list of potential candidates for the private key
    if (coprimeArray && coprimeArray.length>0) {
      
      const phi_b = JSBI.multiply(JSBI.subtract(firstPrime, JSBI.BigInt(1)), JSBI.subtract(secondPrime, JSBI.BigInt(1)));
      const potentialKeys = findModuloInverses(publicKey, phi_b, 5);
      setPrivateKeyArray(potentialKeys.map(x=>x.toString()));
    }

  }, [publicKey])

  function logMessage(messageText, messageType='') {
    setMessage({ text: messageText, messageType: messageType });
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
      logMessage('');
      const inputPrime = JSBI.BigInt(inputValue);
      console.log(inputPrime);
      if (e.target.id === 'firstPrimeInput') {
        setFirstPrime(inputPrime);
      } else {
        setSecondPrime(inputPrime);
      }
    }
  }

  function primeNumberSelected(event) {
    // function which will be passed down to childen in order to select the two prime numbers
    console.log('Number clicked!');
    console.log(event);
    const numberClicked = event.target.dataset['key'];
    if (!isNaN(Number(numberClicked)) && isPrime(Number(numberClicked))) {
      if (!firstPrime) { 
        setFirstPrime(JSBI.BigInt(numberClicked));
        document.getElementById("firstPrimeInput").value = numberClicked;
      } else {
        setSecondPrime(JSBI.BigInt(numberClicked));
        document.getElementById("secondPrimeInput").value = numberClicked;
      }
    }
  }

  function coPrimeSelected(e) {
    // when the user selects a coprime number, we can display the potential stuff
    setPublicKey(JSBI.BigInt(Number(e.target.dataset["key"])));
  }

  function privateKeySelected(e) {
    console.log("Private key selected!")
    setPrivateKey(JSBI.BigInt(Number(e.target.dataset["key"])));
  }

  return (<div className="panel">
    <header> <h2>Public / Private Key Generator</h2> </header>
    <section>
      <h3>Please enter two prime numbers of your choice:</h3>
      <p>Please note that the product of the two prime numbers should be higher than 130 for the coding/decoding to work. 
        Please kindly choose numbers less than 1000 though, otherwise it would take too much time to compute.
      </p>
      <HelpPrimeBox primeNumberSelected={primeNumberSelected}/>
      <MessageBox text={message.text} messageType={message.messageType}/>
      <input type="text" id="firstPrimeInput" onChange={ inputChange }></input>
      <input type="text" id="secondPrimeInput" onChange={ inputChange }></input>
      <hr></hr>
      <p> Your current public key is: ( {publicKey},{displayProductofPrimes()} ). Your current private key is: ( {privateKey}, {displayProductofPrimes()}) </p>
      <hr></hr>
      <p>
      Both public key and private key are composed of <span className="emphasis">two integers</span>. <br />
      One of the integers is the product of the two prime numbers, the other number should not have common divisors 
      between this number and another quantity called phi_b.
      </p>
      <p>Below are the candidates for the first integer of your <span className="emphasis">Public Key</span>. 
      Please choose one among the following:</p>
      <NumberBox id="coprimeBox" numberArray={ coprimeArray } numberSelectEvent= { coPrimeSelected }/>
      <p> Below are the different candidates for the private key.</p>
      <NumberBox id="privateKeyBox" numberArray={ privateKeyArray } numberSelectEvent= { privateKeySelected } label="Choose the private key"/>
    </section>
  </div>);

}