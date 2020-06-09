const db = firebase.firestore();
let card_list = [];

const scenarios = db.collection("scenarios").get()
    .then(snapshot => {
        snapshot.docs.map(doc => {
            let scene = doc.data();
            let contenthtml = createCard(doc.id, scene.title, scene.main_description_content);
            card_list.push(contenthtml);
        });
        $("#id-firebase-content").html(card_list);
    })
    .catch(error => {
        console.error(error);
        alert('there has been an error - please check the console');
    });


function createCard(id, card_title, card_content) {
    return `
        <div class="card shadow mb-4" id="${id}">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="text-primary font-weight-bold m-0">${card_title}</h6>
                <div class="dropdown no-arrow">
                    <button class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">
                        <i class="fas fa-ellipsis-v text-gray-400"></i>
                    </button>
                    <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                        <p class="text-center dropdown-header">Opções:</p>
                        <a class="dropdown-item" role="presentation" href="/view?title=${id}">&nbsp;Ver</a>
                        <a class="dropdown-item" role="presentation" href="/creator?title=${id}">&nbsp;Editar</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" role="presentation" href="#" onclick="removeDocument(${id})">&nbsp;Remover</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <p class="m-0">${card_content || "sem descrição"}</p>
            </div>
        </div>
        `;
}

function removeDocument(doc_title) {
    db.collection("scenarios").doc(doc_title).delete().then(function() {
        console.log("Document successfully deleted!");
        $(`#${card_title}`).empty();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        alert('there has been an error - please check the console');
    });
} 