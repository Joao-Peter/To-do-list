//Criando variáveis
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || [];
/*
    Local Storage é o armazenamento local. Para que as informações da lista não sejam perdidas conforme 
    JSON (JavaScript Object Notation) é uma notação que permite que eu grave informações no local storage, já que este não entende informações
em forma de vetor e precisa de uma outra forma de expressar as informações.
*/ 
//-----------------

//Criando funções
function adicionarTarefas()
{
    listElement.innerHTML = ''; //Todos os elementos da lista que já estão no HTML serão considerados nulos;
    /*
        A 'for' a seguir é especifica para uma array de strings. Ela percorrerá cada uma das strings da array
    "tarefas", cada string será denominada, nesse cado, de "tarefa", enquanto ela for o enfoque da 'for'.
    */
    for (tarefa of tarefas)
    {
        var tarefaElement = document.createElement('li');
        var textElement = document.createTextNode(tarefa + "    ");
        tarefaElement.appendChild(textElement);

        var buttonElement2 = document.createElement('button');
        var buttonText = document.createTextNode('Excluir');
        buttonElement2.appendChild(buttonText);

        var posicao = tarefas.indexOf(tarefa);
        /*
            O método indexOf retorna a posição de um determinado fator de um array. Nesse caso, ele irá retornar a posição do valor "tarefa", na
        array "tarefas".
        */ 
        buttonElement2.setAttribute('onclick', 'excluirTarefa(' + posicao + ')');
            
        tarefaElement.appendChild(buttonElement2);

        listElement.appendChild(tarefaElement); 
    }
}

function adicionarItem()
{
    if(inputElement.value != '')
    {
        var textElement = inputElement.value;
        tarefas.push(textElement);
        adicionarTarefas();
        inputElement.value = '';
        saveToStorage();
    }
}

function excluirTarefa(posicao)
{
    tarefas.splice(posicao, 1)
    /*
        O método splice deleta um número determinado de elementos, nesse caso 1, de um array, de acordo 
    com a posição especificada. Nesse exemplo, o valor de posição corresponde ao valor de entrada da 
    variável "posição".
    */ 
    adicionarTarefas();
    /* 
        Executar a função adicionarTarefas, para carregar as tarefas sem a tarefa excluída.
    */
    saveToStorage();
}

function saveToStorage()
{
    localStorage.setItem('lista_tarefas', JSON.stringify(tarefas));
}

function verificarTecla(e)
{
    if(e.which == 13)  //13 = Enter (em ASCII)
    {
       adicionarItem();
    }
}
//---------------

adicionarTarefas();
buttonElement.onclick = adicionarItem;

inputElement.addEventListener('keypress', verificarTecla, false); 



