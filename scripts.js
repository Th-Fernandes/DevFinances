import { modal } from "./assets/scripts/modal.js";
import { form } from "./assets/scripts/form.js";
//import { DOM } from './assets/scripts/DOM.js'
//import { Transaction } from "./assets/scripts/transaction.js";

modal.toggle();
form.preventSubmit();


export const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },

  set(transactions) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    );
  },
};

export const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove()  {
    const transactions = document.querySelectorAll('#deleteTransaction')
  
    for(let transaction of transactions) {
      transaction.addEventListener('click', (element) => {
        const transacao = element.target.parentElement.parentElement.remove()
        const index = element.target.classList.value
    
        Transaction.all.splice( index , 1);
        App.reload()
  
        this.remove()
      })
    } 
  },

  incomes() {
    //somar as entradas
    let income = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    return income;
  },

  expenses() {
    //somar as saídas
    let expense = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    // total = entradas - saídas
    return Transaction.incomes() + Transaction.expenses();
  },
};

export const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return `${signal} ${value}`;
  },
};

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);

    DOM.updateBalance();

    Storage.set(Transaction.all);
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

export const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
              <img id="deleteTransaction" class="${index}" src="./assets/images/minus.svg" alt="Remover transação">
            </td>
      </tr>        
        `;
      
        Transaction.remove()
    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

App.init();
Transaction.remove()


