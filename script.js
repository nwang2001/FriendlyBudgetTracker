// creates a class called Budget
class Budget {

    // creates a constructor with properties
    constructor() {
        this.availableBudget = 0;
        this.transactions = [];
    }

    // methods to update budget, add income, add expenses, and update transaction list
    updateBudget() {
        const budgetDisplay = document.getElementById('budgetDisplay');
        budgetDisplay.value = this.availableBudget.toFixed(2);
    }

    addIncome(type, amount) {
        // an alert if income is negative
        if (amount <= 0) {
            alert('Amount needs to be greater than zero.')
            return;
        }
        this.availableBudget += amount;
        this.updateBudget();
        this.transactions.push({ type: 'Income', description: type, amount: amount });
        this.updateTransactionList();
        console.log(this.updateTransactionList);
        this.clearInputFields();
    }

    addExpense(type, amount) {
        // an alert if available budget is less than the expense amount
        if (amount > this.availableBudget) {
            alert('Insufficient funds, will go into negatives. Go make more money.')
            return;
        }

        this.availableBudget -= amount;
        this.updateBudget();
        this.transactions.push({ type: 'Expense', description: type, amount: amount });
        this.updateTransactionList();
        this.clearInputFields();
    }

    updateTransactionList() {
        const listContainer = document.getElementById('list');
        listContainer.innerHTML = '';

        // each transaction will be placed as a div
        this.transactions.forEach(transaction => {
            const listItem = document.createElement('div');
            listItem.textContent = `${transaction.type}: ${transaction.description}  ${transaction.amount.toFixed(2)}`;
            listContainer.appendChild(listItem);
        });
    }

    clearInputFields() {
    document.getElementById('income-type').value = '';
    document.getElementById('income-input').value = '';
    document.getElementById('expense-type').value = '';
    document.getElementById('expense-input').value = '';
    }
}

// create a object from class budget
const budgetTracker = new Budget();

// add event listeners to add income, expense, and clear screen
document.getElementById('enter-income').addEventListener('click', function () {
    const incomeType = document.getElementById('income-type').value;
    const incomeAmt = parseFloat(document.getElementById('income-input').value);

    if (incomeType && !isNaN(incomeAmt)) {
        budgetTracker.addIncome(incomeType, incomeAmt);
    } else {
        alert('Add valid inputs and fill out all fields.')
        return;
    }
});

document.getElementById('enter-expense').addEventListener('click', function () {
    const expenseType = document.getElementById('expense-type').value;
    const expenseAmt = parseFloat(document.getElementById('expense-input').value);

    if (expenseType && !isNaN(expenseAmt)) {
        budgetTracker.addExpense(expenseType, expenseAmt);
    } else {
        alert('Add valid inputs and fill out all fields.')
        return;
    }
});

document.getElementById('clear').addEventListener('click', function () {
    budgetTracker.availableBudget = 0;
    budgetTracker.transactions = [];
    budgetTracker.updateBudget();
    budgetTracker.updateTransactionList();
    document.getElementById('income-type').value = '';
    document.getElementById('income-input').value = '';
    document.getElementById('expense-type').value = '';
    document.getElementById('expense-input').value = '';
});