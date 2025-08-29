document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('logForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values (including new fields)
        const logEntry = {
            pilotName: document.getElementById('pilotName').value,
            date: document.getElementById('date').value,
            location: document.getElementById('location').value,
            reportingTime: document.getElementById('reportingTime').value,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            leavingTime: document.getElementById('leavingTime').value,
            batteryCycleCount: document.getElementById('batteryCycleCount').value,
            batteryVoltage: document.getElementById('batteryVoltage').value,
            initialBattery: document.getElementById('initialBattery').value,
            finalBattery: document.getElementById('finalBattery').value,
            initialTemperature: document.getElementById('initialTemperature').value,
            finalTemperature: document.getElementById('finalTemperature').value,
            droneSerial: document.getElementById('droneSerial').value,
            batterySerial: document.getElementById('batterySerial').value
        };

        // Save log entry
        let logs = JSON.parse(localStorage.getItem('droneLogs')) || [];
        logs.push(logEntry);
        localStorage.setItem('droneLogs', JSON.stringify(logs));

        // Reset form
        form.reset();

        // Show success message
        alert('Log entry saved successfully!');
    });
});