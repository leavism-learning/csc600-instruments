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
    const notes = ['C4', 'C#4', 'D4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'G5', 'G#5', 'A5', 'A#5', 'B5'];
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    // Function to find the color in the rainbow for the button
    const noteColor = (index: number) => colors[index % colors.length];

    return (
        <div className="flex flex-wrap justify-center">
            {notes.map((note, index) => (
                <button
                    key={note}
                    style={{ 
                        width: '50px',
                        height: '50px',
                        backgroundColor: noteColor(index),
                        color: 'white', // Ensure text is visible on the buttons, you can use black if it's better
                        margin: '5px', // Add some spacing between buttons
                        border: 'none', // Remove default button border
                        borderRadius: '5px', // Optional: round button corners
                    }}
                    onClick={() => playSound(note)}
                >
                    {note}
                </button>
            ))}
        </div>
    );
};



export const MegalophoneInstrument = new Instrument('Megalophone', Megalophone);