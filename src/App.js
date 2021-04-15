import './App.css';
import "./keyGenerator";
import  KeyGenerator from './keyGenerator';

function App() {
  return (
    <>
      <div className="App">
        <h1> Easy Crypto!</h1>
        <p> Trying to help you understand crypto </p>

        <KeyGenerator />

      </div>
    </>
  );
}

export default App;
