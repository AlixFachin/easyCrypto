import JSBI from 'jsbi';

export default function NumberBox(props) {
  // Component which will display the list of numbers
  // expects props.numberArray to be an array of Numbers or JSBI numbers
  // And register the click function (passed in props) when user clicks on one of the numbers
  
  if (!props.numberArray) {
    return (<div className="numberList"> </div>)
  }

  return (<div className="numberList"> 
    { props.numberArray.map((number, index)=> 
      <div className="numberBox" 
        data-key={number instanceof JSBI ? JSBI.toNumber(number) : number} 
        key={index}
        onClick={ props.numberSelectEvent }>
        {number instanceof JSBI ? JSBI.toNumber(number) : number}
      </div>
    )}
    </div>)

}