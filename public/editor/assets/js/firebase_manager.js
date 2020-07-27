let db;
let editMode = false;

$(document).ready(function () {
  db = firebase.firestore();
  editMode = get_doc_id() ? true : false;
  editMode && load_document_data();

  $('#save-button').click((e) => {
    let scenario = getDocumentData();
    if (typeof scenario.title !== 'string' || scenario.title === '') {
      scenario.title = 'Cenário sem titulo';
    }
    saveDocData(scenario);
  });

  $('#scenario-title').one('click', (e) => {
    $('#scenario-title').html('');
  });
  $('#scenario-persona-name').one('click', (e) => {
    $('#scenario-persona-name').html('');
  });
});

function load_document_data() {
  db.collection(FIRE.scenarios)
    .doc(get_doc_id())
    .get()
    .then((doc) => {
      doc.exists
        ? renderDocument(doc.data())
        : console.warn('Document not found');
    })
    .catch((error) => {
      console.error(error);
      alert(MESSAGES.general_error);
    });
}

function saveDocData(scenario_contents) {
  editMode
    ? updateExistingDoc(scenario_contents)
    : createNewDoc(scenario_contents);
}

function updateExistingDoc(contents) {
  contents.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(get_doc_id())
    .set(contents)
    .then(function () {
      alert(MESSAGES.update_scenario_succes);
    })
    .catch(function (error) {
      alert(MESSAGES.save_scenario_error);
      console.error('Error writing document: ', error);
    });
}

function createNewDoc(contents) {
  contents.author = USER;
  contents.created_at = firebase.firestore.FieldValue.serverTimestamp();
  contents.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .add(contents)
    .then(function (docRef) {
      alert(MESSAGES.save_scenario_succes);
      nextSteps(docRef, contents.caregivers);
    })
    .catch(function (error) {
      alert(save_scenario_error);
      console.error('Error adding document: ', error);
    });
}

function nextSteps(docRef, caregiverList) {
  const nextSteps = confirm(MESSAGES.save_scenario_next_steps);

  if (nextSteps) {
    sessionStorage.setItem(STORAGE.scenario_id, docRef.id);
    sessionStorage.setItem(STORAGE.scenario_contents, caregiverList);
    if (nextSteps) {
      window.location = ROUTES.caregiver.editor;
    }
  }
}
