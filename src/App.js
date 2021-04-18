import './App.css';
import EncodingPanel from './encodingPanel';
import "./keyGenerator";
import  KeyGenerator from './keyGenerator';

function App() {
  return (
    <>
      <div className="App">
        <h1> Easy Crypto!</h1>
        <p> Trying to help you understand crypto </p>

        <KeyGenerator />
        <EncodingPanel />

      </div>
    </>
  );
}

export default App;
