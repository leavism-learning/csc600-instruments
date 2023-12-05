import * as Tone from 'tone';
import React, { useEffect } from 'react';
import { Instrument, InstrumentProps } from '../Instruments';

function Megalophone({ synth, setSynth }: InstrumentProps){
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

    const setOscillator = () => {
		setSynth((oldSynth) => {
			oldSynth.disconnect();

            const newSynth = new Tone.Synth({
				volume: 2,
				detune: 0,
				envelope: {
					attack: 0.005,
					decay: 0.1,
					release: 0.25,
					sustain: 0.5,
				},
				oscillator: {
					type: 'sawtooth',
				},
			});

           


			return newSynth.chain(triangleSynth, squareSynth, sineSynth, sawSynth, Tone.Destination);
		});
	};

    

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

    // Style for the buttons
    const buttonStyle = {
        width: '50px',
        height: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'url("/peter.jpeg")'
    };
    // Buttons to play audio at different pitches
    return (
        <div className="flex flex-wrap justify-center">
            <button style={buttonStyle} onClick={() => playSound('C4')}>C</button>
            <button style={buttonStyle} onClick={() => playSound('C#4')}>C#</button>
            <button style={buttonStyle} onClick={() => playSound('D4')}>D</button>
            <button style={buttonStyle} onClick={() => playSound('E4')}>E</button>
            <button style={buttonStyle} onClick={() => playSound('F4')}>F</button>
            <button style={buttonStyle} onClick={() => playSound('F#4')}>F#</button>
            <button style={buttonStyle} onClick={() => playSound('G4')}>G</button>
            <button style={buttonStyle} onClick={() => playSound('G#4')}>G#</button>
            <button style={buttonStyle} onClick={() => playSound('A4')}>A</button>
            <button style={buttonStyle} onClick={() => playSound('A#4')}>A#</button>
            <button style={buttonStyle} onClick={() => playSound('B4')}>B</button>
            <button style={buttonStyle} onClick={() => playSound('C5')}>C</button>
            <button style={buttonStyle} onClick={() => playSound('C#5')}>C#</button>
            <button style={buttonStyle} onClick={() => playSound('D5')}>D</button>
            <button style={buttonStyle} onClick={() => playSound('D#5')}>D#</button>
            <button style={buttonStyle} onClick={() => playSound('E5')}>E</button>
            <button style={buttonStyle} onClick={() => playSound('F5')}>F</button>
            <button style={buttonStyle} onClick={() => playSound('G5')}>G</button>
            <button style={buttonStyle} onClick={() => playSound('G#5')}>G#</button>
            <button style={buttonStyle} onClick={() => playSound('A5')}>A</button>
            <button style={buttonStyle} onClick={() => playSound('A#5')}>A#</button>
            <button style={buttonStyle} onClick={() => playSound('B5')}>B</button>
        </div>
    );
};



export const MegalophoneInstrument = new Instrument('Megalophone', Megalophone);