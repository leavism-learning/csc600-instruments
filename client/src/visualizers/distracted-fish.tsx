// SpiralVisualizer.tsx
import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

export const SpiralVisualizer = new Visualizer(
    'Spiral',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;

        p5.background(0, 0, 0, 255); // Set a black background

        const values = analyzer.getValue();
        p5.strokeWeight(2); // Set the stroke weight for the spiral lines
        p5.noFill();

        const numSpirals = 3; // Number of spirals to draw
        const maxRadius = height / 2; // Maximum radius of the spiral

        // Iterate over the number of spirals to draw
        for (let n = 0; n < numSpirals; n++) {
            // Choose a color based on the spiral number

            // Draw each spiral starting from the center
            const centerY = 2*height /5;
            const centerX = 2*width / 5;
            const color = p5.color(255 / numSpirals * n, 255*.8, 255 / numSpirals * (numSpirals - n), 255);
            p5.stroke(color);

            p5.beginShape();
            // The angle and radius are determined by the audio's frequency data
            for (let i = 0; i < values.length; i++) {
                const amplitude = values[i] as number;
                const angle = p5.map(i, 0, values.length - 1, 0, p5.TWO_PI * numSpirals);
                const radius = p5.map(amplitude, -1, 1.5, 0, maxRadius);
                const x = centerX + radius * p5.cos(angle + n * p5.PI / numSpirals);
                const y = centerY + radius * p5.sin(angle + n * p5.PI / numSpirals);
                p5.vertex(x, y);

            }

            p5.endShape();
        }
    }
);
