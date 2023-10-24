//Fonction pour afficher les projets//
export function afficherWorks(works){
    for(let i=0; i< works.length;i++ ){
        const gallery =document.querySelector('.gallery')
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        const figCaption= document.createElement('figcation')
        gallery.appendChild(figure)
        figure.appendChild(img)
        figure.appendChild(figCaption)
        img.src= works[i].imageUrl
        figCaption.innerText= works[i].title
    }
}

//fonction pour generer les bouttons de filtre//
export function creerFiltres(categories){
    for (let i=0; i < categories.length ;i++){
        const zoneButtons = document.querySelector('.filtres')
        const buttonFilters = document.createElement('button')    
        zoneButtons.appendChild(buttonFilters)
        buttonFilters.innerText = categories[i].name
        buttonFilters.id= categories[i].id
    }
    listenerButtons()
}
function listenerButtons(){
let  buttons= document.querySelectorAll('.filtres button')
    for(let i=0; i < buttons.length; i ++){
        buttons[i].addEventListener('click', event =>{
            var categoryId = event.target.id;
           filtrerWorks(categoryId)
    })
 }}
 function filtrerWorks(categoryId){
    let work  = fetch('http://localhost:5678/api/works').then(work=>work.json()) 
    work.then(work=> {
    var workFiltre = work.filter(work => work.categoryId == categoryId)
    document.querySelector('.gallery').innerHTML=''
    if (categoryId=== 'reset'){
        afficherWorks(work)

    }else{
    
 afficherWorks(workFiltre)}
})}



