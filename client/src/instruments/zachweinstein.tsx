import * as Tone from 'tone';
import React, { useEffect } from 'react';
import { Instrument, InstrumentProps } from '../Instruments';

const MegalophoneComponent: React.FC<InstrumentProps> = () => {
    const squareSynth = new Tone.PolySynth().toDestination();
    const sawSynth = new Tone.PolySynth().toDestination();
    const triangleSynth = new Tone.PolySynth().toDestination();
    const sineSynth = new Tone.PolySynth().toDestination();

    useEffect(() => {
        squareSynth.set({ oscillator: { type: 'square' } });
        sawSynth.set({ oscillator: { type: 'sawtooth' } });
        triangleSynth.set({ oscillator: { type: 'triangle' } });
        sineSynth.set({ oscillator: { type: 'sine' } });

        // make the sawtooth synth louder
        sawSynth.set({ volume: 5 });

        // make the sawtooth synth harsher
        sawSynth.set({ detune: 20 });

        triangleSynth.set({ volume: 10 });

        sineSynth.set({ detune: 10 });
    }, []);

    const playSound = (note: string) => {
        console.log("Playing Square Synth");
        squareSynth.triggerAttackRelease(note, '8n');

        console.log("Playing saw synth");
        sawSynth.triggerAttackRelease(note, '8n');

        console.log("Playing triangle synth");
        triangleSynth.triggerAttackRelease(note, '8n');

        console.log("Playing sine synth");
        sineSynth.triggerAttackRelease(note, '8n');
    };


    // Buttons to play audio at different pitches
    return (
        <div className="flex flex-wrap justify-center">
            <button onClick={() => playSound('C4')}>C</button>
            <button onClick={() => playSound('C#4')}>C#</button>
            <button onClick={() => playSound('D4')}>D</button>
            <button onClick={() => playSound('D#4')}>D#</button>
            <button onClick={() => playSound('E4')}>E</button>
            <button onClick={() => playSound('F4')}>F</button>
            <button onClick={() => playSound('F#4')}>F#</button>
            <button onClick={() => playSound('G4')}>G</button>
            <button onClick={() => playSound('G#4')}>G#</button>
            <button onClick={() => playSound('A4')}>A</button>
            <button onClick={() => playSound('A#4')}>A#</button>
            <button onClick={() => playSound('B4')}>B</button>
            <button onClick={() => playSound('C5')}>C</button>
            <button onClick={() => playSound('C#5')}>C#</button>
            <button onClick={() => playSound('D5')}>D</button>
            <button onClick={() => playSound('D#5')}>D#</button>
            <button onClick={() => playSound('E5')}>E</button>
            <button onClick={() => playSound('F5')}>F</button>
            <button onClick={() => playSound('G5')}>G</button>
            <button onClick={() => playSound('G#5')}>G#</button>
            <button onClick={() => playSound('A5')}>A</button>
            <button onClick={() => playSound('A#5')}>A#</button>
            <button onClick={() => playSound('B5')}>B</button>
        </div>
    );
};

export const Megalophone = new Instrument('Megalophone', MegalophoneComponent);