
export default function NumberBox(props) {
  // Component which will display the list of numbers
  // And register the click function (passed in props) when user clicks on one of the numbers
  
  return (<div className="numberList"> 
    { props.numberArray.map((number, index)=> 
      <div className="numberBox" data-key={number} key={index} onClick={ props.numberSelectEvent }>{number}</div>
    )}
    </div>)

}