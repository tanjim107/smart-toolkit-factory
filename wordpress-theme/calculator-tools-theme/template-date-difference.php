<?php
/**
 * Template Name: Date Difference Calculator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">📅 Date Difference Calculator</h1>
            <p class="ct-tool-description">Calculate the difference between two dates</p>

            <div class="ct-grid ct-grid-2">
                <div class="ct-form-group">
                    <label class="ct-label">Start Date:</label>
                    <input type="date" id="startDate" class="ct-input">
                </div>
                <div class="ct-form-group">
                    <label class="ct-label">End Date:</label>
                    <input type="date" id="endDate" class="ct-input">
                </div>
            </div>

            <button onclick="calculateDateDifference()" class="ct-btn ct-btn-primary">Calculate Difference</button>

            <div id="dateResult" class="ct-results" style="display: none;"></div>
        </div>
    </div>
</main>

<script>
function calculateDateDifference() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    
    if (!document.getElementById('startDate').value || !document.getElementById('endDate').value) {
        alert('Please select both dates');
        return;
    }
    
    if (startDate > endDate) {
        alert('Start date must be before end date');
        return;
    }
    
    // Calculate differences
    const timeDiff = endDate - startDate;
    
    // Total days
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Years, months, days
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Total weeks
    const totalWeeks = Math.floor(totalDays / 7);
    
    // Total hours
    const totalHours = totalDays * 24;
    
    // Total minutes
    const totalMinutes = totalHours * 60;
    
    document.getElementById('dateResult').style.display = 'block';
    document.getElementById('dateResult').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Difference:</span>
            <span class="ct-result-value ct-text-success">${years} years, ${months} months, ${days} days</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Days:</span>
            <span class="ct-result-value">${totalDays} days</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Weeks:</span>
            <span class="ct-result-value">${totalWeeks} weeks</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Hours:</span>
            <span class="ct-result-value">${totalHours.toLocaleString()} hours</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Minutes:</span>
            <span class="ct-result-value">${totalMinutes.toLocaleString()} minutes</span>
        </div>
    `;
}
</script>

<?php get_footer(); ?>
