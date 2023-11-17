import React, { useState, useCallback, useEffect } from 'react';
import * as Tone from 'tone';
import { Instrument, InstrumentProps } from '../Instruments';

// Define DrumSample type
type DrumSample = {
    name: string;
    url: string;
};

//  drumkit state and logic
function useDrumkit(samples: DrumSample[]) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [drumSampler, setDrumSampler] = useState<Tone.Sampler | null>(null);

    // Load drum samples
    const loadDrumSamples = useCallback(() => {
        const urls = samples.reduce((acc, sample) => ({ ...acc, [sample.name]: sample.url }), {});
        const sampler = new Tone.Sampler({ urls }).toDestination();
        setDrumSampler(sampler);
    }, [samples]);

    // Function to toggle play state
    const togglePlay = useCallback(() => {
        setIsPlaying(prevState => !prevState);
    }, []);

    // Play a specific drum sample
    const playSample = useCallback((sampleName: string) => {
        if (drumSampler) {
            drumSampler.triggerAttack(sampleName);
        }
    }, [drumSampler]);

    return { isPlaying, togglePlay, playSample, loadDrumSamples };
}

// Drumkit component
const Drumkit: React.FC<InstrumentProps> = ({ state, dispatch }) => {
    const drumSamples: DrumSample[] = [
        { name: 'Kick', url: '/sounds/kick.wav' },
        { name: 'Snare', url: '/sounds/snare.wav' },
        // More samples...
    ];

    const { isPlaying, togglePlay, playSample, loadDrumSamples } = useDrumkit(drumSamples);

    useEffect(() => {
        loadDrumSamples();
    }, [loadDrumSamples]);

    return (
        <div>
            <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Start'}</button>
            {drumSamples.map(sample => (
                <button key={sample.name} onClick={() => playSample(sample.name)}>
                    {sample.name}
                </button>
            ))}
        </div>
    );
};
export const DrumkitInstrument: Instrument = new Instrument('Drumkit', Drumkit);
//export default Drumkit;