import React, { useState, useEffect } from 'react';
import JSBI from 'jsbi';
import { decodeOneCharacter } from './utils/mathUtils';

export default function DecodingPanel() {

  const [privateKey1, setPrivateKey1] = useState(1);
  const [privateKey2, setPrivateKey2] = useState(1);
  const [messageToDecode, setMessageToDecode] = useState();
  const [decodedMessage, setDecodedMessage] = useState();

  useEffect(()=> {
    if (typeof(privateKey1) === 'number' && typeof(privateKey2) === 'number' && messageToDecode) {
      const jsbiPrivateKey1 = JSBI.BigInt(privateKey1);
      const jsbiPrivateKey2 = JSBI.BigInt(privateKey2);
      // TO DO -> Parsing of the algorithm
      // for (let x of messageToDecode) {
      //   result.push( encodeOneCharacter(x, jsbiPublicKey1, jsbiPublicKey2));
      // }
      // setDecodedMessage(`[${result.join(',')}]`);
      const parsedArray = messageToDecode.match(/(\d+)/g); // parse any separated group of digits
      let resultString = '';
      for (let i=0; i<parsedArray.length; i++) {
        console.log(`Trying to decode ${parsedArray[i]} with ${jsbiPrivateKey1.toString()} and ${jsbiPrivateKey2.toString()}`);
        resultString += decodeOneCharacter(JSBI.BigInt(parsedArray[i]),jsbiPrivateKey1, jsbiPrivateKey2)
      }
      setDecodedMessage(resultString);
    } else {
      setDecodedMessage('');
    }
  }, [privateKey1, privateKey2, messageToDecode]);

  function numberInputChange(e) {
    const newInputValue = e.target.value;
    if (!isNaN(Number(newInputValue)) && Number(newInputValue) > 0) {
      if (e.target.id === 'PrivateKeyInput1') {
        setPrivateKey1(Math.floor(newInputValue));
      } else {
        setPrivateKey2(Math.floor(newInputValue));
      }
    }
  }

  function messageChange(e) {
    setMessageToDecode(e.target.value);
  }

  return (<div className="panel">
    <header><h2>Text decoder</h2></header>
    <section>
      <h3>Enter your private key:</h3>
      <div>
        <label htmlFor="PrivateKeyInput1">Public Key 1</label><input type="text" id="PrivateKeyInput1" onChange= { numberInputChange }></input>
        <label htmlFor="PrivateKeyInput2">Public Key 2</label><input type="text" id="PrivateKeyInput2" onChange = { numberInputChange } ></input>
      </div>
      <div>
        <label htmlFor="DecodingMessageInput">Message to Decode:</label>
        <textarea cols="40" rows="4" id="DecodingMessageInput" onChange = { messageChange }></textarea>
      </div>
      <div className="messageArea">
        <p> Using for encryption algorithm { privateKey1 } and { privateKey2} </p>
        <p id="encodedMessageArea">{ decodedMessage }</p>
      </div>
    </section>

  </div>);

}