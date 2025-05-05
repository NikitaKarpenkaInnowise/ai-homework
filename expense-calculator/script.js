// Store expenses in an array
let expenses = [];

// Function to add a new expense
function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (category && amount) {
        expenses.push({ category, amount });
        updateExpensesList();
        clearForm();
    } else {
        alert('Please fill in both category and amount!');
    }
}

// Function to clear the form
function clearForm() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesList();
}

// Function to update the expenses list in the table
function updateExpensesList() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expensesList.appendChild(row);
    });
}

// Function to calculate statistics
function calculateStats() {
    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = 
        `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Calculate average daily expense
    const averageDaily = total / 30;
    document.getElementById('averageExpense').textContent = 
        `$${averageDaily.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Find top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';
    
    topExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        topExpensesList.appendChild(li);
    });
}

// Add sample data (optional)
function addSampleData() {
    expenses = [
        { category: 'Groceries', amount: 15000 },
        { category: 'Rent', amount: 40000 },
        { category: 'Transportation', amount: 5000 },
        { category: 'Entertainment', amount: 10000 },
        { category: 'Communication', amount: 2000 },
        { category: 'Gym', amount: 3000 }
    ];
    updateExpensesList();
    calculateStats();
}

// Add sample data button to the page
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.textContent = 'Load Sample Data';
    sampleDataBtn.onclick = addSampleData;
    sampleDataBtn.style.marginTop = '20px';
    container.appendChild(sampleDataBtn);
}); 