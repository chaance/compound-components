import React, { useRef, useState } from "react";
import { Accordion } from "./Accordion";
import "./App.css";

function App() {
  let [index, setIndex] = useState(0);
  let data = [
    {
      buttonText: `Hello darkness, my old friend`,
      panelText: `Fringilla porta porttitor tristique praesent habitant, habitasse
      ut faucibus congue arcu nullam, metus montes duis fermentum. Dui
      cursus proin dignissim suspendisse lobortis faucibus
      pellentesque, curae integer facilisi lorem ad class condimentum
      maecenas, phasellus mus sagittis non diam taciti.`,
      ref: useRef(),
    },
    {
      buttonText: `I've come to talk with you again`,
      panelText: `Fringilla porta porttitor tristique praesent habitant, habitasse
      ut faucibus congue arcu nullam, metus montes duis fermentum. Cum
      faucibus turpis risus hendrerit mi volutpat laoreet, netus justo
      consectetur vivamus nunc per, dui at leo nascetur sociis taciti.`,
      ref: useRef(),
    },
    {
      buttonText: `Because a vision softly creeping`,
      panelText: `Integer dui nostra vehicula sit augue metus faucibus aliquam
      vulputate, curae per himenaeos erat facilisi lorem consectetur
      penatibus. Penatibus vel mattis potenti orci libero augue aenean
      posuere, adipiscing dapibus eros laoreet dui sagittis
      condimentum, ut pellentesque curae natoque aliquet velit
      integer.`,
      ref: useRef(),
    },
    {
      buttonText: `Left its seeds while I was sleeping`,
      panelText: `Netus nulla iaculis dolor sociosqu commodo mollis congue sociis et fames, est adipiscing venenatis dictum donec himenaeos porttitor molestie nam, in fusce consectetur luctus tincidunt elit sed feugiat conubia. Facilisis euismod vehicula phasellus fames lorem montes proin egestas, accumsan molestie potenti sociis erat nam sit orci fringilla, turpis metus volutpat vulputate a varius hendrerit.`,
      ref: useRef(),
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Accordion index={index} onChange={setIndex} data={data} />
        </div>
      </header>
    </div>
  );
}

export default App;
