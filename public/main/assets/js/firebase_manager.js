const db = firebase.firestore();
let cardList = [];

const scenarios = db.collection("scenarios").get()
    .then(snapshot => {
        snapshot.docs.map(doc => {
            let scene = doc.data();
            console.log(scene);
            cardList.push(createCard(scene.title, scene.main_description_content));
        });
        $("#id-firebase-content").html(cardList);
    })
    .catch(error => {
        console.error(error);
        alert('there has been an error - please check the console');
    });


function createCard(card_title, card_content) {
    return `
        <div class="card shadow mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="text-primary font-weight-bold m-0">${card_title === "" ? "Sem titulo" : card_title}</h6>
                <div class="dropdown no-arrow"><button class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button"><i class="fas fa-ellipsis-v text-gray-400"></i></button>
                    <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
                        role="menu">
                        <p class="text-center dropdown-header">dropdown header:</p><a class="dropdown-item" role="presentation" href="#">&nbsp;Action</a><a class="dropdown-item" role="presentation" href="#">&nbsp;Another action</a>
                        <div class="dropdown-divider"></div><a class="dropdown-item" role="presentation" href="#">&nbsp;Something else here</a></div>
                </div>
            </div>
            <div class="card-body">
                <p class="m-0">${card_content}</p>
            </div>
        </div>
        `;
}
