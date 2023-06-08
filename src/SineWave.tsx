let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx: number; // Value for incrementing x
let yvalues: number[] = []; // Using an array to store height values for the wave

export let SinSetup = (p5: any, canvasParentRef: any) => {
  p5.createCanvas(window.innerWidth, window.innerHeight).parent(
    canvasParentRef
  );

  (w = window.innerWidth), +16;
  dx = ((Math.PI * 2) / period) * xspacing;
  yvalues = new Array(Math.floor(w / xspacing));
};

export let SinDraw = (p5: any) => {
  p5.background(255);

  theta += 0.02;

  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = Math.sin(x) * amplitude;
    x += dx;
  }

  p5.noStroke();
  p5.fill(0);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    p5.ellipse(x * xspacing, window.innerHeight / 4 + yvalues[x], 16, 16);

    p5.ellipse(x * xspacing, window.innerHeight / 2 + yvalues[x], 16, 16);

    p5.ellipse(x * xspacing, window.innerHeight / 2 + 100 + yvalues[x], 16, 16);
  }
};
