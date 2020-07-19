let db;

$(document).ready(function () {
  db = firebase.firestore();
});

function get_doc_id() {
  return getParams(window.location.href).title;
}

function load_document_data() {
  let id = get_doc_id();
  let type = window.location.href.search("caregiver");
  const collection = type !== -1 ? 'caregivers' : 'scenarios';
  const doc_ref = db.collection(collection).doc(id);

  doc_ref
    .get()
    .then((doc) => {
      if (doc.exists) {
        renderDocument(doc.data());
      } else {
        console.warn('Document not found');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('there has been an error, please check the console for details');
    });
}

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
const getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};