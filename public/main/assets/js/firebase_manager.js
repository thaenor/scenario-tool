const db = firebase.firestore();

$(document).ready(function () {
  getDocumentData();
});

function getDocumentData(){
  db.collection('scenarios')
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        let scene = doc.data();
        let c_id = scene.caregiver_id;

        let contenthtml = createCard(
          doc.id,
          scene.title,
          scene.prose.summary
        );
        $('#id-firebase-content').append(contenthtml);

        if(typeof(c_id) !== "undefined") {
          //TODO: Support multiple caregivers
          // The scenario has associated caregivers
          db.collection('caregivers').doc(c_id).get()
          .then( c_doc => {
            caregiverDoc = c_doc.data();
            const content = createCaregiverHeader(caregiverDoc.id, caregiverDoc.title);
            $(`#firebase-caregiver-section-${doc.id}`).append(content);
          })
        }
      });
    })
    .catch((error) => {
      console.error(error);
      alert('there has been an error - please check the console');
    })
}

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
                  <p class="text-center dropdown-header">Opções do cenário:</p>
                  <a class="dropdown-item" role="presentation" href="/viewer?title=${id}">&nbsp;Ver</a>
                  <a class="dropdown-item" role="presentation" href="/editor?title=${id}">&nbsp;Editar</a>
                  <a class="dropdown-item" role="presentation" href="/#" onclick="duplicateDocument('scenario','${id}')">&nbsp;Duplicar</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item delete-btn" role="presentation" href="#" onclick="removeDocument('scenario','${id}')">&nbsp;Remover</a>
              </div>
            </div>
          </div>

          <div id="firebase-caregiver-section-${id}" class="card-header d-flex justify-content-between align-items-center"></div>
          
          <div class="card-body">
              <p class="m-0">${card_content || 'sem descrição'}</p>
          </div>
        </div>
        `;
}

function createCaregiverHeader(id, name) {
  return `
    <h6 class="font-weight-bold m-0">Cuidador: ${name}</h6>
    <div class="dropdown no-arrow">
      <button class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">
          <i class="fas fa-ellipsis-v text-gray-400"></i>
      </button>
      <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
          <p class="text-center dropdown-header">Opções do cuidador:</p>
          <a class="dropdown-item" role="presentation" href="/caregiver/viewer?title=${id}">&nbsp;Ver</a>
          <a class="dropdown-item" role="presentation" href="/caregiver/editor?title=${id}">&nbsp;Editar</a>
          <a class="dropdown-item" role="presentation" href="/#" onclick="duplicateDocument('caregiver','${id}')">&nbsp;Duplicar</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item delete-btn" role="presentation" href="#" onclick="removeDocument('caregiver','${id}')">&nbsp;Remover</a>
      </div>
    </div>
  `;
}

function removeDocument(type, doc_title) {
  let collection = type === 'scenario' ? 'scenarios' : 'caregivers';
  db.collection(collection)
    .doc(doc_title)
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
      //TODO: remove this dynamically to avoid unecessary load
      location.reload();
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
      alert('there has been an error - please check the console');
    });
}

function duplicateDocument(type, doc_id) {
  let collection = type === 'scenario' ? 'scenarios' : 'caregivers';
  alert(`Not implemented - should duplicate ${type} ${doc_id}`)
}