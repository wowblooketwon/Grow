const garden = document.getElementById('garden');
const plantBtn = document.getElementById('plantBtn');
const waterBtn = document.getElementById('waterBtn');
const waterLevelDisplay = document.getElementById('waterLevel');
const plantedCountDisplay = document.getElementById('plantedCount');
const grownCountDisplay = document.getElementById('grownCount');

let plots = [];
let waterLevel = 0;
let plantedCount = 0;
let grownCount = 0;

function updateStats() {
  waterLevelDisplay.textContent = waterLevel;
  plantedCountDisplay.textContent = plantedCount;
  grownCountDisplay.textContent = grownCount;
}

function createPlot() {
  const plot = document.createElement('div');
  plot.classList.add('plot');
  plot.addEventListener('click', () => plantSeed(plot));
  garden.appendChild(plot);
  plots.push({ element: plot, planted: false, watered: false, growth: 0 });
  plantedCount++;
  updateStats();
}

function plantSeed(plot) {
  const plotData = plots.find(p => p.element === plot);
  if (!plotData.planted && waterLevel > 0) {
    plotData.planted = true;
    plotData.watered = false;
    plotData.growth = 0;
    plot.style.backgroundColor = '#228B22';
    waterLevel--;
    updateStats();
    startGrowth(plotData);
  }
}

function waterPlants() {
  plots.forEach(plotData => {
    if (plotData.planted && !plotData.watered) {
      plotData.watered = true;
      plotData.growth = Math.min(plotData.growth + 1, 5);
      if (plotData.growth === 5) {
        plotData.element.style.backgroundColor = '#FFD700';
        grownCount++;
      }
      updateStats();
    }
  });
}

function startGrowth(plotData) {
  const growthInterval = setInterval(() => {
    if (plotData.growth < 5) {
      plotData.growth++;
      if (plotData.growth === 5) {
        plotData.element.style.backgroundColor = '#FFD700';
        grownCount++;
        clearInterval(growthInterval);
      }
      updateStats();
    }
  }, 1000);
}

plantBtn.addEventListener('click', createPlot);
waterBtn.addEventListener('click', waterPlants);
