// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const ShapeVisualizer = new Visualizer(
    'ShapeCycle',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth
      const height = window.innerHeight / 2
      let startX = -40
      let centerY = height / 2
  
      const values = analyzer.getValue()
  
      // Cycle through hexagons, triangles, and squares
      const shapes = ['triangle', 'square', 'pentagon', 'hexagon']
      const currentShape = shapes[Math.floor(p5.frameCount / 60) % shapes.length]

      let intensity1 = 100
      let intensity2 = 200
      let gradient1 = (p5.frameCount % intensity1 * 2) - (255 - intensity1)
      gradient1 = gradient1<intensity1 ? gradient1 : intensity1 - (gradient1 - intensity1)
      let gradient2 = ((p5.frameCount +150) % intensity2 * 2) - (255 - intensity2)
      gradient2 = gradient2<intensity2 ? gradient2 : intensity2 - (gradient2 - intensity2)

      // Change background color with a gradient from the current color to black
      const bgColor = p5.color(gradient1, 100, gradient2);
      p5.background(bgColor);

      let intensity3 = 255
      let intensity4 = 255
      let gradient3 = (p5.frameCount % intensity3 * 2) - (255 - intensity3)
      gradient3 = gradient3<intensity3 ? gradient3 : intensity3 - (gradient3 - intensity3)
      let gradient4 = ((p5.frameCount +150) % intensity4 * 2) - (255 - intensity4)
      gradient4 = gradient4<intensity4 ? gradient4 : intensity4 - (gradient4 - intensity4)

      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number
        const shapeSize = 50 + ((amplitude * 12) * 20 )// Scaling factor for amplitude
        startX = startX + 15
        // Draw different shapes based on the current shape
        p5.stroke(gradient4, (amplitude*100) % 255, gradient3);
        p5.strokeWeight(2);
        p5.noFill();
        if (currentShape === 'triangle') {
            drawTriangle(startX, centerY, shapeSize, p5);
        } else if (currentShape === 'square') {
            drawSquare(startX, centerY, shapeSize, p5);
        } else if (currentShape === 'hexagon' ) {
            drawHexagon(startX, centerY, shapeSize, p5);
        } else if (currentShape === 'pentagon') {
            drawPentagon(startX, centerY, shapeSize, p5)
        }
      }
    }
  );
  
  // Helper functions to draw different shapes
  function drawTriangle(x: number, y: number, size: number , p5: P5) {
    // size = 50 + (size * 20)
    const triangleHeight = (Math.sqrt(3) / 2) * size;
    p5.beginShape();
    p5.vertex(x - size / 2, y + triangleHeight / 2);
    p5.vertex(x + size / 2, y + triangleHeight / 2);
    p5.vertex(x, y - (triangleHeight / 2));
    p5.endShape(p5.CLOSE);
  }
  
  function drawSquare(x: number, y: number, size: number , p5: P5) {
    // size = 50 + (size * 20)
    p5.rectMode(p5.CENTER);
    p5.rect(x, y, size, size);
  }

  function drawPentagon(x: number, y: number, size: number, p5: P5) {
    const angleOff = -p5.PI / 10;
    p5.beginShape();
    for (let i = 0; i < 5; i++) {
      const angle = angleOff + i * (p5.TWO_PI / 5);
      const pentagonX = x + size * p5.cos(angle);
      const pentagonY = y + size * p5.sin(angle);
      p5.vertex(pentagonX, pentagonY);
    }
    p5.endShape(p5.CLOSE);
  }

  function drawHexagon(x: number, y: number, size: number , p5: P5) {
    // size = 50 + (size * 20)
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = p5.TWO_PI / 6 * i;
      const hexagonX = x + size * p5.cos(angle);
      const hexagonY = y + size * p5.sin(angle);
      p5.vertex(hexagonX, hexagonY);
    }
    p5.endShape(p5.CLOSE);
  }