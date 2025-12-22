const towers = document.querySelectorAll('.tower');
const moveDisplay = document.getElementById('move-count');
const resetBtn = document.getElementById('reset-btn');

let selectedTower = null;
let moves = 0;
const totalDisks = 5;

// Initialize Game
function init() {
  moves = 0;
  moveDisplay.innerText = moves;
  selectedTower = null;

  towers.forEach(t => {
    t.innerHTML = '';
    t.classList.remove('selected');
  });

  // Create and add disks to the first tower
  for (let i = totalDisks; i >= 1; i--) {
    const disk = document.createElement('div');
    disk.classList.add('disk', `disk-${i}`);
    disk.dataset.size = i;
    document.getElementById('tower-1').appendChild(disk);
  }
}

function handleTowerClick(e) {
  const tower = e.currentTarget;

  if (selectedTower === null) {
    // Step 1: Picking up a disk
    if (tower.lastElementChild) {
      selectedTower = tower;
      tower.classList.add('selected');
    }
  } else {
    // Step 2: Dropping a disk
    const diskToMove = selectedTower.lastElementChild;
    const topDiskOnTarget = tower.lastElementChild;

    if (!topDiskOnTarget || parseInt(diskToMove.dataset.size) < parseInt(topDiskOnTarget.dataset.size)) {
      // Valid Move
      tower.appendChild(diskToMove);
      moves++;
      moveDisplay.innerText = moves;
      checkWin();
    } else if (selectedTower === tower) {
      // Deselect if clicking the same tower
    } else {
      alert("Invalid Move! You cannot place a larger disk on a smaller one.");
    }

    selectedTower.classList.remove('selected');
    selectedTower = null;
  }
}

function checkWin() {
  const tower3 = document.getElementById('tower-3');
  if (tower3.childElementCount === totalDisks) {
    setTimeout(() => alert(`Congratulations! You solved it in ${moves} moves!`), 100);
  }
}

towers.forEach(tower => tower.addEventListener('click', handleTowerClick));
resetBtn.addEventListener('click', init);

init();

const solveBtn = document.getElementById('solve-btn');
let isSolving = false;

// Helper to create a delay so we can see the disks move
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function moveDisk(fromTowerIndex, toTowerIndex) {
  const fromTower = towers[fromTowerIndex];
  const toTower = towers[toTowerIndex];
  const disk = fromTower.lastElementChild;

  toTower.appendChild(disk);
  moves++;
  moveDisplay.innerText = moves;
  await sleep(500); // 0.5 second delay between moves
}

/**
 * The Recursive Logic:
 * n: number of disks
 * from: starting tower
 * to: target tower
 * aux: intermediate/buffer tower
 */
async function solveHanoi(n, from, to, aux) {
  if (!isSolving) return; // Stop if user resets
  if (n === 1) {
    await moveDisk(from, to);
    return;
  }
  // Move n-1 disks from 'from' to 'aux'
  await solveHanoi(n - 1, from, aux, to);
  // Move the nth disk from 'from' to 'to'
  await moveDisk(from, to);
  // Move n-1 disks from 'aux' to 'to'
  await solveHanoi(n - 1, aux, to, from);
}

solveBtn.addEventListener('click', async () => {
  if (isSolving) return;

  init(); // Reset board first
  isSolving = true;
  solveBtn.disabled = true;

  // Start recursion: Move 5 disks from Tower 0 to Tower 2 using Tower 1 as buffer
  await solveHanoi(totalDisks, 0, 2, 1);

  isSolving = false;
  solveBtn.disabled = false;
  alert("Algorithm finished!");
});