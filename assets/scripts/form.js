//import {Transaction} from '../../scripts.js'
import { Transaction } from './transaction.js'
import { Utils } from './utils.js'
//import { Utils } from '../../scripts.js'

export const form = {
  description:document.querySelector('input#description'),
  amount:document.querySelector('input#amount'),
  date:document.querySelector('input#date'),

  preventSubmit() {
    const submitForm = document.querySelector('#submitTransaction')

    submitForm.addEventListener('click', (event) => {
      event.preventDefault()

      try {
        this.validateFields()
  
        const transaction = this.formatValues()
  
        Transaction.add(transaction)
  
        this.clearFields()
        
      } catch (error) {
        alert(error.message)
        throw new Error(error.message)
      }
    })
  },

  getValues() {
    return {
      description: form.description.value,
      amount: form.amount.value,
      date: form.date.value
    }
},

  validateFields() {
    const { description, amount, date } = this.getValues()

    if( description.trim() === "" || amount.trim() === "" || date.trim() === "") {
      throw new Error("Por favor, preencha todos os campos")
    }
  },

  formatValues() {
    let { description, amount, date } = this.getValues()

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    }
  },

  clearFields() {
    this.description.value = ""
    this.amount.value = ""
    this.date.value = ""
  },


}