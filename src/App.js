import './App.css';
import  KeyGenerator from './keyGenerator';
import EncodingPanel from './encodingPanel';
import DecodingPanel from './decodingPanel';
import React, {useState} from 'react';


function App() {
  const [currentPanel,setCurrentPanel] = useState('keygen');
  
  function onKeyGenClick() {
    setCurrentPanel('keygen');
  }
  function onEncodingClick() {
    setCurrentPanel('encode');
  }

  return (
    <>
      <div className="App">
        <header> <h1> Easy Crypto!</h1>
        <p> Easy implementation of the RSA algorithm </p>
        <div class="button-row">
          <button onClick={ onKeyGenClick}>Key Generator</button>
          <button onClick={ onEncodingClick}>Encoding/Decoding</button>
        </div>
        </header>
        { currentPanel === 'keygen' ? <KeyGenerator /> :  <> <EncodingPanel /> <DecodingPanel /> </> }
        
      </div>
    </>
  );
}

export default App;
