//PILHA CODE//

var pilhaElement = document.getElementById("pilha");
var listaElement = document.getElementById("lista");
var arvoreElement = document.getElementById("arvore");

function pilha() {
  pilhaElement.style.display = "block";
  listaElement.style.display = "none";
  arvoreElement.style.display = "none";
}

function lista() {
  pilhaElement.style.display = "none";
  listaElement.style.display = "block";
  arvoreElement.style.display = "none";
}

function arvore() {
  pilhaElement.style.display = "none";
  listaElement.style.display = "none";
  arvoreElement.style.display = "block";
}


let stack = [];

function push() {
  let value = document.getElementById("input").value;
  if(value != 0 ){
    stack.push(value);
    render();
    document.getElementById("input").value = "";
  }
  else{
    alert("Digite um numero")
  }
}

function pop() {
  if (stack.length === 0) {
    return;
  }
  stack.pop();
  render();
}

function peek() {
  if (stack.length === 0) {
    document.getElementById("top").innerHTML = "";
  } else {
    document.getElementById("top").innerHTML = stack[stack.length - 1];
  }
}

function is_empty() {
  if (stack.length === 0) {
    alert("A pilha está vazia.");
  } else {
    alert("Tem .");
  }
}

function render() {
  let stackHTML = "";
  for (let i = stack.length - 1; i >= 0; i--) {
    stackHTML += `<div><p style="--i:1;">${stack[i]}</p></div>`;
  }
  document.getElementById("stack").innerHTML = stackHTML;
}

render();

//LISTA//

class Node {
  constructor(value) {
      this.value = value;
      this.next = null;
  }
}

class LinkedList {
  constructor() {
      this.head = null;
      this.size = 0;
  }

  insertAtBeginning(value) {
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head = newNode;
      this.size++;
      this.updateDisplay();
  }

  insertAtEnd(value) {
      const newNode = new Node(value);
      if (!this.head) {
          this.head = newNode;
      } else {
          let current = this.head;
          while (current.next) {
              current = current.next;
          }
          current.next = newNode;
      }
      this.size++;
      this.updateDisplay();
  }

  insertAtPosition(value, position) {
      if (position < 0 || position > this.size) {
          this.showMessage("Posição inválida.");
          return;
      }
      const newNode = new Node(value);
      if (position === 0) {
          newNode.next = this.head;
          this.head = newNode;
      } else {
          let current = this.head;
          let previous = null;
          let index = 0;
          while (index < position) {
              previous = current;
              current = current.next;
              index++;
          }
          newNode.next = current;
          previous.next = newNode;
      }
      this.size++;
      this.updateDisplay();
  }

  removeFromBeginning() {
      if (!this.head) {
          this.showMessage("A lista está vazia.");
          return;
      }
      this.head = this.head.next;
      this.size--;
      this.updateDisplay();
  }

  removeFromEnd() {
      if (!this.head) {
          this.showMessage("A lista está vazia.");
          return;
      }
      if (!this.head.next) {
          this.head = null;
      } else {
          let current = this.head;
          let previous = null;
          while (current.next) {
              previous = current;
              current = current.next;
          }
          previous.next = null;
      }
      this.size--;
      this.updateDisplay();
  }

  removeFromPosition(position) {
      if (position < 0 || position >= this.size) {
          this.showMessage("Posição inválida.");
          return;
      }
      if (position === 0) {
          this.head = this.head.next;
      } else {
          let current = this.head;
          let previous = null;
          let index = 0;
          while (index < position) {
              previous = current;
              current = current.next;
              index++;
          }
          previous.next = current.next;
      }
      this.size--;
      this.updateDisplay();
  }

  search(value) {
      let current = this.head;
      while (current) {
          if (current.value === value) {
              return true;
          }
          current = current.next;
      }
      return false;
  }

  updateDisplay() {
      const listContainer = document.getElementById('linkedList');
      listContainer.innerHTML = '';
      let current = this.head;
      while (current) {
          const nodeElement = document.createElement('div');
          nodeElement.className = 'node';
          const blockElement = document.createElement('div');
          blockElement.className = 'block';
          blockElement.innerText = current.value;
          nodeElement.appendChild(blockElement);
          const arrowElement = document.createElement('div');
          arrowElement.className = 'arrow';
          arrowElement.innerHTML = '→';
          nodeElement.appendChild(arrowElement);
          listContainer.appendChild(nodeElement);
          current = current.next;
      }
      const nullElement = document.createElement('div');
      nullElement.className = 'node';
      const blockElement = document.createElement('div');
      blockElement.className = 'block';
      blockElement.innerText = 'null';
      nullElement.appendChild(blockElement);
      listContainer.appendChild(nullElement);

      document.getElementById('count').innerText = `Número de Elementos: ${this.size}`;
  }

  showMessage(message) {
      const messageContainer = document.getElementById('message');
      messageContainer.innerText = message;
      setTimeout(() => {
          messageContainer.innerText = '';
      }, 3000);
  }
}

const linkedList = new LinkedList();

function insertAtBeginning() {
  const valueInput = document.getElementById('valueInput');
  const value = valueInput.value.trim();
  if (value) {
      linkedList.insertAtBeginning(value);
      valueInput.value = '';
  } else {
      linkedList.showMessage("Por favor, insira um valor.");
  }
}

function insertAtEnd() {
  const valueInput = document.getElementById('valueInput');
  const value = valueInput.value.trim();
  if (value) {
      linkedList.insertAtEnd(value);
      valueInput.value = '';
  } else {
      linkedList.showMessage("Por favor, insira um valor.");
  }
}

function insertAtPosition() {
  const valueInput = document.getElementById('valueInput');
  const positionInput = document.getElementById('positionInput');
  const value = valueInput.value.trim();
  const position = parseInt(positionInput.value.trim());
  if (value && !isNaN(position)) {
      linkedList.insertAtPosition(value, position);
      valueInput.value = '';
      positionInput.value = '';
  } else {
      linkedList.showMessage("Por favor, insira um valor e uma posição válidos.");
  }
}

function removeFromBeginning() {
  linkedList.removeFromBeginning();
}

function removeFromEnd() {
  linkedList.removeFromEnd();
}

function removeFromPosition() {
  const positionInput = document.getElementById('positionInput');
  const position = parseInt(positionInput.value.trim());
  if (!isNaN(position)) {
      linkedList.removeFromPosition(position);
      positionInput.value = '';
  } else {
      linkedList.showMessage("Por favor, insira uma posição válida.");
  }
}

function searchValue() {
  const valueInput = document.getElementById('valueInput');
  const value = valueInput.value.trim();
  const found = linkedList.search(value);
  if (found) {
      linkedList.showMessage(`Valor ${value} encontrado na lista.`);
  } else {
      linkedList.showMessage(`Valor ${value} não encontrado na lista.`);
  }
}
