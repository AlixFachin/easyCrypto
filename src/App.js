import './App.css';
import  KeyGenerator from './keyGenerator';
import EncodingPanel from './encodingPanel';
import DecodingPanel from './decodingPanel';


function App() {
  return (
    <>
      <div className="App">
        <h1> Easy Crypto!</h1>
        <p> Trying to help you understand crypto </p>
        <KeyGenerator />
        <EncodingPanel />
        <DecodingPanel />
      </div>
    </>
  );
}

export default App;
