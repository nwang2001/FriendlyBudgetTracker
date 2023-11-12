class Budget {
    constructor() {
        this.availableBudget = 0;
        this.transactions = [];
    }


    updateBudget() {
        const budgetDisplay = document.getElementById('budgetDisplay');
        budgetDisplay.value = this.availableBudget;
    }


    addIncome(type, amount) {
        this.availableBudget += amount;
        this.updateBudget();
        this.transactions.push({type: 'Income', description: type, amount: amount });
        this.updateTransactionList();
        console.log(this.updateTransactionList);
    }


    addExpense(type, amount) {
        if (amount > this.availableBudget) {
            alert('Insufficient funds, will go into negatives.')
            return;
        }


        this.availableBudget -= amount;
        this.updateBudget();
        this.transactions.push({type: 'Expense', description: type, amount: amount });
        this.updateTransactionList();
    }


    updateTransactionList() {
        const listContainer = document.getElementById('list');
        listContainer.innerHTML = '';


        this.transactions.forEach(transaction => {
            const listItem = document.createElement('div');
            listItem.textContent = `${transaction.type}: ${transaction.description} - ${transaction.amount.toFixed(2)}`;
            listContainer.appendChild(listItem);
        });
    }
}


const budgetTracker = new Budget();


document.getElementById('enter-income').addEventListener('click', function (){
    const incomeType = document.getElementById('income-type').value;
    const incomeAmt = parseFloat(document.getElementById('income-input').value);
   
    if (incomeType && !isNaN(incomeAmt)) {
        budgetTracker.addIncome(incomeType, incomeAmt);
    } else {
        alert('Add valid inputs and fill out all fields.')
        return;
    }
});


document.getElementById('enter-expense').addEventListener('click', function (){
    const expenseType = document.getElementById('expense-type').value;
    const expenseAmt = parseFloat(document.getElementById('expense-input').value);
   
    if (expenseType && !isNaN(expenseAmt)) {
        budgetTracker.addExpense(expenseType, expenseAmt);
    } else {
        alert('Add valid inputs and fill out all fields.')
        return;
    }
});


document.getElementById('clear').addEventListener('click', function (){
    budgetTracker.availableBudget = 0;
    budgetTracker.transactions = [];
    budgetTracker.updateBudget();
    budgetTracker.updateTransactionList();  
    document.getElementById('income-type').value = '';
    document.getElementById('income-input').value = '';
    document.getElementById('expense-type').value = '';
    document.getElementById('expense-input').value = '';  
});