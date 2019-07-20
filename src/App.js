import React, { useState } from 'react';
import Game from './Game';

function App() {
  const [currentStep, setCurrentStep] = useState(17);

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
        <a href="https://www.freepik.com/" title="Freepik">
          Freepik
        </a>{' '}
        and{' '}
        <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">
          Eucalyp
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
