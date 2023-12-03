import * as Tone from 'tone';
import { Range } from 'immutable';
import { Instrument, InstrumentProps } from '../Instruments';

interface GuitarStringProps {
	string: number; // 0 - 5, where 0 is high E string
	fret: number; // 0 - 22, where 0 is open
	synth: Tone.Synth;
}

/**
 * Renders a single guitar string and its frets as interactive elements.
 * @param {GuitarStringProps} GuitarStringProps - The props for the GuitarString component.
 * @param {number} GuitarStringProps.string - The number of the guitar string (0-5, where 0 is the high E string).
 * @param {number} GuitarStringProps.fret - The number of frets on the guitar string.
 * @param {Tone.Synth} GuitarStringProps.synth - The synthesizer instance used to play the notes.
 * @returns {JSX.Element} - A JSX element representing the guitar string and its frets.
 */
function GuitarString({
	string: stringNumber,
	fret: fretCount,
	synth,
}: GuitarStringProps): JSX.Element {
	const fretsWithNoNumbers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
	const calculateFretWidth = (fretNumber: number) => {
		const maxWidth = 70;
		const minWidth = 30;
		const widthDecrement = (maxWidth - minWidth) / fretCount;
		return maxWidth - widthDecrement * fretNumber;
	};

	return (
		<div className='guitar-string'>
			{Range(0, fretCount).map((fretNumber) => (
				<div
					key={fretNumber}
					className='guitar-fret'
					style={{ width: `${calculateFretWidth(fretNumber)}px` }}
					onMouseDown={() =>
						synth.triggerAttack(fretToNote(stringNumber, fretNumber))
					}
					onMouseUp={() => synth.triggerRelease()}
				>
					{fretsWithNoNumbers.includes(fretNumber) ? '' : fretNumber}
				</div>
			))}
		</div>
	);
}

/**
 * Get the note that plays on a guitar given the fret and string.
 *
 * @param {number} string The string (0 - 5) number, where 0 is high E string.
 * @param {number} fret The fret number (0 - 22), where 0 is open string.
 *
 * @returns {string} The note to be played.
 */
function fretToNote(string: number, fret: number): string {
	const openStrings = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']; // Standard tuning
	const notes = [
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'A#',
		'B',
	];

	// Get index of open note
	const openNote = openStrings[string - 1];
	const openNoteIndex = notes.indexOf(openNote.slice(0, -1));

	// Calculate fret of the note, which wraps around the notes array
	// if the fret number exceeds 12.
	const frettedNoteIndex = (openNoteIndex + fret) % 12;

	// Handle octave change every 12 frets
	const octaveChange = Math.floor((openNoteIndex + fret) / 12);
	const frettedOctave = parseInt(openNote.slice(-1)) + octaveChange; // get the octave from the openNote and adjust

	return notes[frettedNoteIndex] + frettedOctave;
}
/**
 * Represents the complete guitar fretboard with all its strings.
 *
 * @param {InstrumentProps} InstrumentProps - The props for the Guitar component.
 * @param {Tone.Synth} InstrumentProps.synth - The synthesizer instance used to play the notes.
 * @param {Function} InstrumentProps.setSynth - The function to update the synth instance if needed.
 *
 * @returns {JSX.Element} - A JSX element representing the guitar fretboard with all strings and frets.
 */
// TODO: Unused setsynth from instrumentProps. May need it later.
function Guitar({ synth, setSynth }: InstrumentProps) {
	const fretCount = 22;
	const stringCount = 6;
	return (
		<div className='guitar'>
			{Range(0, stringCount).map((stringNumber) => {
				return (
					<GuitarString
						key={stringNumber}
						string={stringNumber + 1}
						fret={fretCount + 1}
						synth={synth}
					/>
				);
			})}
		</div>
	);
}

export const GuitarInstrument = new Instrument('Guitar', Guitar);
