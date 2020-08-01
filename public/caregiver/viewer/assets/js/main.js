function populateProse(doc) {
  $('#Loading-text-block').remove();
  $('#Loading-text-block-1').remove();
  $('#Loading-text-block-2').remove();

  $('#person').html(doc.person);
  $('#data').html(doc.data);
  $('#evolution').html(doc.evolution);
}

function load_document_data(scenario_id, caregiver_id) {
  db = firebase.firestore();
  db.collection(FIRE.scenarios)
    .doc(scenario_id)
    .collection(FIRE.caregivers)
    .doc(caregiver_id)
    .get()
    .then((doc) => {
      doc.exists
        ? renderDocument(doc.data())
        : localtion.replace('/404');
    })
    .catch((error) => {
      console.error(error);
      alert(MESSAGES.general_error);
    });
}

$(document).ready(function () {
  let caregiver_id = get_doc_id();
  let scenario_id = get_doc_id_second_param();

  load_document_data(scenario_id, caregiver_id);
});
