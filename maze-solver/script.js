const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const solveBtn = document.getElementById('solve-btn');
const resetBtn = document.getElementById('reset-btn');

const size = 400;
const rows = 20;
const cols = 20;
const cellSize = size / rows;

let grid = [];
let stack = [];
let player = { r: 0, c: 0 };
let gameCompleted = false;
let isSolving = false;

canvas.width = size;
canvas.height = size;

class Cell {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
    this.visited = false;    // For generation
    this.userTrail = false;  // For user path highlighting
    this.aiPath = false;    // For AI path highlighting
  }

  show() {
    let x = this.c * cellSize;
    let y = this.r * cellSize;

    // Highlight user breadcrumbs
    if (this.userTrail) {
      ctx.fillStyle = "rgba(241, 196, 15, 0.2)";
      ctx.fillRect(x, y, cellSize, cellSize);
    }

    // Highlight AI shortest path
    if (this.aiPath) {
      ctx.fillStyle = "rgba(52, 152, 219, 0.5)";
      ctx.fillRect(x + cellSize / 4, y + cellSize / 4, cellSize / 2, cellSize / 2);
    }

    ctx.strokeStyle = "#4ecca3";
    ctx.lineWidth = 2;

    if (this.walls[0]) drawLine(x, y, x + cellSize, y);
    if (this.walls[1]) drawLine(x + cellSize, y, x + cellSize, y + cellSize);
    if (this.walls[2]) drawLine(x + cellSize, y + cellSize, x, y + cellSize);
    if (this.walls[3]) drawLine(x, y + cellSize, x, y);
  }
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

function index(r, c) {
  if (r < 0 || c < 0 || r >= rows || c >= cols) return -1;
  return c + r * cols;
}

// --- MAZE GENERATION ---
function generateMaze() {
  grid = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.push(new Cell(r, c));
    }
  }

  let current = grid[0];
  current.visited = true;
  let finished = false;

  while (!finished) {
    let next = getNeighbor(current);
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      finished = true;
    }
  }
}

function getNeighbor(cell) {
  let neighbors = [];
  let { r, c } = cell;
  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  dirs.forEach(d => {
    let neighbor = grid[index(r + d[0], c + d[1])];
    if (neighbor && !neighbor.visited) neighbors.push(neighbor);
  });

  return neighbors.length > 0 ? neighbors[Math.floor(Math.random() * neighbors.length)] : undefined;
}

function removeWalls(a, b) {
  let x = a.c - b.c;
  if (x === 1) { a.walls[3] = false; b.walls[1] = false; }
  else if (x === -1) { a.walls[1] = false; b.walls[3] = false; }
  let y = a.r - b.r;
  if (y === 1) { a.walls[0] = false; b.walls[2] = false; }
  else if (y === -1) { a.walls[2] = false; b.walls[0] = false; }
}

// --- RENDERING ---
function draw() {
  ctx.fillStyle = "#16213e";
  ctx.fillRect(0, 0, size, size);
  grid.forEach(cell => cell.show());

  // Goal
  ctx.fillStyle = "#e94560";
  ctx.fillRect((cols - 1) * cellSize + 5, (rows - 1) * cellSize + 5, cellSize - 10, cellSize - 10);

  // Player
  ctx.fillStyle = "#f1c40f";
  ctx.beginPath();
  ctx.arc(player.c * cellSize + cellSize / 2, player.r * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
  ctx.fill();
}

// --- USER INTERACTION ---
function movePlayer(key) {
  if (gameCompleted || isSolving) return;

  let currentCell = grid[index(player.r, player.c)];
  currentCell.userTrail = true; // Mark highlight

  if (key === "ArrowUp" && !currentCell.walls[0]) player.r--;
  if (key === "ArrowRight" && !currentCell.walls[1]) player.c++;
  if (key === "ArrowDown" && !currentCell.walls[2]) player.r++;
  if (key === "ArrowLeft" && !currentCell.walls[3]) player.c--;

  draw();
  if (player.r === rows - 1 && player.c === cols - 1) {
    gameCompleted = true;
    setTimeout(() => alert("Victory!"), 100);
  }
}

// --- AI SOLVER (BFS) ---


async function solveAI() {
  if (isSolving || gameCompleted) return;
  isSolving = true;

  let queue = [{ cell: grid[0], path: [] }];
  let visited = new Set();
  let finalPath = [];

  while (queue.length > 0) {
    let { cell, path } = queue.shift();
    if (cell === grid[grid.length - 1]) {
      finalPath = path;
      break;
    }
    if (visited.has(cell)) continue;
    visited.add(cell);

    let neighbors = [
      { n: grid[index(cell.r - 1, cell.c)], w: 0 },
      { n: grid[index(cell.r, cell.c + 1)], w: 1 },
      { n: grid[index(cell.r + 1, cell.c)], w: 2 },
      { n: grid[index(cell.r, cell.c - 1)], w: 3 }
    ];

    for (let { n, w } of neighbors) {
      if (n && !cell.walls[w]) {
        queue.push({ cell: n, path: [...path, n] });
      }
    }
  }

  for (let node of finalPath) {
    node.aiPath = true; // Set highlight
    player.r = node.r;
    player.c = node.c;
    draw();
    await new Promise(r => setTimeout(r, 40));
  }
  isSolving = false;
}

function init() {
  player = { r: 0, c: 0 };
  gameCompleted = false;
  isSolving = false;
  generateMaze();
  draw();
}

window.addEventListener("keydown", (e) => {
  if (e.key.includes("Arrow")) { e.preventDefault(); movePlayer(e.key); }
});

resetBtn.addEventListener('click', init);
solveBtn.addEventListener('click', solveAI);
init();