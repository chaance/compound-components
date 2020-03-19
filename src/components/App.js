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
                <p>
                  And in the naked light I saw Ten thousand people, maybe more.
                  People talking without speaking, People hearing without
                  listening, People writing songs that voices never share. And
                  no one dare Disturb the sound of silence.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                I've come to talk with you again
              </AccordionButton>
              <AccordionPanel>
                <p>
                  "Fools" said I, "You do not know Silence like a cancer grows.
                  Hear my words that I might teach you. Take my arms that I
                  might reach you". But my words like silent raindrops fell And
                  echoed In the wells of silence.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                Because a vision softly creeping
              </AccordionButton>
              <AccordionPanel>
                <p>
                  And the people bowed and prayed To the neon god they made. And
                  the sign flashed out its warning In the words that it was
                  forming. And the sign said:
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                Left its seeds while I was sleeping
              </AccordionButton>
              <AccordionPanel>
                <p>
                  "The words of the prophets Are written on the subway walls And
                  tenement halls." And whisper'd in the sounds of silence.
                </p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </header>
    </div>
  );
}

export default App;
