import * as Tone from 'tone';
import React, { useState, useEffect } from 'react';
import { Range } from 'immutable';
import { Instrument, InstrumentProps } from '../Instruments';


type OcarinaSample = {
  button: string;
  midi: string; 
  url: string;
};

// Define your ocarina samples with corresponding MIDI notes
const ocarinaSamples: OcarinaSample[] = [
  { button: '↑', midi: 'D5', url: 'ocarinaSamples/D2.wav' },
  { button: '↓', midi: 'F4', url: 'ocarinaSamples/F.wav' },
  { button: '→', midi: 'A4', url: 'ocarinaSamples/A.wav' },
  { button: '←', midi: 'B4', url: 'ocarinaSamples/B.wav' },
  { button: 'A', midi: 'D3', url: 'ocarinaSamples/D.wav' },
];



const Ocarina: React.FC<InstrumentProps> = ({ synth }) => {
  const [ocarinaSampler, setOcarinaSampler] = useState<Tone.Sampler | null>(null);

  useEffect(() => {
    const urls = ocarinaSamples.reduce((acc, sample) => ({ ...acc, [sample.midi]: sample.url }), {});
    const sampler = new Tone.Sampler({ urls }).toDestination();

    // sets sample 
    Tone.loaded().then(() => {
      setOcarinaSampler(sampler);
    });

    // discards sample
    return () => {
      sampler.dispose();
    };
  }, []);


  // plays referenced from midi note
  const playSample = (midiNote: string) => {
    if (ocarinaSampler) {
      ocarinaSampler.triggerAttack(midiNote);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Triggers sample on key press
    const holeNumber = getHoleNumber(event.key);
    if (holeNumber !== null) {
      playSample(getMidiNote(holeNumber));
    }
  };

  return (
    <div className='ocarina'
    style={{
      backgroundImage: 'url("Images/Background.png")',
      backgroundSize: 'all',
      backgroundPosition: 'center',
      position: 'relative',
    }}
    >
    <div className='button-block'
    onKeyDown={handleKeyDown}
    >
      {ocarinaSamples.map((sample) => (
        <div
          key={sample.midi}
          className={`ocarina-hole ${sample.midi}`}
          onMouseDown={() => playSample(sample.midi)}
          tabIndex={0}
          style={{
            top: 0,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '15px',
          }}
        >
          {sample.button}
        </div>
      ))}
    </div>
    </div>
  );
};


// converts between key presses and button values
function getHoleNumber(noteKey: string): number | null {
  switch (noteKey) {
    case 'ArrowUp': return 0;
    case 'ArrowDown': return 1;
    case 'ArrowLeft': return 2;
    case 'ArrowRight': return 3;
    case 'a': return 4;
    default: return null;
  }
}


// converts button values to midi values
function getMidiNote(holeNumber: number): string {
  switch (holeNumber) {
    case 0: return 'D5';
    case 1: return 'F4';
    case 2: return 'A4';
    case 3: return 'B4';
    case 4: return 'D3';
    default: return '';
  }
}


export const OcarinaInstrument: Instrument = new Instrument('Ocarina', Ocarina);
