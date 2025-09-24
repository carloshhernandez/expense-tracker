let expenseForm = document.querySelector('.pure-form');
let expenses = [];

expenseForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // initiatlize the form values as variables
  let date = document.getElementById('date').value;
  let merchant = document.getElementById('merchant').value;
  let category = document.getElementById('category').value;
  let description = document.getElementById('description').value;
  let amount = document.getElementById('amount').value;

  // confirm the values are obtained
  console.log('Date:', date);
  console.log('Merchant:', merchant);
  console.log('Category:', category);
  console.log('Description:', description);
  console.log('Amount:', amount);

  // Create new expense object
  let newExpense = new Expense(date, merchant, category, description, amount);
  console.log('New expense:', newExpense);

  // push the new expense object into the expenses array
  expenses.push(newExpense);
  console.log('All expenses:', expenses);

  // Remove the no-items prompt once an item gets submitted
  let noItemPrompt = document.querySelector('#no-items');
  if (noItemPrompt) {
    noItemPrompt.style.display = 'none';
  }

  // Reset the form after an expense gets submitted
  expenseForm.reset();

  // call the function to add rows
  addExpenseRow(newExpense);

  // total up expenses from the table
  updateDashboard();
});

// Create the expense object
function Expense(date, merchant, category, description, amount) {
  this.date = date;
  this.merchant = merchant;
  this.category = category;
  this.description = description;
  this.amount = parseFloat(amount);
  this.id = Date.now();
}

// create the new table row for a submitted expense
function addExpenseRow(expense) {
  let tableBody = document.querySelector('tbody');
  let newRow = document.createElement('tr');
  // expense fields
  let dateColumn = document.createElement('td');
  dateColumn.textContent = expense.date;
  dateColumn.setAttribute('data-label', 'Date');
  let merchantColumn = document.createElement('td');
  merchantColumn.textContent = expense.merchant;
  merchantColumn.setAttribute('data-label', 'Merchant');
  let categoryColumn = document.createElement('td');
  categoryColumn.textContent = expense.category;
  categoryColumn.setAttribute('data-label', 'Category');
  let descriptionColumn = document.createElement('td');
  descriptionColumn.textContent = expense.description;
  descriptionColumn.setAttribute('data-label', 'Description');
  let amountColumn = document.createElement('td');
  amountColumn.textContent = '$' + expense.amount.toFixed(2);
  amountColumn.setAttribute('data-label', 'Amount');

  // buttons
  let editColumn = document.createElement('td');
  editColumn.innerHTML = `<button
      type="button"
      class="edit-btn pure-button"
      data-expense-id="${expense.id}"
      aria-label="Edit this expense"
    >
      ✏️ edit
    </button>`;
  editColumn.setAttribute('data-label', 'Edit');

  let deleteColumn = document.createElement('td');
  deleteColumn.innerHTML = `<button
      type="button"
      class="delete-btn pure-button"
      data-expense-id="${expense.id}"
      aria-label="Delete this expense"
    >
      🗑️ delete
    </button>`;
  deleteColumn.setAttribute('data-label', 'Delete');

  // add row
  tableBody.appendChild(newRow);
  // add columns
  newRow.appendChild(dateColumn);
  newRow.appendChild(merchantColumn);
  newRow.appendChild(categoryColumn);
  newRow.appendChild(descriptionColumn);
  newRow.appendChild(amountColumn);
  newRow.appendChild(editColumn);
  newRow.appendChild(deleteColumn);
}

function updateDashboard() {
  let totalAmount = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalAmount += expenses[i].amount;
  }
  let totalTrans = expenses.length;

  // Update DOM elements (new code goes here)
  // Target #total-amount and #total-trans elements
  // Set their textContent to the calculated values
  let dashTrans = document.querySelector('#total-trans');
  dashTrans.textContent = totalTrans;

  let dashAmount = document.querySelector('#total-amount');
  dashAmount.textContent = '$' + totalAmount.toFixed(2);

  let categoryTotals = {};
  for (let i = 0; i < expenses.length; i++) {
    categoryTotals[expenses[i].category] =
      (categoryTotals[expenses[i].category] || 0) + expenses[i].amount;
  }
  let highestCatAmount = 0;
  let highestCategory = '';

  for (category in categoryTotals) {
    if (categoryTotals[category] > highestCatAmount) {
      highestCatAmount = categoryTotals[category];
      highestCategory = category;
    }
  }

  let mostExpensive = document.querySelector('#most-expensive');
  mostExpensive.textContent = highestCategory;

  let mostExpensiveAmount = document.querySelector('#most-expensive-amount');
  mostExpensiveAmount.textContent = highestCatAmount;
}

let tableBody = document.querySelector('tbody');
tableBody.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    let expenseId = event.target.getAttribute('data-expense-id');
    event.target.closest('tr').remove();
    expenses = expenses.filter((expense) => expense.id != expenseId);
  }
  updateDashboard();
});

function loadSeedData() {
  let sampleExpenses = [
    new Expense(
      '2025-08-21',
      'Starbucks',
      'food-and-groceries',
      'morning coffee',
      5.47
    ),
    new Expense('2025-07-15', 'Old Navy', 'clothing', 'jeans', 68.48),
    new Expense(
      '2025-06-21',
      'King Soopers',
      'food-and-groceries',
      'weekly groceries',
      133.48
    ),
  ];

  sampleExpenses.forEach((expense) => {
    expenses.push(expense);
    addExpenseRow(expense);
  });

  updateDashboard();
}

loadSeedData();
