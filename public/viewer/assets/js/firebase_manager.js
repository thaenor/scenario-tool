let db;

$(document).ready(function () {
  db = firebase.firestore();
  if (get_doc_id()) {
    load_document_data();
  } else {
    alert(MESSAGES.reading_error);
    window.location.href = ROUTES.main;
  }
});

function load_document_data() {
  db.collection(FIRE.scenarios)
    .doc(get_doc_id())
    .get()
    .then((doc) => {
      if (doc.exists) {
        renderDocument(doc.data());
      } else {
        alert(MESSAGES.reading_error);
      }
    })
    .catch((error) => {
      console.error(error);
      alert(MESSAGES.reading_error);
    });
}
