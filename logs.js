document.addEventListener('DOMContentLoaded', function() {
    const logsBody = document.getElementById('logsBody');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    let logs = JSON.parse(localStorage.getItem('droneLogs')) || [];
    
    // Load logs on page load
    loadLogs();
    window.dispatchEvent(new Event('resize'));

    function loadLogs() {
        renderLogs(logs);
    }

    function renderLogs(filteredLogs) {
        if (filteredLogs.length === 0) {
            if (isMobileView()) {
                logsBody.innerHTML = '<div class="no-logs">No logs recorded yet</div>';
            } else {
                logsBody.innerHTML = '<tr><td colspan="10" class="no-logs">No logs recorded yet</td></tr>';
            }
            return;
        }
        
        logsBody.innerHTML = '';
        
        if (isMobileView()) {
            renderMobileCards(filteredLogs);
        } else {
            renderDesktopTable(filteredLogs);
        }
    }

   function renderMobileCards(filteredLogs) {
    filteredLogs.forEach(log => {
        const card = document.createElement('div');
        card.className = 'mobile-log-card';
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
        viewInfoBtn.addEventListener('click', function () {
            const isExpanded = card.classList.contains('expanded');
            card.classList.toggle('expanded');
            this.textContent = isExpanded ? 'View Info' : 'Hide Info';
            this.classList.toggle('active');
        });

        logsBody.appendChild(card);
    });
    }

    function renderDesktopTable(filteredLogs) {
        filteredLogs.forEach(log => {
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
                    <div><strong>Initial:</strong> ${log.initialTemperature || ''}°C</div>
                    <div><strong>Final:</strong> ${log.finalTemperature || ''}°C</div>
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

    function isMobileView() {
        return window.innerWidth <= 900;
    }

    // Handle search (if search elements exist)
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            const filtered = logs.filter(log =>
                Object.values(log).some(val =>
                    (val + '').toLowerCase().includes(query)
                )
            );
            renderLogs(filtered);
        });
    }

    // Re-render on window resize to switch between mobile/desktop views
    window.addEventListener('resize', function() {
        renderLogs(logs);
    });
});