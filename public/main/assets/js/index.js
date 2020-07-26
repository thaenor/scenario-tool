const db = firebase.firestore();

$(document).ready(function () {
  fillUsername(USER);
  getDocumentData();
});

function fillUsername(name) {
  if (typeof name !== 'string' || name === '') {
    name = 'anónimo';
    $('#logout-btn').hide();
    $('#create-scenario-btn').hide();
  }
  $('#id-firebase-username').append(name);
}

function getDocumentData() {
  db.collection('scenarios')
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        let scene = doc.data();
        let c_id = scene.caregiver_id;

        let contenthtml = createCard(
          doc.id,
          scene.title,
          scene.prose.summary,
          scene.caregivers
        );
        $('#id-firebase-content').append(contenthtml);
      });
    })
    .catch((error) => {
      console.error(error);
      alert('there has been an error - please check the console');
    });
}

function removeCaregiver(Ref) {
  alert('Not implemented - look into deleting form subcollections');
  return;
  db.collection('scenarios')
    .doc(Ref)
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

function removeScenario(Ref) {
  db.collection('scenarios')
    .doc(Ref)
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

function createCard(id, card_title, card_content, caregivers) {
  let caregiverContent = '';
  if (typeof caregivers !== 'undefined') {
    caregivers.forEach((c) => {
      caregiverContent += addCareGiverContent(c.Name, c.Ref);
    });
  } else {
    caregiverContent = 'Não há cuidadores associados';
  }

  return `
        <div class="card shadow mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="text-primary font-weight-bold m-0">${card_title}</h6>
                <div class="dropdown no-arrow">
                    <button class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">
                        <i class="fas fa-ellipsis-v text-gray-400"></i>
                    </button>
                    <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                        <p class="text-center dropdown-header">Opções:</p>
                        <a class="dropdown-item" role="presentation" href="/viewer?title=${id}">Ver</a>
                        <a class="dropdown-item" role="presentation" href="/editor?title=${id}">Editar</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" role="presentation" onclick="removeScenario('${id}')" href="#">Remover</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">
                    ${caregiverContent}
                    </li>
                    <li class="list-group-item">
                        <span></span>
                        <a href="/caregiver/editor?scenarioref=${id}" class="btn btn-success btn-circle ml-1" role="button">
                            <i class="fas fa-plus text-white"></i>
                        </a>
                    </li>
                </ul>
                <p class="m-0">${card_content}</p>
            </div>
        </div>
`;
}

function addCareGiverContent(name, Ref) {
  return `
    <div class="row">
        <div class="col"><span>${name}</span></div>
        <div class="col d-xl-flex flex-row justify-content-xl-end">
            <a href="/caregiver/viewer?title=${Ref}" class="btn btn-primary btn-icon-split" role="button">
                <span class="text-white-50 icon">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="text-white text">Ver</span>
            </a>
            <a href="/caregiver/editor?title=${Ref}" class="btn btn-info btn-icon-split" role="button">
                <span class="text-white-50 icon">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="text-white text">Editar</span>
            </a>
            <a onclick="removeCaregiver('${Ref}')" class="btn btn-danger btn-icon-split" role="button">
                <span class="text-white-50 icon">
                    <i class="fas fa-trash"></i>
                </span>
                <span class="text-white text">Remover</span>
            </a>
        </div>
    </div>
    `;
}
