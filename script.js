let energy = 0;
let materials = 0;
let techPoints = 0;
let planetaryResources = 0;

let basicCollectors = 0;
let advancedCollectors = 0;
let energyDrones = 0;

let basicCollectorCost = 10;
let advancedCollectorCostEnergy = 100;
let advancedCollectorCostMaterials = 20;
let droneCostEnergy = 1000;
let droneCostMaterials = 100;
let droneCostTech = 10;

let energyPerClick = 1;
let basicEnergyPerSecond = 1;
let advancedEnergyPerSecond = 10;
let droneEnergyPerSecond = 50;

let defenseLevel = 0;
let defenseCostEnergy = 200;
let defenseCostTech = 10;

let techLevel = 0;
let techCostEnergy = 200;
let techCostTech = 50;

let planetsColonized = 0;
let planetColonizationCostEnergy = 5000;
let planetColonizationCostMaterials = 500;

const energyDisplay = document.getElementById('energy-count');
const materialDisplay = document.getElementById('material-count');
const techDisplay = document.getElementById('tech-count');
const planetResourceDisplay = document.getElementById('planet-resource-count');
const basicCountDisplay = document.getElementById('basic-auto-count');
const advancedCountDisplay = document.getElementById('advanced-auto-count');
const droneCountDisplay = document.getElementById('drone-count');
const planetCountDisplay = document.getElementById('planet-count');
const defenseLevelDisplay = document.getElementById('defense-level');
const techLevelDisplay = document.getElementById('tech-level');
const disasterLog = document.getElementById('disaster-log');
const objectiveList = document.getElementById('objective-list');

// Disaster impact probabilities
const disasters = [
    {
        name: "Solar Flare",
        impact: () => { energy -= Math.floor(energy * 0.1); },
        message: "A solar flare has reduced your energy by 10%!"
    },
    {
        name: "Asteroid Collision",
        impact: () => { materials -= Math.floor(materials * 0.2); },
        message: "An asteroid collision has reduced your materials by 20%!"
    },
    {
        name: "Space Pirates",
        impact: () => { energy -= 50; },
        message: "Space pirates have stolen 50 energy!"
    },
    {
        name: "Planetary Drought",
        impact: () => { planetaryResources -= Math.floor(planetaryResources * 0.15); },
        message: "A planetary drought has dried up 15% of your planetary resources!"
    }
];

// Randomly trigger a disaster
function triggerDisaster() {
    const randomDisaster = disasters[Math.floor(Math.random() * disasters.length)];
    randomDisaster.impact();
    disasterLog.textContent = randomDisaster.message;
    updateDisplay();
}

// Update resource display
function updateDisplay() {
    energyDisplay.textContent = energy < 0 ? 0 : energy;
    materialDisplay.textContent = materials < 0 ? 0 : materials;
    techDisplay.textContent = techPoints;
    planetResourceDisplay.textContent = planetaryResources < 0 ? 0 : planetaryResources;
    basicCountDisplay.textContent = basicCollectors;
    advancedCountDisplay.textContent = advancedCollectors;
    droneCountDisplay.textContent = energyDrones;
    planetCountDisplay.textContent = planetsColonized;
    defenseLevelDisplay.textContent = defenseLevel;
    techLevelDisplay.textContent = techLevel;
}

// Check objectives
function checkObjectives() {
    if (energy >= 50) {
        completeObjective("Collect 50 Stellar Energy");
    }
    if (basicCollectors >= 1) {
        completeObjective("Build 1 Basic Solar Collector");
    }
    if (techLevel >= 1) {
        completeObjective("Research Advanced Tech");
    }
}

// Complete objective
function completeObjective(objective) {
    const listItems = document.querySelectorAll('#objective-list li');
    listItems.forEach((item) => {
        if (item.textContent === objective) {
            item.style.textDecoration = "line-through";
            item.style.color = "gray";
        }
    });
}

// Gather energy on click
document.getElementById('click-button').addEventListener('click', function() {
    energy += energyPerClick;
    checkObjectives();
    updateDisplay();
});

// Buy Basic Solar Collector
document.getElementById('basic-auto-button').addEventListener('click', function() {
    if (energy >= basicCollectorCost) {
        energy -= basicCollectorCost;
        basicCollectors++;
        basicCollectorCost = Math.floor(basicCollectorCost * 1.5);
        document.getElementById('basic-auto-button').textContent = `Buy Basic Solar Collector (Cost: ${basicCollectorCost} Energy)`;
        updateDisplay();
        checkObjectives();
    }
});

// Buy Advanced Solar Array
document.getElementById('advanced-auto-button').addEventListener('click', function() {
    if (energy >= advancedCollectorCostEnergy && materials >= advancedCollectorCostMaterials) {
        energy -= advancedCollectorCostEnergy;
        materials -= advancedCollectorCostMaterials;
        advancedCollectors++;
        advancedCollectorCostEnergy = Math.floor(advancedCollectorCostEnergy * 2);
        advancedCollectorCostMaterials = Math.floor(advancedCollectorCostMaterials * 2);
        document.getElementById('advanced-auto-button').textContent = `Buy Advanced Solar Array (Cost: ${advancedCollectorCostEnergy} Energy, ${advancedCollectorCostMaterials} Materials)`;
        updateDisplay();
    }
});

