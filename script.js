document.addEventListener('DOMContentLoaded', () => {
    const monthlyAmountInput = document.getElementById('monthlyAmount');
    const expectedReturnInput = document.getElementById('expectedReturn');
    const timePeriodInput = document.getElementById('timePeriod');

    const investedDisplay = document.getElementById('investedDisplay');
    const returnsDisplay = document.getElementById('returnsDisplay');
    const totalDisplay = document.getElementById('totalDisplay');

    function calculateSIP() {
        const P = parseFloat(monthlyAmountInput.value) || 0;
        const annualRate = parseFloat(expectedReturnInput.value) || 0;
        const years = parseFloat(timePeriodInput.value) || 0;

        const i = (annualRate / 12) / 100; // Monthly interest rate
        const n = years * 12; // Total months

        let totalValue = 0;
        
        if (i > 0) {
            // SIP Formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
            totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        } else {
            totalValue = P * n;
        }

        const totalInvested = P * n;
        const estimatedReturns = totalValue - totalInvested;

        // Display update with Indian Currency formatting (₹)
        investedDisplay.textContent = '₹' + Math.round(totalInvested).toLocaleString('en-IN');
        returnsDisplay.textContent = '₹' + Math.round(estimatedReturns).toLocaleString('en-IN');
        totalDisplay.textContent = '₹' + Math.round(totalValue).toLocaleString('en-IN');
    }

    // Add event listeners to calculate live on input change
    monthlyAmountInput.addEventListener('input', calculateSIP);
    expectedReturnInput.addEventListener('input', calculateSIP);
    timePeriodInput.addEventListener('input', calculateSIP);

    // Initial calculation when page loads
    calculateSIP();
});
