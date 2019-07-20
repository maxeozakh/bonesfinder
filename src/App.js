import React, { useState } from 'react';
import Game from './Game';

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <div id="game" className="game">
        <Game
          key={currentStep}
          currentStep={currentStep}
          nextStep={() => setCurrentStep(currentStep + 1)}
        />
      </div>
      <br />
      <div className="icons-credentials">
        Icons made by{' '}
        <a
          href="https://www.freepik.com/?__hstc=57440181.4cf6e163e9446624018a4563f604be01.1563615619306.1563615619306.1563618543520.2&__hssc=57440181.5.1563618543520&__hsfp=874393295"
          title="Freepik"
        >
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{' '}
        is licensed by{' '}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC 3.0 BY
        </a>
      </div>
    </>
  );
}

export default App;