// Buy Energy Harvesting Drone
document.getElementById('drone-button').addEventListener('click', function() {
    if (energy >= droneCostEnergy && materials >= droneCostMaterials && techPoints >= droneCostTech) {
        energy -= droneCostEnergy;
        materials -= droneCostMaterials;
        techPoints -= droneCostTech;
        energyDrones++;
        droneCostEnergy = Math.floor(droneCostEnergy * 2.5);
        droneCostMaterials = Math.floor(droneCostMaterials * 2.5);
        droneCostTech = Math.floor(droneCostTech * 1.8);
        document.getElementById('drone-button').textContent = `Buy Energy Harvesting Drone (Cost: ${droneCostEnergy} Energy, ${droneCostMaterials} Materials, ${droneCostTech} Tech Points)`;
        updateDisplay();
    }
});

// Colonize New Planet
document.getElementById('colonize-button').addEventListener('click', function() {
    if (energy >= planetColonizationCostEnergy && materials >= planetColonizationCostMaterials) {
        energy -= planetColonizationCostEnergy;
        materials -= planetColonizationCostMaterials;
        planetsColonized++;
        planetColonizationCostEnergy = Math.floor(planetColonizationCostEnergy * 3);
        planetColonizationCostMaterials = Math.floor(planetColonizationCostMaterials * 2.8);
        document.getElementById('colonize-button').textContent = `Colonize New Planet (Cost: ${planetColonizationCostEnergy} Energy, ${planetColonizationCostMaterials} Materials)`;
        planetaryResources += 100; // Each planet provides unique resources
        updateDisplay();
    }
});

// Research Advanced Tech
document.getElementById('tech-button').addEventListener('click', function() {
    if (energy >= techCostEnergy && techPoints >= techCostTech) {
        energy -= techCostEnergy;
        techPoints -= techCostTech;
        techLevel++;
        techCostEnergy = Math.floor(techCostEnergy * 2.2);
        techCostTech = Math.floor(techCostTech * 2);
        document.getElementById('tech-button').textContent = `Research Advanced Tech (Cost: ${techCostEnergy} Energy, ${techCostTech} Tech Points)`;
        updateDisplay();
        checkObjectives();
    }
});

// Research Defense Tech
document.getElementById('defense-tech-button').addEventListener('click', function() {
    if (energy >= defenseCostEnergy && techPoints >= defenseCostTech) {
        energy -= defenseCostEnergy;
        techPoints -= defenseCostTech;
        defenseLevel++;
        defenseCostEnergy = Math.floor(defenseCostEnergy * 2);
        defenseCostTech = Math.floor(defenseCostTech * 1.8);
        document.getElementById('defense-tech-button').textContent = `Research Defense Tech (Cost: ${defenseCostEnergy} Energy, ${defenseCostTech} Tech Points)`;
        updateDisplay();
    }
});

// Auto-generate energy from collectors
function autoCollectEnergy() {
    energy += basicCollectors * basicEnergyPerSecond;
    energy += advancedCollectors * advancedEnergyPerSecond;
    energy += energyDrones * droneEnergyPerSecond;
    materials += basicCollectors * 0.5; // Collect small amounts of materials with energy
    updateDisplay();
}

// Call auto-collect every second
setInterval(autoCollectEnergy, 1000);

document.getElementById('colonize-button').addEventListener('click', function() {
    if (energy >= planetColonizationCostEnergy && materials >= planetColonizationCostMaterials) {
        energy -= planetColonizationCostEnergy;
        materials -= planetColonizationCostMaterials;
        planetsColonized++;
        planetColonizationCostEnergy = Math.floor(planetColonizationCostEnergy * 3);
        planetColonizationCostMaterials = Math.floor(planetColonizationCostMaterials * 2.8);
        document.getElementById('colonize-button').textContent = `Colonize New Planet (Cost: ${planetColonizationCostEnergy} Energy, ${planetColonizationCostMaterials} Materials)`;
        planetaryResources += 100; // Each planet provides unique resources

        // Award Tech Points every 5 planets colonized
        if (planetsColonized % 5 === 0) {
            techPoints += 10;  // Reward 50 Tech Points (you can adjust the reward amount)
            document.getElementById('tech-count').textContent = techPoints;  // Update Tech Points display
            console.log(`Congrats! You've colonized ${planetsColonized} planets and gained 50 Tech Points.`);
        }

        updateDisplay();
    }
});


// Random disaster every 20 seconds
setInterval(triggerDisaster, 20000);

// Milestones: Unlocking story elements as the player progresses
function checkMilestones() {
    if (energy >= 100 && techPoints >= 5 && planetsColonized === 0) {
        planetsColonized++;
        document.getElementById('story-content').textContent = "You have enough resources to colonize your first planet! Begin expanding your interstellar empire!";
    }
    if (planetsColonized >= 1 && techLevel >= 1) {
        document.getElementById('story-content').textContent = "With new technology and planetary resources, your civilization expands further into the cosmos.";
    }
}

// Initial update of display
updateDisplay();
