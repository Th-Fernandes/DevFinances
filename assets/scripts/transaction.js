import { Storage } from "./storage.js";
import { App } from '../../scripts.js'

export const Transaction = {
  transactions: () => {return document.querySelectorAll('#deleteTransaction')},
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
    
  },

  remove()  {
    const transactions = document.querySelectorAll('#deleteTransaction')
    //console.log(transactions)
    //console.log(this.transactions())
  
    for(let transaction of transactions) {
      transaction.addEventListener('click', (element) => {
        const transacao = element.target.parentElement.parentElement.remove()
        const index = element.target.classList.value
    
        Transaction.all.splice( index , 1);
        App.reload()
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