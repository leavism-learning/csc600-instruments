import * as Tone from 'tone';
import { Range } from 'immutable';
import { Instrument, InstrumentProps } from '../Instruments';

interface OcarinaHoleProps {
  hole: number; // 0 - 4, where 0 is the lowest tone
  synth: Tone.Synth;
}

function OcarinaHole({ hole: holeNumber, synth }: OcarinaHoleProps): JSX.Element {
  const noteKey = getNoteButton(holeNumber);
  return (
    <div
      className='ocarina-hole'
      onMouseDown={() =>
        synth.triggerAttack(`C${holeNumber + 3}`)
      }
      onMouseUp={() => synth.triggerRelease()}
      tabIndex={0} // Ensure the element can receive keyboard events
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
      {noteKey}
    </div>
  );
}

function Ocarina({ synth }: InstrumentProps) {
  const holeCount = 5;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Trigger attack when the key matches a hole
    const holeNumber = getHoleNumber(event.key);
    if (holeNumber !== null) {
      synth.triggerAttack(`C${holeNumber + 3}`);
    }
  };

  const handleKeyUp = () => {
    // Trigger release for all keys on keyup
    synth.triggerRelease();
  };

  return (
    <div
      className='ocarina'
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0} // Ensure the element can receive keyboard events
    >
      {Range(0, holeCount).map((holeNumber) => {
        return (
          <OcarinaHole
            key={holeNumber}
            hole={holeNumber}
            synth={synth}
          />
        );
      })}
    </div>
  );
}

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

function getNoteButton(holeNumber: number): string {
  switch (holeNumber) {
    case 0: return '↑';
    case 1: return '↓';
    case 2: return '→';
    case 3: return '←';
    case 4: return 'A';
    default: return '';
  }
}

export const OcarinaInstrument = new Instrument('Ocarina', Ocarina);