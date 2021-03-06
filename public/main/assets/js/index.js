const db = firebase.firestore();
firebase.auth().languageCode = 'pt';
let scene_collection = [];
let search_results = [];
let fuse;

$(document).ready(function () {
  fillUsername(USER);
  getDocumentData();
  registerSearchEvts();

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
  setTimeout(() => {
    init_tooltips();
  }, 1000);
});

function init_tooltips() {
  $('[data-toggle="tooltip"]').tooltip()
}

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
      snapshot.docs.map((doc, i) => {
        let scene = doc.data();
        scene_collection.push({ id: doc.id, ...scene });
        let contenthtml = createCard(
          doc.id,
          scene.title,
          scene.prose.summary.substring(0, 150).concat('...'),
          scene.caregivers,
          scene.author
        );
        $('#id-firebase-content').append(contenthtml);
        if (typeof USER !== 'string' || USER === '') {
          $('.hide-if-no-user').remove();
        }

        if(i === snapshot.docs.length - 1) {
          fuse = new Fuse(scene_collection, {
            ignoreLocation: true,
            keys: ['name', 'title', 'author', 'prose.summary', 'caregiver.title' ]
          });
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
  let flag = confirm('Deseja remover este cenário?');
  if (flag) {
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
  let flag = confirm('Deseja remover este cuidador?');
  if (flag) {
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
}

function createCard(id, card_title, card_content, caregivers, author) {
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
           <div class="card-header d-flex">
              <div class="mr-auto p-2" style="margin-top:10px">
                <h6 class="text-primary font-weight-bold m-0">${card_title}</h6>
              </div>
              <div class="p-2">
                <a href="/caregiver/editor?scenario=${id}"
                  class="btn btn-primary btn-circle ml-1 hide-if-no-user"
                  data-toggle="tooltip" data-placement="top" title="Adicionar cuidador">
                  <i class="fas fa-plus text-white"></i>
                </a>
                <a href="/viewer?title=${id}"
                   class="btn btn-primary btn-circle ml-1"
                   data-toggle="tooltip" data-placement="top" title="Ver cenário">
                  <i class="fas fa-eye text-white"></i>
                </a>
                <a href="/editor?title=${id}"
                   class="btn btn-primary btn-circle ml-1 hide-if-no-user"
                   data-toggle="tooltip" data-placement="top" title="Alterar cenário">
                  <i class="fas fa-pencil-alt text-white"></i>
                </a>
                <a onclick="removeScenario('${id}')" href="#"
                   class="btn btn-danger btn-circle ml-1 hide-if-no-user"
                   role="button"
                   data-toggle="tooltip" data-placement="top" title="Remover cenário">
                  <i class="fas fa-trash text-white"></i>
                </a>
              </div>
              <div class="p-2">
                <div class="dropdown no-arrow">
                  <button class="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">
                    <i class="fas fa-ellipsis-v text-gray-400"></i>
                  </button>
                  <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in" role="menu">
                    <p class="text-center dropdown-header">Opções:</p>
                    <a class="dropdown-item hide-if-no-user" role="presentation" href="/caregiver/editor?scenario=${id}">
                      <i class="fas fa-plus"></i>
                      Adicionar cuidador
                    </a>
                    <a class="dropdown-item" role="presentation" href="/viewer?title=${id}">
                      <i class="fas fa-eye"></i>
                      Ver
                    </a>
                    <a class="dropdown-item hide-if-no-user" role="presentation" href="/editor?title=${id}">
                      <i class="fas fa-pencil-alt"></i>
                        Editar
                    </a>
                    <div class="dropdown-divider hide-if-no-user"></div>
                      <a class="dropdown-item text-danger hide-if-no-user" role="presentation" onclick="removeScenario('${id}')" href="#">
                        <i class="fas fa-trash"></i>
                        Remover
                      </a>
                    </div>
                </div>
              </div>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    ${caregiverContent}
                </ul>
                <p class="m-0">${card_content}</p>
                ${author}
           </div>
        </div>
`;
}

function addCareGiverContent(parent, name, Ref) {
  return `
  <li id="${Ref}" class="list-group-item">
    <div class="row" data-toggle="collapse" data-target="#collapseExample-${Ref}" aria-expanded="false" aria-controls="collapseExample-${Ref}">
        <div class="col"><span>${name} - (clique para ver opções)</span></div>
        <i class="fas fa-sort-down"></i>
     </div>
     <div class="collapse" id="collapseExample-${Ref}">
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
    </li>
    `;
}


function registerSearchEvts() {
  $("#searchBtn").click(evt => {
    const txt = $("#searchField").val();

    search_results = fuse.search(txt);


    if(search_results.length <= 0) {
      $('#id-firebase-content').prepend('<h1>A pesquisa não retornou quaisquer resultados</h1>');
      search_results = scene_collection;
    }

    $("#id-firebase-content").empty();
    search_results.forEach( el => {
      if(el.item) {
        el = el.item;
      }
      let contenthtml = createCard(
        el.id,
        el.title,
        el.prose.summary.substring(0, 150).concat('...'),
        el.caregivers,
        el.author
      );
      $('#id-firebase-content').append(contenthtml);
      if (typeof USER !== 'string' || USER === '') {
        $('.hide-if-no-user').remove();
      }
    });


  })
}
