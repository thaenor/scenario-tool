let db;
let editMode = false;
let scenario_id;

$(document).ready(function () {
  db = firebase.firestore();
  editMode = get_doc_id() ? true : false;
  editMode && load_document_data();
  scenario_id = sessionStorage.getItem(STORAGE.scenario);
  sessionStorage.removeItem(STORAGE.scenario);

  if (typeof scenario_id !== 'string') {
    alert(MESSAGES.caregiver_needs_context);
    window.location.replace = ROUTES.root;
  }

  $('#save-button').click((e) => {
    let scenario = getDocumentData();
    saveDocData(scenario);
  });
});

function load_document_data() {
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .get(get_doc_id())
    .then((doc) => {
      doc.exits
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
  contents.author = USER.name;
  contents.created_at = firebase.firestore.FieldValue.serverTimestamp();
  contents.edited_at = firebase.firestore.FieldValue.serverTimestamp();
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .add(contents)
    .then((ref) => {
      nextSteps(ref);
    })
    .catch(function (error) {
      alert(MESSAGES.save_caregiver_error);
      console.error('Error adding document: ', error);
    });
}

function updateScenario(ref, caregiver_name) {
  let associated_caregivers = window.sessionStorage.getItem(
    STORAGE.scenarionContents
  );

  db.collection(FIRE.scenarios).doc(scenario_id).update({ caregivers });
}

function nextSteps(docRef) {
  alert(MESSAGES.save_caregiver_success + ` ${scenario_id}`);
  // Idea: Would you like to add another caregiver?
}