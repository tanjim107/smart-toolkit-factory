<?php
/**
 * Template Name: EMI Calculator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">🏦 EMI Calculator</h1>
            <p class="ct-tool-description">Calculate your loan EMI, total payment, and interest</p>

            <div class="ct-form-group">
                <label class="ct-label">Loan Amount: ₹<span id="loanAmountDisplay">500000</span></label>
                <input type="range" id="loanAmount" class="ct-slider" min="10000" max="10000000" step="10000" value="500000" oninput="updateDisplay()">
            </div>

            <div class="ct-form-group">
                <label class="ct-label">Interest Rate: <span id="interestRateDisplay">10</span>%</label>
                <input type="range" id="interestRate" class="ct-slider" min="1" max="30" step="0.1" value="10" oninput="updateDisplay()">
            </div>

            <div class="ct-form-group">
                <label class="ct-label">Loan Tenure: <span id="tenureDisplay">12</span> months</label>
                <input type="range" id="tenure" class="ct-slider" min="1" max="360" step="1" value="12" oninput="updateDisplay()">
            </div>

            <button onclick="calculateEMI()" class="ct-btn ct-btn-primary">Calculate EMI</button>

            <div id="emiResult" class="ct-results" style="display: none;"></div>

            <div style="margin-top: 2rem;">
                <canvas id="emiChart"></canvas>
            </div>
        </div>
    </div>
</main>

<script>
let emiChart = null;

function updateDisplay() {
    const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value;
    const tenure = document.getElementById('tenure').value;
    
    document.getElementById('loanAmountDisplay').textContent = parseInt(loanAmount).toLocaleString('en-IN');
    document.getElementById('interestRateDisplay').textContent = interestRate;
    document.getElementById('tenureDisplay').textContent = tenure;
}

function calculateEMI() {
    const principal = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const months = parseInt(document.getElementById('tenure').value);
    
    const monthlyRate = annualRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    
    document.getElementById('emiResult').style.display = 'block';
    document.getElementById('emiResult').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Monthly EMI:</span>
            <span class="ct-result-value ct-text-success">₹${emi.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Principal Amount:</span>
            <span class="ct-result-value">₹${principal.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Interest:</span>
            <span class="ct-result-value">₹${totalInterest.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Payment:</span>
            <span class="ct-result-value">₹${totalPayment.toFixed(2)}</span>
        </div>
    `;
    
    // Create chart
    if (emiChart) {
        emiChart.destroy();
    }
    
    const ctx = document.getElementById('emiChart').getContext('2d');
    emiChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, totalInterest],
                backgroundColor: ['#6366f1', '#8b5cf6']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9'
                    }
                }
            }
        }
    });
}

// Calculate on page load
calculateEMI();
</script>

<?php get_footer(); ?>
