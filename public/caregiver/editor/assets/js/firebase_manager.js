let db;
let editMode = false;
let scenario_id;

$(document).ready(function () {
  db = firebase.firestore();
  validate_scenario_id();
  editMode = get_doc_id() ? true : false;
  editMode && load_document_data();

  $('#save-button').click((e) => {
    let scenario = getDocumentData();
    saveDocData(scenario);
  });
});

function validate_scenario_id() {
  scenario_id = sessionStorage.getItem(STORAGE.scenario_id);
  sessionStorage.removeItem(STORAGE.scenario_id);
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
  contents.edited_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .doc(get_doc_id())
    .set(contents)
    .then((ref) => {
      nextSteps(ref);
    })
    .catch(function (error) {
      alert(MESSAGES.save_caregiver_error);
      console.error('Error adding document: ', error);
    });
}

function createNewDoc(contents) {
  contents.author = USER;
  contents.created_at = firebase.firestore.FieldValue.serverTimestamp();
  contents.edited_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .add(contents)
    .then((ref) => {
      add_to_scenario_caregivers(ref.id, contents.title);
      nextSteps(ref);
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
    .then((suc) => console.log('scenario caregivers updated sucessfully'))
    .catch((e) => console.error(e));
}

function updateScenario(ref, caregiver_name) {
  let associated_caregivers = window.sessionStorage.getItem(
    STORAGE.scenario_contents
  );

  db.collection(FIRE.scenarios).doc(scenario_id).update({ caregivers });
}

function nextSteps(docRef) {
  alert(MESSAGES.save_caregiver_success + ` ${scenario_id}`);
  // Idea: Would you like to add another caregiver?
}
