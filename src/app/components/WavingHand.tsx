"use client";
import "@/app/styles/animations.css";
import { useState } from "react";
function WavingHand() {
  const greetings = ["Hello", "Hi", "Hey", "Greetings", "Salutations"];
  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];
  const [renderedGreetings, setRenderedGreetings] = useState([""]);
  const handleHandClick = () => {
    setRenderedGreetings([...renderedGreetings, randomGreeting]);
    setTimeout(() => {
      setRenderedGreetings((currentGreetings) =>
        currentGreetings.filter((greeting) => greeting !== randomGreeting),
      );
    }, 1500);
  };

  return (
    <div
      onClick={handleHandClick}
      className="relative cursor-pointer inline-block"
    >
      <div className=" hover:waving-hand">👋</div>
      {/* <div className="top-0 left-0 absolute w-20 h-20  ">
        {renderedGreetings.map((greeting, index) => (
          <div key={index} className="absolute fading-text">
            {greeting}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default WavingHand;
