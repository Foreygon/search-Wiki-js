const form = document.querySelector('form');

const search = document.getElementById('search');
const error_msg = document.getElementById('error_msg');

const result = document.getElementById('result');


async function recherche(param) {
    result.innerText = "";
    try {
        const reponse = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${param}`);
        
        const reponseJson = await reponse.json();

        console.log(reponseJson);
        if(reponseJson.query.search.length === 0){

            error_msg.innerHTML = "Votre recherche n'a donné aucun résultat.";
        }else{
            for (let index = 0; index < reponseJson.query.search.length; index++) {

                const element = reponseJson.query.search[index];
             
                        const item = reponseJson.query.search[index];

                        const url = `https://fr.wikipedia.org/?curid=${item.pageid}`;
                        result.insertAdjacentHTML('beforeend' ,
                            `<div class='row'>
                                <div class="boite1"></div>
                                <div class="boite2">
                                    <h2><a href=${url}>${item.title}</a></h2>
                                    <a href=${url}>${url}</a>
                                    <p>${item.snippet}...</p>
                                </div >
                                <div class="boite1"></div>
                            </div><br>`
                            
                        );                    
                    }                
            }
        
    } catch (error) {
        console.log('error');
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(form);


    if(formData.get('search')===""){
        error_msg.innerText = "Vous devez saisir au moins un caractère";
    }else{
        recherche(formData.get('search'));
    }
    },
)
