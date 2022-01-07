import { modal } from "./assets/scripts/modal.js";
import { form } from "./assets/scripts/form.js";
import { Storage } from "./assets/scripts/storage.js"
import { Transaction } from './assets/scripts/transaction.js'
import {DOM} from './assets/scripts/DOM.js'

//funcionalidade de abrir e fechar o modal de transação
modal.toggle();
//funcionalidade de cancelar o envio do formulário
form.preventSubmit();

export  const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);

    DOM.updateBalance();

    Storage.set(Transaction.all);
    Transaction.remove()
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();




