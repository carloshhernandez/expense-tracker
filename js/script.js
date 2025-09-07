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
});

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
  let merchantColumn = document.createElement('td');
  merchantColumn.textContent = expense.merchant;
  let categoryColumn = document.createElement('td');
  categoryColumn.textContent = expense.category;
  let descriptionColumn = document.createElement('td');
  descriptionColumn.textContent = expense.description;
  let amountColumn = document.createElement('td');
  amountColumn.textContent = '$' + expense.amount.toFixed(2);

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
  let deleteColumn = document.createElement('td');
  deleteColumn.innerHTML = `<button
      type="button"
      class="delete-btn pure-button"
      data-expense-id="${expense.id}"
      aria-label="Delete this expense"
    >
      🗑️ delete
    </button>`;
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
