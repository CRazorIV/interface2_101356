class SpaceSensorGenerator {
    static generateTemperature() {
        // Temperatuur tussen -50 en 150 graden
        return Math.floor(Math.random() * 200) - 50;
    }

    static generateResources() {
        const resources = ["IJzererts", "Goud", "Zilver", "Platina", "Uranium", "Helium-3"];
        const numResources = Math.floor(Math.random() * 3) + 1;
        const foundResources = [];
        
        while (foundResources.length < numResources) {
            const resource = resources[Math.floor(Math.random() * resources.length)];
            if (!foundResources.includes(resource)) {
                foundResources.push(resource);
            }
        }
        
        return foundResources;
    }
}

module.exports = SpaceSensorGenerator; 