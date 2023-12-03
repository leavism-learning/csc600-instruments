// 3rd party library imports
import * as Tone from 'tone';
import Sketch from 'react-p5';
import P5 from 'p5';
import React, { useEffect, useMemo, useCallback } from 'react';

type VisualizerDrawer = (p5: P5, analyzer: Tone.Analyser) => void;

interface VisualizerContainerProps {
	visualizer: Visualizer;
}

export class Visualizer {
	public readonly name: string;
	public readonly draw: VisualizerDrawer;
	public readonly mode: '2D' | '3D'; // Add this line

	constructor(name: string, draw: VisualizerDrawer, mode: '2D' | '3D' = '2D') {
		this.name = name;
		this.draw = draw;
		this.mode = mode;
	}
}

export function VisualizerContainer({ visualizer }: VisualizerContainerProps) {
	const { name, draw } = visualizer;

	const analyzer: Tone.Analyser = useMemo(
		() => new Tone.Analyser('waveform', 256),
		[]
	);

	const onResize = useCallback((p5: P5) => {
		const width = window.innerWidth;
		const height = window.innerHeight / 2;

		p5.resizeCanvas(width, height, false);
	}, []);

	useEffect(() => {
		Tone.getDestination().volume.value = -5;
		Tone.getDestination().connect(analyzer);
		return () => {
			Tone.getDestination().disconnect(analyzer);
		};
	}, [analyzer]);

	const setup = (p5: P5, canvasParentRef: Element) => {
		const width = window.innerWidth;
		const height = window.innerHeight / 2;
		if (visualizer.mode === '2D') {
			p5.createCanvas(width, height).parent(canvasParentRef);
		} else {
			p5.createCanvas(width, height, p5.WEBGL).parent(canvasParentRef);
		}
	};

	return (
		<div className={'bg-black absolute bottom-0 right-0 left-0 h-50'}>
			<div className={'z-1 absolute left-0 top-0 pa4 white f5'}>{name}</div>
			<Sketch
				setup={setup}
				draw={(p5) => draw(p5, analyzer)}
				windowResized={onResize}
			/>
		</div>
	);
}
