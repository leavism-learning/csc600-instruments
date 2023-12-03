import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

export const TubeVisualizer = new Visualizer(
	'Tube',
	(p5: P5, analyzer: Tone.Analyser) => {
		p5.orbitControl();

		const values = analyzer.getValue();
		const tunnelLength = 500; // Length of the tunnel
		const tunnelRadius = 100; // Radius of the tunnel

		p5.background(18, 9, 40, 255);
		// Define the initial camera position and the point it looks at
		let camZ = 0;
		const camX = 0;
		const camY = 0;
		const centerX = 0;
		const centerY = 0;
		const centerZ = 0;
		const upX = 0;
		const upY = 1;
		const upZ = 0;
		// Determine the frame count for 10 seconds
		const resetInterval = 6 * 60; // 10 seconds * 60 fps

		// Calculate the camera's Z position
		// Reset the position every 10 seconds
		if (p5.frameCount % resetInterval === 0) {
			camZ = 0;
		} else {
			camZ = -(p5.frameCount % resetInterval) * 2; // Adjust the multiplier for speed
		}

		// Position the camera
		p5.camera(camX, camY, camZ, centerX, centerY, centerZ, upX, upY, upZ);
		const colors = [
			p5.color(234, 31, 121), // Vibrant Pink
			p5.color(235, 157, 59), // Cyan
		];

		// Loop to create the tunnel effect
		for (let i = 0; i < values.length; i++) {
			const amplitude = values[i] as number;
			const angle = p5.map(i, 0, values.length, 0, p5.TWO_PI);
			const barHeight = amplitude * 500; // Scale amplitude to bar height
			const boxSize = 10;

			for (let z = 0; z < tunnelLength; z += 20) {
				// Z-axis (depth) of the tunnel
				const x = tunnelRadius * p5.cos(angle);
				const y = tunnelRadius * p5.sin(angle);

				const lerpAmt = p5.map(z, 0, tunnelLength, 0, 1);
				const color = p5.lerpColor(colors[0], colors[1], lerpAmt);

				p5.push();
				p5.translate(x, y, -z); // Position each bar in the tunnel
				p5.rotateY(angle); // Align bars radially
				p5.fill(color);
				p5.box(boxSize, boxSize, barHeight); // Draw bars (width, height, depth)
				p5.pop();
			}
		}
		// Camera movement simulation
		p5.translate(0, 0, p5.frameCount % tunnelLength);
	},
	'3D'
);
