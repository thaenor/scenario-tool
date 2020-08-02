let db;
let editMode = false;

$(document).ready(function () {
  toggle_confirm_on_exit(true);
  db = firebase.firestore();
  editMode = get_doc_id() ? true : false;
  editMode && load_document_data();

  $('#save-button').click((e) => {
    let scenario = getDocumentData();
    if (typeof scenario.title !== 'string' || scenario.title === '') {
      scenario.title = 'Cenário sem titulo';
    }
    save_document(scenario);
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
      doc.exists ? renderDocument(doc.data()) : window.location.replace(ROUTES.not_found);
    })
    .catch((error) => {
      console.error(error);
      alert(MESSAGES.general_error);
    });
}

function save_document(scenario_contents) {
  editMode
    ? update_document(scenario_contents)
    : create_document(scenario_contents);
}

function update_document(contents) {
  contents.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(get_doc_id())
    .update(contents)
    .then(function () {
      toggle_confirm_on_exit(false);
      alert(MESSAGES.update_scenario_succes);
    })
    .catch(function (error) {
      alert(MESSAGES.save_scenario_error);
      console.error('Error writing document: ', error);
    });
}

function create_document(contents) {
  contents.author = USER;
  contents.created_at = firebase.firestore.FieldValue.serverTimestamp();
  contents.updated_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .add(contents)
    .then(function (docRef) {
      toggle_confirm_on_exit(false);
      alert(MESSAGES.save_scenario_succes);
      next_steps(docRef);
    })
    .catch(function (error) {
      alert(save_scenario_error);
      console.error('Error adding document: ', error);
    });
}

function next_steps(docRef) {
  const choice = confirm(MESSAGES.save_scenario_next_steps);
  if (choice) {
    window.location = `${ROUTES.caregiver.editor}?scenario=${docRef.id}`;
  }
}
