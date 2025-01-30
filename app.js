const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    foundResources: ["IJzererts", "Zilver"]
};

// GET /status route
app.get('/status', (req, res) => {
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
            response.message = `Voertuig beweegt ${details}`;
            break;
        case 'sensor':
            if (details && !vehicleStatus.activeSensors.includes(details)) {
                vehicleStatus.activeSensors.push(details);
                response.message = `Sensor ${details} ingeschakeld`;
            } else {
                vehicleStatus.activeSensors = vehicleStatus.activeSensors.filter(s => s !== details);
                response.message = `Sensor ${details} uitgeschakeld`;
            }
            break;
        case 'sleep':
            response.message = 'Voertuig in slaapstand gezet';
            break;
        default:
            response.success = false;
            response.message = 'Onbekende actie';
    }

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
}); 