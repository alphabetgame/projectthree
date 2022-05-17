import React, { useState, useEffect } from "react";

const timer = (props) => {
  const [seconds, setSeconds] = useState(props.val);
  const [isActive] = useState(props.isActive);

  useEffect(() => {
    if (isActive === true) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          console.log(seconds);
        }
      }, 1000);
      if (seconds <= 0) {
        console.log("out of time");
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  });
  //   useEffect(() => {
  //     if (seconds <= 0) {
  //       console.log("out of time");
  //       clearInterval(interval);
  //     }
  //   });
  return (
    <div>
      <p>Timer remaining: {seconds} seconds</p>
    </div>
  );
};

export default timer;
