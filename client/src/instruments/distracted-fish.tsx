import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Instrument, InstrumentProps } from '../Instruments';

// Define DrumSample type
type DrumSample = {
    midi: string; // A MIDI note like "C1", "D#1", etc.
    url: string;
};

// Define your drum samples with corresponding MIDI notes
const drumSamples: DrumSample[] = [
    { midi: 'C1', url: 'samples/kick.wav' },
    { midi: 'C#1', url: 'samples/snare.wav' },
    { midi: 'D1', url: 'samples/high_hat.wav' },
    { midi: 'D#1', url: 'samples/floor-tom.wav' },
    { midi: 'E1', url: 'samples/hi-tom.wav' },
    { midi: 'E#1', url: 'samples/mid-tom.wav' },
    { midi: 'F1', url: 'samples/ride.wav' },
    { midi: 'F#1', url: 'samples/crash.wav' },

];

// Drumkit component
const Drumkit: React.FC<InstrumentProps> = ({ state, dispatch }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [drumSampler, setDrumSampler] = useState<Tone.Sampler | null>(null);

    // Load drum samples
    useEffect(() => {
        const urls = drumSamples.reduce((acc, sample) => ({ ...acc, [sample.midi]: sample.url }), {});
        const sampler = new Tone.Sampler({ urls }).toDestination();

        Tone.loaded().then(() => {
            setDrumSampler(sampler);
        });

        // Cleanup function to dispose of the sampler
        return () => {
            sampler.dispose();
        };
    }, []);

    // Function to toggle play state
    const togglePlay = () => {
        setIsPlaying((prevState) => !prevState);
    };

    // Function to play a specific drum sample
    const playSample = (midiNote: string) => {
        if (drumSampler) {
            drumSampler.triggerAttack(midiNote);
        }
    };

    // Render buttons for each drum sample
    return (
        <div>
            <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Start'}</button>
            {drumSamples.map((sample) => (
                <button key={sample.midi} onClick={() => playSample(sample.midi)}>
                    Play {sample.midi}
                </button>
            ))}
        </div>
    );
};

export const DrumkitInstrument: Instrument = new Instrument('Drumkit', Drumkit);