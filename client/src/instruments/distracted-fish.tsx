import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Instrument, InstrumentProps } from '../Instruments';

type DrumSample = {
    name: string;
    midi: string; // A MIDI note like "C1", "D#1", etc.
    url: string;
};

type DrumGridProps = {
    drumSampler: Tone.Sampler | null;
    sequence: boolean[][];
    toggleBeat: (row: number, col: number) => void;
    currentBeat: number; // new prop to indicate the current beat
};


const drumSamples: DrumSample[] = [
    { name: 'Kick' , midi: 'C1', url: 'samples/kick-drum.wav' },
    { name: 'Snare', midi: 'C#1', url: 'samples/snare.wav' },
    { name: 'High-Hat', midi: 'D1', url: 'samples/high_hat.wav' },
    { name: 'Floor-Tom', midi: 'D#1', url: 'samples/floor-tom.wav' },
    { name: 'Hi-Tom', midi: 'E1', url: 'samples/hi-tom.wav' },
    { name: 'Mid-Tom', midi: 'E#2', url: 'samples/mid-tom.wav' },
    { name: 'Ride', midi: 'F1', url: 'samples/ride.wav' },
    { name: 'Crash', midi: 'F#1', url: 'samples/crash.wav' },

];

// DrumGrid Component
const DrumGrid: React.FC<DrumGridProps> = ({ drumSampler, sequence, toggleBeat, currentBeat }) => {
    return (
        <div className="drum-grid">
            {drumSamples.map((sample, sampleIndex) => (
                <div key={sampleIndex} className="drum-row">
                    <div className="drum-label">{sample.name}</div>
                    {sequence[sampleIndex].map((beat, beatIndex) => (
                        <button
                            key={beatIndex}
                            className={`beat ${beat ? 'beat-active' : ''} ${currentBeat === beatIndex ? 'current-beat' : ''}`}
                            onClick={() => toggleBeat(sampleIndex, beatIndex)}
                        ></button>
                    ))}
                </div>
            ))}
        </div>
    );
};
// Drumkit component
const Drumkit: React.FC<InstrumentProps> = ({ state, dispatch }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [drumSampler, setDrumSampler] = useState<Tone.Sampler | null>(null);
    const [sequence, setSequence] = useState<boolean[][]>(
        new Array(drumSamples.length).fill(null).map(() => new Array(16).fill(false)) // Make sure there are 16 beats
    );
    const [currentBeat, setCurrentBeat] = useState(-1);
    const [bpm, setBpm] = useState(Tone.Transport.bpm.value); // Initialize with the current BPM value
    // Ref to keep track of Tone.Part instance
    const partRef = useRef<Tone.Part | null>(null);
    // Function to handle changes in the slider
    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBpm = Number(event.target.value);
        setBpm(newBpm);
        Tone.Transport.bpm.value = newBpm; // Set the new BPM in Tone.Transport
    };
    useEffect(() => {
        const urls = drumSamples.reduce((acc, sample) => ({ ...acc, [sample.midi]: sample.url }), {});
        const sampler = new Tone.Sampler(urls).toDestination();

        // Set up the drumSampler
        Tone.loaded().then(() => setDrumSampler(sampler));

        return () => {
            sampler.dispose();
            Tone.Transport.cancel();
        };
    }, []);

    useEffect(() => {
        if (drumSampler) {
            const events = sequence.flatMap((row, rowIndex) =>
                row.map((beat, beatIndex) => beat ? {
                    time: `0:0:${beatIndex}`, // Correctly calculate the time for each beat
                    note: drumSamples[rowIndex].midi
                } : null)
            ).filter(Boolean) as { time: string; note: string }[];

            const part = new Tone.Part((time, { note }) => {
                drumSampler.triggerAttack(note, time);
            }, events);

            part.loop = true;
            part.loopEnd = '1:0'; // End of the loop after 16 sixteenth notes
            part.start(0);

            partRef.current = part;

            // Use Tone.Draw for visual timing to ensure synchronization
            const repeatEventId = Tone.Transport.scheduleRepeat((time) => {
                // We need to schedule the update to happen at the next animation frame
                // to be in sync with the audio context.
                Tone.Draw.schedule(() => {
                    // Convert Tone.Transport.position to a string before splitting.
                    const transportTime = String(Tone.Transport.position);
                    const parts = transportTime.split(':');
                    const sixteenthCount = (parseInt(parts[0], 10) * 16 * 4) +
                        (parseInt(parts[1], 10) * 4) +
                        parseInt(parts[2], 10); // Convert to sixteenth
                    setCurrentBeat(sixteenthCount % 16);
                }, time);
            }, "16n");

            // Cleanup function to clear the scheduled repeat event
            return () => {
                Tone.Transport.clear(repeatEventId);
                if (partRef.current) {
                    partRef.current.dispose();
                }
            };
        }
    }, [sequence, drumSampler]);
    const clearSequence = () => {
        // Create a new sequence with all false (deselected) beats
        const newSequence = sequence.map(row => row.map(() => false));
        setSequence(newSequence);
    };
    const toggleBeat = (row: number, col: number) => {
        setSequence(sequence =>
            sequence.map((r, rowIndex) =>
                rowIndex === row ? r.map((beat, colIndex) => colIndex === col ? !beat : beat) : r
            )
        );
    };

    // Function to toggle play state
    const togglePlay = () => {
        setIsPlaying((prevState) => { // Fixed the function name
            const newState = !prevState;
            if (newState) {
                Tone.Transport.start();
            } else {
                Tone.Transport.stop();
            }
            return newState;
        });
    };

    // Render buttons for each drum sample
    return (
        <div className="drumkit-container">
            <button className="button-" role="button" onClick={togglePlay}>{isPlaying ? 'Stop' : 'Start'}</button>
            <button className="button-" role="button" onClick={clearSequence}>Clear</button> {/* Reset button */}
            <input
                type="range"
                min="20"
                max="240"
                value={bpm}
                onChange={handleBpmChange}
                className="bpm-slider"
            />
            <label htmlFor="bpm-slider">{bpm} bpm</label>
            <DrumGrid drumSampler={drumSampler} sequence={sequence} toggleBeat={toggleBeat} currentBeat={currentBeat} />
        </div>
    );
};

export const DrumkitInstrument: Instrument = new Instrument('Drumkit', Drumkit);
