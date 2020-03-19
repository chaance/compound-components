import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel
} from "./Accordion";
import "./App.css";

function App() {
  let [index, setIndex] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Accordion index={index} onChange={setIndex}>
            <AccordionItem>
              <AccordionButton>Hello darkness, my old friend</AccordionButton>
              <AccordionPanel>
                Fringilla porta porttitor tristique praesent habitant, habitasse
                ut faucibus congue arcu nullam, metus montes duis fermentum. Dui
                cursus proin dignissim suspendisse lobortis faucibus
                pellentesque, curae integer facilisi lorem ad class condimentum
                maecenas, phasellus mus sagittis non diam taciti.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem disabled>
              <AccordionButton>
                I've come to talk with you again
              </AccordionButton>
              <AccordionPanel>
                Fringilla porta porttitor tristique praesent habitant, habitasse
                ut faucibus congue arcu nullam, metus montes duis fermentum. Cum
                faucibus turpis risus hendrerit mi volutpat laoreet, netus justo
                consectetur vivamus nunc per, dui at leo nascetur sociis taciti.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                Because a vision softly creeping
              </AccordionButton>
              <AccordionPanel>
                Integer dui nostra vehicula sit augue metus faucibus aliquam
                vulputate, curae per himenaeos erat facilisi lorem consectetur
                penatibus. Penatibus vel mattis potenti orci libero augue aenean
                posuere, adipiscing dapibus eros laoreet dui sagittis
                condimentum, ut pellentesque curae natoque aliquet velit
                integer.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </header>
    </div>
  );
}

export default App;
