// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const CircleVisualizer = new Visualizer(
	'Circle',
	(p5: P5, analyzer: Tone.Analyser) => {
		const width = window.innerWidth;
		const height = window.innerHeight / 2;
		const radius = Math.min(width, height) / 3; // Base radius of the semi-circle
		const centerX = (width - radius) / 2;
		const centerY = height / 2;

		p5.background(0, 0, 0, 255);

		const values = analyzer.getValue();

		p5.stroke(255, 255, 255, 255); // Bar color
		p5.noFill();

		for (let i = 0; i < values.length; i++) {
			const amplitude = values[i] as number;
			const angle = p5.map(i, 0, values.length - 1, p5.PI, p5.TWO_PI);
			const barHeight = amplitude * 300; // Scaling factor for amplitude

			const x1 = centerX + radius * p5.cos(angle);
			const y1 = centerY + radius * p5.sin(angle);
			const x2 = centerX + (radius + barHeight) * p5.cos(angle);
			const y2 = centerY + (radius + barHeight) * p5.sin(angle);

			// stylized changes
			const xdelta = x1 - x2;

			// Draw each bar in the semi-circle
			p5.line(x1 - xdelta / 2, y1, x2 + xdelta / 2, y2);

			// Draw the reflection
			const y1Reflected = centerY - (y1 - centerY);
			const y2Reflected = centerY - (y2 - centerY);
			p5.line(x1 - xdelta / 2, y1Reflected, x2 + xdelta / 2, y2Reflected);
		}
	}
);
