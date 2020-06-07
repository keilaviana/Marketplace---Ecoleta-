
// registrando função
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // função anonima que está retornando um valor
    .then( res =>  res.json())
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
    } )
}


populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value= event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML="<option value> Selecione a Cidade</option>"
    citySelect.disabled =true

    fetch(url)
    // função anonima que está retornando um valor
    .then( res =>  res.json())
    .then( cities => {
        

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false

        
    } )

}

// ()=>{} -> outro jeito de criar função anonima
document
    .querySelector("select[name=uf]")
     // ouvidor de evento
     .addEventListener("change", getCities)





// Itens de Coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li") 

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectItems =[]

function handleSelectedItem(event){
    const itemLi = event.target
    // adiconar ou remover uma classe com javaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    
    

    // verificar se existem items selecionados, se sim 
    // pegar os itens selecionados

    const alreadySelected = selectItems.findIndex(item => {
        const itemFound = item == itemId   //isso é true ou false
        return item == itemId
    })

    

    //se já estiver selecionado,

    if(alreadySelected >= 0){
        //  tirar da seleção
        const filteredItems = selectItems.filter(item =>{
            const itemIsDifferent = item != itemId  //false
            return itemIsDifferent
        })

        selectItems = filteredItems
     } else {
         //se não estiver selecionado
        //   adicionar à seleção
        selectItems.push(itemId)
         
     }

    //atualizar o comapo escondido com os itens selecionados
    collectedItems.value=selectItems
}
