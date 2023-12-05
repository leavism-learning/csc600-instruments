// 3rd party
import { List, Map } from 'immutable';

// project dependencies
// instruments
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/leavism';
import { OcarinaInstrument } from './instruments/Ocarina';
import { MegalophoneInstrument} from './instruments/zachweinstein';
import {DrumkitInstrument} from "./instruments/distracted-fish";
// visualizers
import { WaveformVisualizer } from './visualizers/Waveform';
import { CircleVisualizer } from './visualizers/leavism';
import { ShapeVisualizer } from './visualizers/Shapes';
import { TubeVisualizer } from './visualizers/leavism-tube';
import { SpiralVisualizer} from "./visualizers/distracted-fish";
import { MatrixVisualizer } from './visualizers/zachweinstein';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>; // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, GuitarInstrument,DrumkitInstrument, OcarinaInstrument, MegalophoneInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([
	WaveformVisualizer,
	CircleVisualizer,
	ShapeVisualizer,
	TubeVisualizer,
	SpiralVisualizer,
	MatrixVisualizer
]); // similar to Visualizer[]



/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
	instruments: instruments,
	visualizers: visualizers,
});
