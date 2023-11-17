import * as Tone from 'tone';
import React, { useEffect, useRef } from 'react';
import { Instrument, InstrumentProps } from '../Instruments';

const MegalophoneComponent: React.FC<InstrumentProps> = ({ synth, setSynth }) => {
    // A ref to store the player
    const playerRef = useRef<Tone.Player>();

    // Effect to load the player and audio once on component mount
    useEffect(() => {
        const player = new Tone.Player("megalovania.mp3").toDestination();
        // Can omit load if no argument is required
        player.autostart = false; // Audio should not autostart after loading
        playerRef.current = player;
    }, []);

    // Function to play the audio file with a pitch shift
    const playSound = (pitchShift: number) => {
        if (playerRef.current) {
            const player = playerRef.current;
    
            // Disconnect any existing connections
            player.disconnect();
    
            // Create a PitchShift effect and connect it to the destination
            const pitchShiftEffect = new Tone.PitchShift(pitchShift).toDestination();
            player.connect(pitchShiftEffect);
    
            // Start or restart playback from the beginning
            if (player.state === "started") {
                player.stop(); // Stop the player if it's already playing
            }
            player.start();
    
            // Schedule the disconnection after the playback duration
            Tone.Transport.scheduleOnce(time => {
                pitchShiftEffect.dispose(); // Dispose the pitch shift effect to prevent memory leaks
            }, `+${player.buffer.duration}`);
        } else {
            console.warn('Player not initialized');
        }
    };

    // Buttons to play audio at different pitches
    return (
        <div>
            <button onClick={() => playSound(-12)}>Low Pitch (-1 Octave)</button>
            <button onClick={() => playSound(0)}>Original Pitch</button>
            <button onClick={() => playSound(12)}>High Pitch (+1 Octave)</button>
        </div>
    );
};

export const Megalophone = new Instrument('Megalophone', MegalophoneComponent);