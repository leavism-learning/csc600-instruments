import * as Tone from 'tone';
import { Range } from 'immutable';
import { Instrument, InstrumentProps } from '../Instruments';

interface OcarinaHoleProps {
  hole: number; // 0 - 6, where 0 is the lowest tone
  synth: Tone.Synth;
}

/**
 * Renders a single ocarina hole as an interactive element.
 * 
 * @param {OcarinaHoleProps} OcarinaHoleProps - The props for the OcarinaHole component.
 * @param {number} OcarinaHoleProps.hole - The number of the ocarina hole (0-6, where 0 is the lowest tone).
 * @param {Tone.AMSynth} OcarinaHoleProps.synth - The synthesizer instance used to play the notes.
 * @returns {JSX.Element} - A JSX element representing the ocarina hole.
 */
function OcarinaHole({ hole: holeNumber, synth }: OcarinaHoleProps): JSX.Element {
  return (
    <div
      className='ocarina-hole'
      onMouseDown={() =>
        synth.triggerAttack(`C${holeNumber + 1}`)
      }
      onMouseUp={() => synth.triggerRelease()}
      style={{
        // CSS
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
      {holeNumber}
    </div>
  );
}

/**
 * Represents the complete ocarina with all its holes.
 * 
 * @param {InstrumentProps} InstrumentProps - The props for the Ocarina component.
 * @param {Tone.AMSynth} InstrumentProps.synth - The synthesizer instance used to play the notes.
 * @returns {JSX.Element} - A JSX element representing the ocarina with all holes.
 */
function Ocarina({ synth }: InstrumentProps) {
  const holeCount = 7; 
  return (
    <div className='ocarina'>
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

export const OcarinaInstrument = new Instrument('Ocarina', Ocarina);