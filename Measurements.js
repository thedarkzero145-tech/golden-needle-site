// Example logic for a toggleable measurement system
export const measurementState = {
    unit: 'cm', // Default to centimeters
    data: {
        shoulder: 45,
        waist: 82,
        arm: 60,
        back: 75
    },

    toggleUnit() {
        this.unit = this.unit === 'cm' ? 'inches' : 'cm';
        console.log(`Units switched to: ${this.unit}`);
        // Logic to convert values: (cm * 0.393701)
    },

    getDisplayValue(key) {
        if (this.unit === 'inches') {
            return (this.data[key] * 0.393701).toFixed(1) + ' in';
        }
        return this.data[key] + ' cm';
    }
};
