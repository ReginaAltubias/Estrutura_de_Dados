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
        console.error("Posição inválida.");
        return;
    }

    const newNode = new Node(value);
    
    if (position === 0) {
        newNode.next = this.head;
        this.head = newNode;
    } else {
        let current = this.head;
        let index = 0;
        while (index < position - 1) {
            current = current.next;
            index++;
        }
        newNode.next = current.next;
        current.next = newNode;
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




//ÁRVORE//


    // Definindo a classe NoArvore
class NoArvore {
    constructor(dado) {
        this.dado = dado;
        this.esquerda = null;
        this.direita = null;
    }
}

// Definindo a classe ArvoreBinaria
class ArvoreBinaria {
    constructor() {
        this.raiz = null;
    }

    adicionar(dado) {
        const novoNo = new NoArvore(dado);
        if (this.raiz === null) {
            this.raiz = novoNo;
        } else {
            this.inserirNo(this.raiz, novoNo);
        }
        this.desenharArvore();
    }

    inserirNo(noAtual, novoNo) {
      if (novoNo.dado < noAtual.dado) {
          if (noAtual.esquerda === null) {
              noAtual.esquerda = novoNo;
          } else {
              this.inserirNo(noAtual.esquerda, novoNo);
          }
      } else if (novoNo.dado > noAtual.dado) {
          if (noAtual.direita === null) {
              noAtual.direita = novoNo;
          } else {
              this.inserirNo(noAtual.direita, novoNo);
          }
      } else {
          // Se o dado já existe na árvore, não faz nada
          console.log(`O nó com dado ${novoNo.dado} já existe na árvore.`);
      }
  }

    desenharArvore() {
        const container = document.getElementById('arvoreBinaria');
        container.innerHTML = '';
        if (this.raiz !== null) {
            this.desenharNo(container, this.raiz, container.clientWidth / 2, 50, container.clientWidth / 4);
        }
    }

    desenharNo(container, no, x, y, espacamento) {
        const noElement = document.createElement('div');
        noElement.className = 'no';
        noElement.style.left = `${x}px`;
        noElement.style.top = `${y}px`;
        noElement.innerHTML = `<span>${no.dado}</span>`;
        container.appendChild(noElement);

        if (no.esquerda !== null) {
            const linhaEsquerda = this.desenharLinha(x, y, x - espacamento, y + 80);
            container.appendChild(linhaEsquerda);
            this.desenharNo(container, no.esquerda, x - espacamento, y + 80, espacamento / 2);
        }
        if (no.direita !== null) {
            const linhaDireita = this.desenharLinha(x, y, x + espacamento, y + 80);
            container.appendChild(linhaDireita);
            this.desenharNo(container, no.direita, x + espacamento, y + 80, espacamento / 2);
        }
    }

    desenharLinha(x1, y1, x2, y2) {
        // Calcula o ângulo da linha
        const angulo = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        // Calcula a distância entre os pontos
        const comprimento = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        // Cria um elemento div para representar a linha
        const linha = document.createElement('div');
        linha.className = 'linha';
        linha.style.position = 'absolute';
        linha.style.left = `${x1}px`;
        linha.style.top = `${y1}px`;
        linha.style.width = `${comprimento}px`;
        linha.style.height = '0';
        linha.style.borderTop = '2px solid #33a3ee';
        linha.style.transformOrigin = 'left center';
        linha.style.transform = `rotate(${angulo}deg)`;

        return linha;
    }

    remover(dado) {
        this.raiz = this.removerNo(this.raiz, dado);
        this.desenharArvore();
    }

    removerNo(no, dado) {
        if (no === null) {
            return null;
        }
        if (dado < no.dado) {
            no.esquerda = this.removerNo(no.esquerda, dado);
            return no;
        } else if (dado > no.dado) {
            no.direita = this.removerNo(no.direita, dado);
            return no;
        } else {
            if (no.esquerda === null && no.direita === null) {
                return null;
            } else if (no.esquerda === null) {
                return no.direita;
            } else if (no.direita === null) {
                return no.esquerda;
            } else {
                const menorNoDireita = this.encontrarMinimo(no.direita);
                no.dado = menorNoDireita.dado;
                no.direita = this.removerNo(no.direita, menorNoDireita.dado);
                return no;
            }
        }
    }

    preOrdem(no, resultado) {
        if (no === null) return;
        resultado.push(no.dado);
        this.preOrdem(no.esquerda, resultado);
        this.preOrdem(no.direita, resultado);
    }

    emOrdem(no, resultado) {
        if (no === null) return;
        this.emOrdem(no.esquerda, resultado);
        resultado.push(no.dado);
        this.emOrdem(no.direita, resultado);
    }

    posOrdem(no, resultado) {
        if (no === null) return;
        this.posOrdem(no.esquerda, resultado);
        this.posOrdem(no.direita, resultado);
        resultado.push(no.dado);
    }

    encontrarMinimo(no) {
        while (no.esquerda !== null) {
            no = no.esquerda;
        }
        return no;
    }
}

const arvoreBinaria = new ArvoreBinaria();

function adicionarNoArvore() {
    const dado = parseInt(document.getElementById('entradaArvore').value);
    if (!isNaN(dado)) {
        arvoreBinaria.adicionar(dado);
        document.getElementById('entradaArvore').value = '';
    }
}

function removerNoArvore() {
    const dado = parseInt(document.getElementById('removerArvore').value);
    if (!isNaN(dado)) {
        arvoreBinaria.remover(dado);
        document.getElementById('removerArvore').value = '';
    }
}

function mostrarPreOrdem() {
    const resultado = [];
    arvoreBinaria.preOrdem(arvoreBinaria.raiz, resultado);
    document.getElementById('resultadoArvore').innerText = 'Pré-Ordem: ' + resultado.join(', ');
}

function mostrarEmOrdem() {
    const resultado = [];
    arvoreBinaria.emOrdem(arvoreBinaria.raiz, resultado);
    document.getElementById('resultadoArvore').innerText = 'Em-Ordem: ' + resultado.join(', ');
}

function mostrarPosOrdem() {
    const resultado = [];
    arvoreBinaria.posOrdem(arvoreBinaria.raiz, resultado);
    document.getElementById('resultadoArvore').innerText = 'Pós-Ordem: ' + resultado.join(', ');
}
