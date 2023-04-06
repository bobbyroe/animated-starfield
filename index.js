let paused = false;
let mid = { x: 0, y: 0 };
let stars;
let starsCanvas;

function createStarfield() {
  const arr = [];
  const numStars = 400;
  const halfWidth = windowWidth * 0.5;
  const halfHeight = windowHeight * 0.5;
  for (let i = 0; i < numStars; i += 1) {
    let hue = random(360);
    let brightness = 100;
    let pos = {
      x: random(-halfWidth, halfWidth),
      y: random(-halfHeight, halfHeight),
      z: random(-1000, 100),
    };
    const maxZPos = 1000;
    const startPosZ = pos.z - 1000;
    let rate = 5;
    function _update() {
      pos.z += rate;
      if (pos.z > maxZPos) {
        pos.z = startPosZ
      }
      brightness = map(pos.z, startPosZ, maxZPos, 0, 100);
    }
    function render(c) {
      _update();
      c.push();
      c.translate(pos.x, pos.y, pos.z);
      c.fill(hue, 0, brightness);
      c.sphere(2, 6, 8);
      c.pop();
    }

    arr.push({
      render
    });
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };

  starsCanvas = createGraphics(windowWidth, windowHeight, WEBGL);
  starsCanvas.colorMode(HSB);
  starsCanvas.noStroke();
  stars = createStarfield();
}

function draw() {
  if (paused === false) {
    clear();
    starsCanvas.clear();
    stars.forEach( s => s.render(starsCanvas));
    image(starsCanvas, 0, 0);
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  return false;
}
