import React, { useState, useEffect } from 'react';
import JSBI from 'jsbi';
import { encodeOneCharacter, encodeCharacterSteps } from './utils/mathUtils';

export default function EncodingPanel() {

  const [publicKey1, setPublicKey1] = useState(1);
  const [publicKey2, setPublicKey2] = useState(1);
  const [messageToEncode, setMessageToEncode] = useState('');
  const [encodedMessage, setEncodedMessage] = useState('');
  // eslint-disable-next-line
  const [messageDetailIndex, setMessageDetailIndex] = useState(0);
  const [encodingSteps, setEncodingSteps] = useState([]);

  useEffect(() => {
    // console.log(`Trying to compute the steps for ${messageDetailIndex} when encoded Message is ${messageToEncode}`)
    if (messageToEncode && messageToEncode.length > 0) {
      setEncodingSteps( encodeCharacterSteps(messageToEncode[messageDetailIndex], publicKey1, publicKey2) );
    } else {
      setEncodingSteps( [] );
    }
  }, [messageDetailIndex, messageToEncode, publicKey1, publicKey2]);

  useEffect(()=> {
    let result = [];
    if (typeof(publicKey1) === 'number' && typeof(publicKey2) === 'number' && messageToEncode) {
      const jsbiPublicKey1 = JSBI.BigInt(publicKey1);
      const jsbiPublicKey2 = JSBI.BigInt(publicKey2);
      for (let x of messageToEncode) {
        // console.log(`Trying to encode character ${x} with public keys=(${jsbiPublicKey1.toString()},${jsbiPublicKey2.toString()})`)
        result.push( encodeOneCharacter(x, jsbiPublicKey1, jsbiPublicKey2));
      }
      setEncodedMessage(`[${result.join(',')}]`);
    } else {
      setEncodedMessage('');
    }
  }, [publicKey1, publicKey2, messageToEncode]);

  function numberInputChange(e) {
    const newInputValue = e.target.value;
    if (!isNaN(Number(newInputValue)) && Number(newInputValue) > 0) {
      if (e.target.id === 'PublicKeyInput1') {
        setPublicKey1(Math.floor(newInputValue));
      } else {
        setPublicKey2(Math.floor(newInputValue));
      }
    }
  }

  function messageChange(e) {
    setMessageToEncode(e.target.value);
  }

  return (<div className="panel">
    <header><h2>Text encoder</h2></header>
    <section>
      <h3>Enter your public key</h3>
      <div className="formDiv">
        <label htmlFor="PublicKeyInput1">Public Key 1</label><input type="text" id="PublicKeyInput1" onChange= { numberInputChange }></input>
        <label htmlFor="PublicKeyInput2">Public Key 2</label><input type="text" id="PublicKeyInput2" onChange = { numberInputChange } ></input>
      </div>
      <div className="formDiv">
        <label htmlFor="EncodingMessageInput">Message to Encode:</label>
        <textarea cols="40" rows="4" id="EncodingMessageInput" onChange = { messageChange }></textarea>
      </div>
      <div className="messageArea">
        <p id="encodedMessageArea">Encoded Message: { encodedMessage }</p>
      </div>
      <div className="messageArea">
        <ul className="noBulletList">
          <li> Character: "{messageToEncode? messageToEncode[0] : ''}" <button>Next</button><button>Previous</button></li>
          <li> Number code: "{encodingSteps && encodingSteps.length > 0 ? encodingSteps[0] : '' }" </li>
          <li> Set to the power: "{encodingSteps && encodingSteps.length > 0 ? encodingSteps[1] : '' }" </li>
          <li> Encoded Message: "{encodingSteps && encodingSteps.length > 0 ? encodingSteps[2] : '' }"</li>
        </ul>
      </div>
    </section>

  </div>);

}