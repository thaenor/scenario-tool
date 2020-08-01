let db;
let editMode = false;
let scenario_id;

$(document).ready(function () {
  toggle_confirm_on_exit(true);
  db = firebase.firestore();
  validate_scenario_id();
  editMode = get_doc_id() ? true : false;
  editMode && load_document_data();

  $('#save-button').click((e) => {
    let doc = getDocumentData();
    if (typeof doc.title !== 'string' || doc.title === '') {
      doc.title = 'Cuidador sem titulo';
    }
    save_document(doc);
  });

  $('#scenario-title').one('click', (e) => {
    $('#scenario-title').html('');
  });
  $('#scenario-persona-name').one('click', (e) => {
    $('#scenario-persona-name').html('');
  });
});

function validate_scenario_id() {
  scenario_id = get_doc_id_second_param();
  if (typeof scenario_id !== 'string') {
    alert(MESSAGES.caregiver_needs_context);
    window.location.replace(ROUTES.root);
  }
}

function load_document_data() {
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .doc(get_doc_id())
    .get()
    .then((doc) => {
      if (doc.exists) {
        renderDocument(doc.data());
        editMode && remove_caregiver_in_scenario();
      } else {
        console.warn('Document not found');
        window.location.replace(ROUTES.not_found);
      }
    })
    .catch((error) => {
      console.error(error);
      alert(MESSAGES.general_error);
    });
}

function save_document(doc_contents) {
  editMode
    ? update_document(doc_contents)
    : create_document(doc_contents);
}

function update_document(contents) {
  contents.edited_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .doc(get_doc_id())
    .set(contents)
    .then(() => {
      toggle_confirm_on_exit(false);
      add_to_scenario_caregivers(get_doc_id(), contents.title);
    })
    .catch(function (error) {
      alert(MESSAGES.save_caregiver_error);
      console.error('Error adding document: ', error);
    });
}

function create_document(contents) {
  contents.author = USER;
  contents.created_at = firebase.firestore.FieldValue.serverTimestamp();
  contents.edited_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .add(contents)
    .then((ref) => {
      toggle_confirm_on_exit(false);
      add_to_scenario_caregivers(ref.id, contents.title);
    })
    .catch(function (error) {
      alert(MESSAGES.save_caregiver_error);
      console.error('Error adding document: ', error);
    });
}

function add_to_scenario_caregivers(ref, title) {
  const newEntry = { title, ref };
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .update({
      caregivers: firebase.firestore.FieldValue.arrayUnion(newEntry),
    })
    .then(() => alert(MESSAGES.save_caregiver_success))
    .catch((e) => console.error(e));
}

function remove_caregiver_in_scenario() {
  const entryToRemove = { title: get_doc_title(), ref: get_doc_id() };
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .update({
      caregivers: firebase.firestore.FieldValue.arrayRemove(entryToRemove),
    })
    .then((s) => {
      console.log('removed entry in parent scenario');
    })
    .catch((r) => console.error(r));
}
