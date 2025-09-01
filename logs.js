document.addEventListener('DOMContentLoaded', function() {
    const logsContainer = document.getElementById('logsContainer');
    let logs = JSON.parse(localStorage.getItem('droneLogs')) || [];

    // Load logs on page load
    loadLogs();

    function loadLogs() {
        renderLogs();
    }

    function renderLogs() {
        logsContainer.innerHTML = '';

        if (logs.length === 0) {
            logsContainer.innerHTML = '<div class="no-logs">No logs recorded yet</div>';
            return;
        }

        logs.forEach(log => {
            const card = document.createElement('div');
            card.className = 'log-card';
            card.innerHTML = `
                <div class="log-summary">
                    <div class="summary-info">
                        <div class="pilot-name">${log.pilotName || 'Unknown Pilot'}</div>
                        <div class="log-date">${formatDate(log.date)}</div>
                        <div class="log-location">${log.location || 'No location specified'}</div>
                    </div>
                    <button class="view-info-btn">View Info</button>
                </div>
                <div class="details-grid">
                    <div><strong>Reporting Time:</strong> ${log.reportingTime || 'Not specified'}</div>
                    <div><strong>Start Time:</strong> ${log.startTime || 'Not specified'}</div>
                    <div><strong>End Time:</strong> ${log.endTime || 'Not specified'}</div>
                    <div><strong>Battery Initial:</strong> ${log.initialBattery || 'N/A'}%</div>
                    <div><strong>Battery Final:</strong> ${log.finalBattery || 'N/A'}%</div>
                    <div><strong>Initial Voltage:</strong> ${log.initialBatteryVoltage || 'N/A'}V</div>
                    <div><strong>Final Voltage:</strong> ${log.finalBatteryVoltage || 'N/A'}V</div>
                    <div><strong>Temperature Initial:</strong> ${log.initialTemperature || 'N/A'}°C</div>
                    <div><strong>Temperature Final:</strong> ${log.finalTemperature || 'N/A'}°C</div>
                    <div><strong>Battery Cycles:</strong> ${log.batteryCycleCount || 'N/A'}</div>
                    <div><strong>Drone SN:</strong> ${log.droneSerial || 'N/A'}</div>
                    <div><strong>Battery SN:</strong> ${log.batterySerial || 'N/A'}</div>
                    <div><strong>Leaving Time:</strong> ${log.leavingTime || 'Not specified'}</div>
                </div>
            `;

            const viewInfoBtn = card.querySelector('.view-info-btn');
            const detailsGrid = card.querySelector('.details-grid'); // ← Reference to details

            viewInfoBtn.addEventListener('click', function () {
                const isExpanded = card.classList.contains('expanded');
                card.classList.toggle('expanded');

                // Toggle button text
                this.textContent = isExpanded ? 'View Info' : 'Hide Info';
                this.classList.toggle('active', !isExpanded);
            });

            logsContainer.appendChild(card);
        });
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});