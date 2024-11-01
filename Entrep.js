// Switch between tabs
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Hide all tabs
    });

    document.getElementById(tabName).style.display = 'block'; // Show the selected tab

    if (tabName === 'calendarTab') {
        initializeCalendar(); // Initialize calendar when tab is opened
    }
}

// Populate description options based on the type
function toggleDescriptionOptions() {
    const type = document.getElementById('type').value;
    const descriptionSelect = document.getElementById('description');
    descriptionSelect.innerHTML = ''; // Clear existing options

    let options = [];
    if (type === 'income') {
        options = ['Salary', 'Business', 'Investment', 'Others'];
    } else if (type === 'expense') {
        options = ['Tuition', 'Groceries', 'Utilities', 'Rent', 'Others'];
    }

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.innerText = option;
        descriptionSelect.appendChild(opt);
    });

    // Set the first option as selected
    if (options.length > 0) {
        descriptionSelect.value = options[0];
    }
}

// Initialize Calendar
let calendar;
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: [],
        dateClick: function (info) {
            const title = prompt('Enter Event Title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.date,
                    allDay: true
                });
            }
        },
        eventClick: function (info) {
            const confirmDelete = confirm('Do you want to delete this event?');
            if (confirmDelete) {
                info.event.remove();
            }
        }
    });
    
    calendar.render(); // Ensure the calendar renders properly
}

// Add Transaction Functionality
const transactionList = [];
let balance = 0;

document.getElementById('addTransaction').onclick = function() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!description || isNaN(amount)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    transactionList.push({ description, amount, type });
    balance += (type === 'income' ? amount : -amount);
    document.getElementById('balance').innerText = balance.toFixed(2);

    renderTransactionList();
    provideSuggestions(type, description); // Pass type and description to suggestions
    document.getElementById('amount').value = ''; // Clear amount field
};

// Render Transaction List
function renderTransactionList() {
    const transactionListElement = document.getElementById('transactionList');
    transactionListElement.innerHTML = '';

    transactionList.forEach(transaction => {
        const li = document.createElement('li');
        li.innerText = `${transaction.description}: $${transaction.amount.toFixed(2)} (${transaction.type})`;
        li.classList.add('fade-in'); // Add animation class
        transactionListElement.appendChild(li);
    });
}

// Provide Suggestions
function provideSuggestions(type, description) {
    const suggestions = document.getElementById('actionSuggestions');
    suggestions.innerHTML = ''; // Clear previous suggestions

    // Personalized suggestions based on expense type
    if (type === 'expense') {
        if (description === "Tuition") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Explore scholarship opportunities offered by your school or external organizations.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Consider applying for financial aid via PEAC, scholarship offices of your schoor or your country’s equivalent.";
            suggestions.appendChild(suggestionItem2);

            const suggestionItem3 = document.createElement('li');
            suggestionItem3.textContent = "Investigate payment plans offered by your institution.";
            suggestions.appendChild(suggestionItem3);
        }

        if (description === "Groceries") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Consider creating a meal plan for the week to avoid impulse buys.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Take advantage of loyalty programs and coupons at your local grocery stores.";
            suggestions.appendChild(suggestionItem2);
        }

        if (description === "Mortgage/Rent") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Evaluate your mortgage terms for possible refinancing options.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Consider renting out a room to offset your mortgage or rent expenses.";
            suggestions.appendChild(suggestionItem2);
        }

        if (description === "Business Expenses") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Review your business expenses quarterly to identify non-essential spending.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Look into tax deductions for your business expenses to reduce taxable income.";
            suggestions.appendChild(suggestionItem2);
        }

    // Personalized suggestions based on income type
    } else if (type === 'income') {
        if (description === "Salary") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Consider setting up automatic transfers to your savings account each payday.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Review your retirement plan and maximize employer matching contributions.";
            suggestions.appendChild(suggestionItem2);
        }

        if (description === "Business") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Invest in marketing to increase business revenue and reach more clients.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Keep track of all business-related expenses to maximize your tax deductions.";
            suggestions.appendChild(suggestionItem2);
        }

        if (description === "Investment") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Diversify your investment portfolio to mitigate risk.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Consider consulting a financial advisor for tailored investment strategies.";
            suggestions.appendChild(suggestionItem2);
        }

        if (description === "Others") {
            const suggestionItem1 = document.createElement('li');
            suggestionItem1.textContent = "Evaluate whether this income source can be made more consistent or reliable.";
            suggestions.appendChild(suggestionItem1);

            const suggestionItem2 = document.createElement('li');
            suggestionItem2.textContent = "Keep a record of all sources of income to track your financial growth.";
            suggestions.appendChild(suggestionItem2);
        }
    }
}

// Mortgage Calculator
document.getElementById('openMortgageCalculator').onclick = function() {
    document.getElementById('mortgageCalculatorModal').style.display = 'block';
};

document.getElementById('closeMortgageCalculator').onclick = function() {
    document.getElementById('mortgageCalculatorModal').style.display = 'none';
};

document.getElementById('calculateMortgage').onclick = function() {
    const mortgageAmount = parseFloat(document.getElementById('mortgageAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value) * 12;

    const monthlyPayment = (mortgageAmount * interestRate) / (1 - Math.pow((1 + interestRate), -loanTerm));
    document.getElementById('mortgageResult').innerText = `Monthly Payment: ₱${monthlyPayment.toFixed(2)}`;
};

// Tax Calculator
document.getElementById('openTaxCalculator').onclick = function() {
    document.getElementById('taxCalculatorModal').style.display = 'block';
};

document.getElementById('closeTaxCalculator').onclick = function() {
    document.getElementById('taxCalculatorModal').style.display = 'none';
};

document.getElementById('calculateTax').onclick = function() {
    const income = parseFloat(document.getElementById('income').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100;
    const taxAmount = income * taxRate;
    document.getElementById('taxResult').innerText = `Tax Owed: $${taxAmount.toFixed(2)}`;
};

// Chart Logic
let chart;

function updateChart() {
    const ctx = document.getElementById('financialChart').getContext('2d');
    const chartType = document.getElementById('graphType').value;

    const labels = transactionList.map(t => t.description);
    const data = transactionList.map(t => t.amount * (t.type === 'income' ? 1 : -1));

    if (chart) {
        chart.destroy(); // Destroy previous chart instance
    }

    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Financial Overview',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Financial Overview Chart'
                }
            }
        }
    });
}

// Event listeners for chart type changes
document.getElementById('graphType').addEventListener('change', updateChart);

// Initialize page
window.onload = function() {
    toggleDescriptionOptions();
};
