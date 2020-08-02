const db = firebase.firestore();
firebase.auth().languageCode = 'pt';
let scene_collection = [];

$(document).ready(function () {
  fillUsername(USER);
  getDocumentData();

  $('#logout-btn').click(() => {
    localStorage.removeItem(STORAGE.user_name);
    firebase
      .auth()
      .signOut()
      .then(function () {
        alert(MESSAGES.logout_sucess);
        location.reload();
      })
      .catch(function (error) {
        console.error(error);
        alert(MESSAGES.general_error);
      });
  });
});

function fillUsername(name) {
  if (typeof name !== 'string' || name === '') {
    name = 'anónimo';
    $('#logout-btn').hide();
    $('#create-scenario-btn').hide();
  } else {
    $('#login-btn').hide();
  }
  $('#id-firebase-username').append(name);
}

function getDocumentData() {
  db.collection('scenarios')
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        $('#id-firebase-content').append(
          '<h3>Não foram encontrados cenários</h3>'
        );
      }
      snapshot.docs.map((doc) => {
        let scene = doc.data();
        scene_collection.push({ id: doc.id, ...scene });
        let contenthtml = createCard(
          doc.id,
          scene.title,
          scene.prose.summary,
          scene.caregivers
        );
        $('#id-firebase-content').append(contenthtml);
        if (typeof USER !== 'string' || USER === '') {
          $('.hide-if-no-user').hide();
        }
      });
    })
    .catch((error) => {
      console.error(error);
      $('#id-firebase-content').append(
        '<h3>Ocorreu um erro ao aceder aos cenários</h3>'
      );
      $('#id-firebase-content').append(`<span>Debug info: ${error}</span>`);
    });
}

function removeScenario(Ref) {
  db.collection('scenarios')
    .doc(Ref)
    .delete()
    .then(function () {
      $(`#${Ref}`).empty();
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
      alert(MESSAGES.general_error);
    });
}

function remove_scenario_reference(scenario_ref, ref, title) {
  db.collection(FIRE.scenarios)
    .doc(scenario_ref)
    .update({
      caregivers: firebase.firestore.FieldValue.arrayRemove({
        ref,
        title,
      }),
    })
    .then(() => $(`#${ref}`).empty())
    .catch((e) => console.error(e));
}

function removeCaregiver(scenario_ref, ref, name) {
  db.collection(FIRE.scenarios)
    .doc(scenario_ref)
    .collection(FIRE.caregivers)
    .doc(ref)
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
      remove_scenario_reference(scenario_ref, ref, name);
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
      alert(MESSAGES.general_error);
    });
}

function createCard(id, card_title, card_content, caregivers) {
  let caregiverContent = '';
  if (typeof caregivers !== 'undefined') {
    caregivers.forEach((c) => {
      caregiverContent += addCareGiverContent(id, c.title, c.ref);
    });
  } else {
    caregiverContent = 'Não há cuidadores associados';
  }

  return `
        <div id="${id}" class="card shadow mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="text-primary font-weight-bold m-0">${card_title}</h6>
                <div class="dropdown no-arrow">
                    <button class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">
                        <i class="fas fa-ellipsis-v text-gray-400"></i>
                    </button>
                    <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                        <p class="text-center dropdown-header">Opções:</p>
                        <a class="dropdown-item" role="presentation" href="/viewer?title=${id}">Ver</a>
                        <a class="dropdown-item hide-if-no-user" role="presentation" href="/editor?title=${id}">Editar</a>
                        <div class="dropdown-divider hide-if-no-user"></div>
                        <a class="dropdown-item text-danger hide-if-no-user" role="presentation" onclick="removeScenario('${id}')" href="#">Remover</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    ${caregiverContent}
                    <li class="list-group-item">
                        <span></span>
                        <a href="/caregiver/editor?scenario=${id}" class="btn btn-success btn-circle ml-1 hide-if-no-user" role="button">
                            <i class="fas fa-plus text-white"></i>
                        </a>
                    </li>
                </ul>
                <p class="m-0">${card_content}</p>
            </div>
        </div>
`;
}

function addCareGiverContent(parent, name, Ref) {
  return `
  <li id="${Ref}" class="list-group-item">
    <div class="row">
        <div class="col"><span>${name}</span></div>
        <div class="col d-xl-flex flex-row justify-content-xl-end">
            <a href="/caregiver/viewer?title=${Ref}&scenario=${parent}" class="btn btn-primary btn-icon-split" role="button">
                <span class="text-white-50 icon">
                    <i class="fas fa-eye"></i>
                </span>
                <span class="text-white text">Ver</span>
            </a>
            <a href="/caregiver/editor?title=${Ref}&scenario=${parent}" class="btn btn-info btn-icon-split hide-if-no-user" role="button">
                <span class="text-white-50 icon">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span class="text-white text">Editar</span>
            </a>
            <a href="#" onclick="removeCaregiver('${parent}','${Ref}','${name}')" class="btn btn-danger btn-icon-split hide-if-no-user" role="button">
                <span class="text-white-50 icon">
                    <i class="fas fa-trash"></i>
                </span>
                <span class="text-white text">Remover</span>
            </a>
        </div>
     </div>
    </li>
    `;
}
