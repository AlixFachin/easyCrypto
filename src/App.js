import './App.css';
import  KeyGenerator from './keyGenerator';
import EncodingPanel from './encodingPanel';
import DecodingPanel from './decodingPanel';
import React, {useState} from 'react';


function App() {
  const [currentPanel,setCurrentPanel] = useState('encode');
  
  function onKeyGenClick() {
    setCurrentPanel('keygen');
  }
  function onEncodingClick() {
    setCurrentPanel('encode');
  }

  return (
    <>
      <div className="App">
        <header id="mainHeader"> <h1> First approach in cryptography</h1>
        <p> Simple implementation of the RSA algorithm </p>
        <div className="button-row">
          <button className="mainButton" onClick={ onEncodingClick}>Encoding/Decoding</button>
          <button className="mainButton" onClick={ onKeyGenClick}>Key Generator</button>
        </div>
        </header>
        <div id="exampleKeyPanel" className="panel">
          <h3>Some examples of public/private keys </h3>
          <ul className="noBulletList">
          <li><span className="keyValue">public: (23, 209) - private: (47,209)</span></li>
          <li><span className="keyValue">public: (267, 1633) - private: (323,1633)</span></li>
          </ul>
          <p id="currentKeySet"></p>
        </div>
        { currentPanel === 'keygen' ? <KeyGenerator /> :  <> <EncodingPanel /> <DecodingPanel /> </> }
        
      </div>
      <footer className="footer">
      <p> Background photo by <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Spiske</a> on <a href="https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </p>
      </footer>
    </>
  );
}

export default App;
