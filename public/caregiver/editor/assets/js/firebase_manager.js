let db;
let editMode = false;
let scenario_id, document_id, loaded_scenario;

$(document).ready(function () {
  toggle_confirm_on_exit(true);
  db = firebase.firestore();
  validate_scenario_id();
  document_id = get_doc_id();
  editMode = document_id ? true : false;
  editMode && load_document_data();

  $('#save-button').click((e) => {
    let doc = getDocumentData();
    if (typeof doc.title !== 'string' || doc.title === '') {
      doc.title = 'Cuidador sem titulo';
    }
    save_document(doc);
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
    .doc(document_id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        loaded_scenario = doc.data();
        renderDocument(doc.data());
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
  delete contents.created_at;
  delete contents.author;
  contents.edited_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .doc(document_id)
    .update(contents)
    .then(() => {
      toggle_confirm_on_exit(false);
      remove_caregiver_in_scenario();
      add_to_scenario_caregivers(document_id, contents.title);
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
      editMode = true;
      document_id = ref.id;
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
    .catch((e) => alert(e));
}

function remove_caregiver_in_scenario() {
  debugger;
  if(loaded_scenario.title === undefined) {
    alert('failed to update parent document');
    return;
    throw new Error('failed to update parent document')
  }
  const entryToRemove = { title: loaded_scenario.title, ref: document_id };
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
