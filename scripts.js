const Modal = {
    open(){
      //abrir Modal
      //adiciona a class "active" ao modal
      document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
    },
    close(){
      document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
    }
  }

// array com os dados da transação
  const transactions = [
      {
          id: 1,
          description: 'luz',
          amount: -50095, //amount = value
          date: '23/01/2021'
      },
      {
          id: 2,
          description: 'website',
          amount: 505087, //amount = value
          date: '23/01/2021'
      },
      {
          id: 1,
          description: 'Internet',
          amount: -20341, //amount = value
          date: '23/01/2021'
      },
  ]

  // const responsável por saber o total de dinheiro
  const Transaction = {
      all: transactions,

      add(transaction){
        Transaction.all.push(transaction)

        App.reload()
      },

      incomes() {
          //somar as entradas
          let income = 0;

          Transaction.all.forEach(transaction  => {
            if( transaction.amount > 0) {
              income += transaction.amount; 
            } 
          })

          return income
      }, 

      expenses() {
          //somar as saídas
          let expense = 0;

          Transaction.all.forEach( transaction => {
            if( transaction.amount < 0) {
              expense +=  transaction.amount;
            }
          })
          return expense
      },

      total() {
          // total = entradas - saídas
          return Transaction.incomes() + Transaction.expenses();
      }

  }


  const DOM = {

      transactionsContainer: document.querySelector('#data-table tbody'),

      addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
      },
      
      innerHTMLTransaction(transaction) {

        const CSSclass = transaction.amount > 0 ? "income": "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
              <img src="./assets/minus.svg" alt="Remover transação">
            </td>
      </tr>        
        `

        return html
      },

      updateBalance() {
        document
          .getElementById('incomeDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.incomes())
        
        document
          .getElementById('expenseDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.expenses())
       
        document
          .getElementById('totalDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.total())
      },

      clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
      }


      
  }

  const Utils = {
    formatCurrency(value) {
      const signal = Number(value) < 0 ? "-" : ""

      value = String(value).replace(/\D/g, "")

      value = Number(value) / 100

      value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })

      return `${signal} ${value}`
    }
  }

const App = {
  init() {
    
    Transaction.all.forEach(transaction =>{
      DOM.addTransaction(transaction)
    } )

    DOM.updateBalance()

  },

  reload() {
    DOM.clearTransactions()
    App.init()
    
  }
}

App.init()


Transaction.add({
  id: 20,
  description: 'test',
  amount: 450,
  date: '20/09/2021'
})
