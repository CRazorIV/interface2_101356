# Space Sensor Generator

## Author
101356 Yuri 

## Description
This is a simple web application that simulates a space vehicle's sensor data. It uses a simulated sensor generator to generate temperature and resource data.

## Usage
To use this application, simply run the `app.js` file using Node.js. The application will start a server on port 3000, and you can access the interface by navigating to `http://localhost:3000` in your web browser.

## Installation

```bash
npm install space-sensor-generator
```

## Features

- Random temperature generation (-50°C to 150°C)
- Resource discovery simulation
- Easy to integrate with any Node.js project
- Realistic space exploration data simulation

## API

### generateTemperature()
Generates a random temperature between -50°C and 150°C.

**Returns**: `Number` - The generated temperature in degrees Celsius.

### generateResources()
Generates a random list of 1-3 resources.

**Returns**: `Array<String>` - An array containing resource names.

Available resources:
- Iron Ore
- Gold
- Silver
- Platinum
- Uranium
- Helium-3

## Example Usage

```javascript
const SpaceSensorGenerator = require('space-sensor-generator');

// Generate a random temperature
const temp = SpaceSensorGenerator.generateTemperature();
console.log(`Current temperature: ${temp}°C`);

// Generate a list of discovered resources
const resources = SpaceSensorGenerator.generateResources();
console.log('Discovered resources:', resources);

// Continuous monitoring example
setInterval(() => {
    const temperature = SpaceSensorGenerator.generateTemperature();
    const resources = SpaceSensorGenerator.generateResources();
    
    console.log('New measurements:');
    console.log(`Temperature: ${temperature}°C`);
    console.log('Resources:', resources);
}, 5000); // Update every 5 seconds
```

## License

MIT

## Version History

- 1.0.0
    - Initial Release
    - Temperature generation
    - Resource discovery simulation


