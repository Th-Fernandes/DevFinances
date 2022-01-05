export const modal = {
  toggle() {
    const buttons = [
      document.querySelector('#openModal'),
      document.querySelector('#cancelButton'),
      document.querySelector('#submitTransaction')
    ]
    //adiciona a funcionalidade de alterar o estado do modal para todos os botões necessários
    buttons.forEach((element) => {
      element.addEventListener('click', () => {
        document.querySelector('.modal-overlay').classList.toggle('active')
      })
    })
  }
}