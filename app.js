const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Validatie helpers
const validDirections = ['vooruit', 'achteruit', 'links', 'rechts', 'forward', 'backward', 'left', 'right'];
const validSensors = ['Temperatuur', 'Camera', 'Radar', 'Infrarood'];

// Simulatie functies
const generateTemperature = () => Math.floor(Math.random() * 200) - 50;
const generateResources = () => {
    const resources = ["IJzererts", "Goud", "Zilver", "Platina"];
    return resources.slice(0, Math.floor(Math.random() * 3) + 1);
};

// Simulatie van voertuig status
let vehicleStatus = {
    batteryPercentage: 85,
    activeSensors: ["Temperatuur", "Camera"],
    foundResources: ["IJzererts", "Zilver"],
    sleepMode: false,
    temperature: generateTemperature(),
    lastMovement: null
};

// GET /status route
app.get('/status', (req, res) => {
    // Update dynamische waardes
    vehicleStatus.temperature = generateTemperature();
    vehicleStatus.foundResources = generateResources();
    res.json(vehicleStatus);
});

// POST /action route
app.post('/action', (req, res) => {
    const { action, details } = req.body;
    let response = { success: true, message: '' };

    switch(action) {
        case 'move':
            if (vehicleStatus.sleepMode) {
                response.success = false;
                response.message = 'Voertuig staat in slaapstand. Activeer eerst het voertuig.';
            } else if (!details) {
                response.success = false;
                response.message = 'Bewegingsrichting is verplicht';
            } else if (!validDirections.includes(details.toLowerCase())) {
                response.success = false;
                response.message = 'Ongeldige bewegingsrichting. Gebruik: vooruit, achteruit, links, rechts';
            } else {
                vehicleStatus.lastMovement = details;
                response.message = `Voertuig beweegt ${details}`;
            }
            break;

        case 'sensor':
            if (vehicleStatus.sleepMode) {
                response.success = false;
                response.message = 'Voertuig staat in slaapstand. Activeer eerst het voertuig.';
            } else if (!details) {
                response.success = false;
                response.message = 'Sensornaam is verplicht';
            } else if (!validSensors.includes(details)) {
                response.success = false;
                response.message = 'Ongeldige sensor. Beschikbare sensoren: ' + validSensors.join(', ');
            } else {
                const sensorExists = vehicleStatus.activeSensors.includes(details);
                if (sensorExists) {
                    vehicleStatus.activeSensors = vehicleStatus.activeSensors.filter(s => s !== details);
                    response.message = `Sensor ${details} uitgeschakeld`;
                } else {
                    vehicleStatus.activeSensors.push(details);
                    response.message = `Sensor ${details} ingeschakeld`;
                }
            }
            break;

        case 'sleep':
            if (details === 'activate') {
                vehicleStatus.sleepMode = false;
                response.message = 'Voertuig geactiveerd';
            } else if (details === 'deactivate') {
                vehicleStatus.sleepMode = true;
                response.message = 'Voertuig in slaapstand gezet';
                vehicleStatus.activeSensors = [];
            } else {
                response.success = false;
                response.message = 'Ongeldige sleep mode optie';
            }
            break;

        default:
            response.success = false;
            response.message = 'Onbekende actie';
    }

    // Stuur de geüpdatete status mee
    response.vehicleStatus = vehicleStatus;
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});