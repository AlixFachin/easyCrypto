import React, {useState, useReducer} from 'react';
import MessageBox from './MessageBox';
import HelpPrimeBox  from './helpPrimeBox';
import NumberBox from './numberBox';
import JSBI from 'jsbi';
import { getCoprimeList, findModuloInverses, isPrime} from './utils/mathUtils';

/* COMPONENT STATES
  * firstPrime: type JSBI.BigInt -> contains the first Prime number selected
  * secondPrime: type JSBI.BigInt -> contains the second Prime number selected
  * phi_b: type JSBI.BigInt -> contains the totent function of (firstPrime*secondPrime)
  * coprimeArray: type [JSBI.bigInt] -> contains all the coprimes of b and phi_b
  * privateKeyArray: type [JSBI.BigInt] -> contains candidates for the private key number
  * publicKey: type JSBI.BigInt -> First of the two integers making a private key
  * privateKey: type JSBI.BigInt -> First of the two integers making the private key
  */

function reducerKeyGen(state, action) {
  console.log(`Received dispatch - ${JSON.stringify(action)}`);
  switch(action.type) {
    case 'firstPrimeChanged':
      // First prime selected: data validation, then action further down
      // Only the first prime has been selected, so we have to remove all the other properties
      return { firstPrime: action.payload };
    case 'secondPrimeChanged':
      // Second prime selected: We can compute the other items
      const b = JSBI.multiply(state.firstPrime, action.payload);
      const phi_b = JSBI.multiply(JSBI.subtract(state.firstPrime, JSBI.BigInt(1)), JSBI.subtract(action.payload, JSBI.BigInt(1)));
      return { firstPrime: state.firstPrime, 
        secondPrime: action.payload,
        phi_b: phi_b, 
        coprimeArray: getCoprimeList(b, phi_b) };
    case 'primeSelected':
      // the user selected one prime number - we need to figure out if it goes into the first or second prime
      if (!state.firstPrime) {
        document.getElementById("firstPrimeInput").value = action.payload.toString();
        return { firstPrime: action.payload };
      } else {
        // TO DO -> Factorize the below few lines in order to respect the DRY principle
        const b = JSBI.multiply(state.firstPrime, action.payload);
        const phi_b = JSBI.multiply(JSBI.subtract(state.firstPrime, JSBI.BigInt(1)), JSBI.subtract(action.payload, JSBI.BigInt(1)));
        document.getElementById("secondPrimeInput").value = action.payload.toString();
        return { firstPrime: state.firstPrime, 
        secondPrime: action.payload,
        phi_b: phi_b, 
        coprimeArray: getCoprimeList(b, phi_b) };
      };
    case 'publicKeySelected':
      // The user clicked on one of the coprime number boxes => this will be our public key.
      // We have to display the inverses        
      return { 
          ...state, 
          publicKey: action.payload,
          privateKeyArray: findModuloInverses(action.payload, state.phi_b, 5),
        };
    case 'privateKeySelected':
      return {
        ...state,
        privateKey: action.payload,
      };
    case 'clearData':
      return {};
    default:
      throw new Error('Unexpected action in keyGen reducer');
  }

}


export default function KeyGenerator() {

  const [keyGenState, keyGenDispatch] = useReducer(reducerKeyGen, {});

  const [ message, setMessage ] = useState({});
  
  // Helper function to help display of intermediary steps
  function displayProductofPrimes() {
    if (keyGenState.firstPrime && keyGenState.secondPrime) {
      return JSBI.multiply(keyGenState.firstPrime, keyGenState.secondPrime).toString();
    }
    return "";
  }

  function logMessage(messageText, messageType='') {
    setMessage({ text: messageText, messageType: messageType });
  }

  // Function managing user-driven events -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  function primeInputFieldChange(event){
    const inputValue = event.target.value;
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
      if (event.target.id === 'firstPrimeInput') {
        keyGenDispatch({type:'firstPrimeChanged', payload: inputPrime  });
      } else {
        keyGenDispatch({type:'secondPrimeChanged', payload: inputPrime  });
      }
    }
  }

  function primeNumberSelected(event) {
    // function which will be passed down to childen in order to select the two prime numbers
    const numberClicked = event.target.dataset['key'];
    if (!isNaN(Number(numberClicked)) && isPrime(Number(numberClicked))) {
      keyGenDispatch({type: 'primeSelected', payload: JSBI.BigInt(numberClicked) });
    }
  }

  function coPrimeSelected(event) {
    // when the user selects a coprime number, we can display the potential candidates
    keyGenDispatch({type: 'publicKeySelected', payload: JSBI.BigInt(Number(event.target.dataset["key"])) });
  }

  function privateKeySelected(event) {
    console.log("Private key selected!")
    keyGenDispatch({type: 'privateKeySelected', payload: JSBI.BigInt(Number(event.target.dataset["key"]))})
  }

  function clearKeyGenData() {
    keyGenDispatch({type: 'clearData'});
  }

  return (<div className="panel">
    <header> <h2>Public / Private Key Generator</h2> </header>
    <section>
      <p> Your current public key is: ( {keyGenState.publicKey? keyGenState.publicKey.toString() : ''},{displayProductofPrimes()} ). 
        Your current private key is: ( {keyGenState.privateKey? keyGenState.privateKey.toString() : ''}, {displayProductofPrimes()}) </p>
      <button onClick={clearKeyGenData} >Clear</button>
      <hr></hr>
      <h3>Please enter two prime numbers of your choice</h3>
      <p>Please note that the product of the two prime numbers should be higher than 130 for the coding/decoding to work. 
        Please kindly choose numbers less than 1000 though, otherwise it would take too much time to compute.
      </p>
      <HelpPrimeBox primeNumberSelected={primeNumberSelected}/>
      <MessageBox text={message.text} messageType={message.messageType}/>
      <input type="text" id="firstPrimeInput" onChange={ primeInputFieldChange }></input>
      <input type="text" id="secondPrimeInput" onChange={ primeInputFieldChange }></input>
      <hr></hr>
      <p>
      Both public key and private key are composed of <span className="emphasis">two integers</span>. <br />
      One of the integers is the product of the two prime numbers, the other number should not have common divisors 
      between this number and another quantity called <a href="https://en.wikipedia.org/wiki/Euler%27s_totient_function">
      the totent function</a> phi_b ().
      </p>
      <p>Below are the candidates for the first integer of your <span className="emphasis">Public Key</span>. 
      Please choose one among the following:</p>
      <NumberBox id="coprimeBox" numberArray={ keyGenState.coprimeArray } numberSelectEvent= { coPrimeSelected }/>
      <p> Below are the different candidates for the <span className="emphasis">private key</span></p>
      <NumberBox id="privateKeyBox" numberArray={ keyGenState.privateKeyArray } numberSelectEvent= { privateKeySelected } label="Choose the private key"/>
    </section>
  </div>);

}