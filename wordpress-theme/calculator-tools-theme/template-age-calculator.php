<?php
/**
 * Template Name: Age Calculator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">🎂 Age Calculator</h1>
            <p class="ct-tool-description">Calculate your exact age in years, months, days, and more</p>

            <div class="ct-grid ct-grid-2">
                <div class="ct-form-group">
                    <label class="ct-label">Date of Birth:</label>
                    <input type="date" id="birthDate" class="ct-input" max="<?php echo date('Y-m-d'); ?>">
                </div>
                <div class="ct-form-group">
                    <label class="ct-label">Calculate As Of:</label>
                    <input type="date" id="asOfDate" class="ct-input" value="<?php echo date('Y-m-d'); ?>">
                </div>
            </div>

            <button onclick="calculateAge()" class="ct-btn ct-btn-primary">Calculate Age</button>

            <div id="ageResult" class="ct-results" style="display: none;"></div>
        </div>
    </div>
</main>

<script>
function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const asOfDate = new Date(document.getElementById('asOfDate').value);
    
    if (!document.getElementById('birthDate').value) {
        alert('Please select your date of birth');
        return;
    }
    
    if (birthDate > asOfDate) {
        alert('Birth date cannot be after the calculation date');
        return;
    }
    
    // Calculate years
    let years = asOfDate.getFullYear() - birthDate.getFullYear();
    let months = asOfDate.getMonth() - birthDate.getMonth();
    let days = asOfDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate total days
    const totalDays = Math.floor((asOfDate - birthDate) / (1000 * 60 * 60 * 24));
    
    // Calculate total months
    const totalMonths = years * 12 + months;
    
    // Calculate total weeks
    const totalWeeks = Math.floor(totalDays / 7);
    
    // Calculate total hours
    const totalHours = totalDays * 24;
    
    // Next birthday
    let nextBirthday = new Date(asOfDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < asOfDate) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - asOfDate) / (1000 * 60 * 60 * 24));
    
    document.getElementById('ageResult').style.display = 'block';
    document.getElementById('ageResult').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Your Age:</span>
            <span class="ct-result-value ct-text-success">${years} years, ${months} months, ${days} days</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Months:</span>
            <span class="ct-result-value">${totalMonths} months</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Weeks:</span>
            <span class="ct-result-value">${totalWeeks} weeks</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Days:</span>
            <span class="ct-result-value">${totalDays} days</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Hours:</span>
            <span class="ct-result-value">${totalHours.toLocaleString()} hours</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Next Birthday:</span>
            <span class="ct-result-value">${daysToNextBirthday} days</span>
        </div>
    `;
}
</script>

<?php get_footer(); ?>
