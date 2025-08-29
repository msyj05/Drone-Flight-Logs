document.addEventListener('DOMContentLoaded', function() {
    const logsBody = document.getElementById('logsBody');
    loadLogs();

    function loadLogs() {
        const logs = JSON.parse(localStorage.getItem('droneLogs')) || [];
        if (logs.length === 0) {
            logsBody.innerHTML = '<tr><td colspan="10" class="no-logs">No logs recorded yet</td></tr>';
            return;
        }
        logsBody.innerHTML = '';
        logs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Pilot">${log.pilotName || ''}</td>
                <td data-label="Date">${formatDate(log.date)}</td>
                <td data-label="Reporting/Location">
                    <div><strong>Time:</strong> ${log.reportingTime || ''}</div>
                    <div><strong>Location:</strong> ${log.location || ''}</div>
                </td>
                <td data-label="Start">${log.startTime || ''}</td>
                <td data-label="End">${log.endTime || ''}</td>
                <td data-label="Battery">
                    <div><strong>Initial %:</strong> ${log.initialBattery || ''}%</div>
                    <div><strong>Final %:</strong> ${log.finalBattery || ''}%</div>
                    <div><strong>Initial V:</strong> ${log.initialBatteryVoltage || ''}V</div>
                    <div><strong>Final V:</strong> ${log.finalBatteryVoltage || ''}V</div>
                    <div><strong>Cycles:</strong> ${log.batteryCycleCount || ''}</div>
                </td>
                <td data-label="Temperature">
                    <div><strong>Initial:</strong> ${log.initialTemperature || ''}°</div>
                    <div><strong>Final:</strong> ${log.finalTemperature || ''}°</div>
                </td>
                <td data-label="Leaving Time">${log.leavingTime || ''}</td>
                <td data-label="Drone SN">${log.droneSerial || ''}</td>
                <td data-label="Battery SN">${log.batterySerial || ''}</td>
            `;
            logsBody.appendChild(row);
        });
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});