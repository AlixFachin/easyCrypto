import React, {useState, useEffect} from 'react';
import { findFirstPrimes } from './utils/mathUtils';

export default function HelpPrimeBox(props) {
  // Component which will display a button written 'Help Me' or 
  // a list of the first 20 prime numbers
  const [showPrimeList,setShowPrimeList] = useState(false);

  function findPrimeClick() {
    setShowPrimeList(true);
  }
  function hidePrimeClick() {
    setShowPrimeList(false);
  }

  const primeListDiv = (
    <>
    <div className="numberList">
      { findFirstPrimes(100).slice(4).map((primeNumber) => <div className="numberBox" data-key={primeNumber} key={primeNumber} 
        onClick={props.primeNumberSelected}> {primeNumber} </div>) } 
    </div>
    <button onClick={ hidePrimeClick }>Hide Prime Number Help</button></>);

  return (<div>
    { showPrimeList? primeListDiv : <button id="findPrimeBtn" onClick={findPrimeClick}>Help Me find Prime numbers!</button> }
  </div>)

}