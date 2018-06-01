import React from 'react';

const Button = (props) => {
 if (props.button === true) {
  return (
   <div>
  Button
   </div>
  );
 } else {
  return (
   <div></div>
  )
 }
};

export default Button