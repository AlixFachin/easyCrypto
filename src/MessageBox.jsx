import React from 'react';

export default function MessageBox(props) {

  return (<>
    <div className="messageBox">
      <p className={ props.messageType? props.messageType : null } > {props.text} </p>
    </div>
  </>);

}