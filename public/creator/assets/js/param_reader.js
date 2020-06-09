$(document).ready(function () {
  if (is_loaded_doc()) {
    load_document_data(get_doc_id());
  }
});

function get_doc_id() {
  return getParams(window.location.href).title;
}

function is_loaded_doc() {
  return get_doc_id() ? true : false;
}

function render_document(doc) {
  $('#scenario-title').text(doc.title);
  $('#scenario-persona-name').text(doc.name);
  $('#image-avatar').attr('src', doc.avatar);

  // Set the capacity section - these methods also set the global state
  toggle_capacity_badge(doc.capabilities.cognitive);
  toggle_capacity_badge(doc.capabilities.economic);
  toggle_capacity_badge(doc.capabilities.memory);
  toggle_capacity_badge(doc.capabilities.physical);

  // Set the Progress bars section - these methods also set the global state
  set_progress_bar(`phy-step-${doc.profile.physical}`);
  set_progress_bar(`emo-step-${doc.profile.emotional}`);
  set_progress_bar(`soc-step-${doc.profile.social}`);
  set_progress_bar(`fam-step-${doc.profile.family}`);

  // Insert loaded HTML so it appears in the page
  $('#section-main-data').html(doc.main_description_content);
  $('#section-about').html(doc.about_content);
  $('#section-limitations').html(doc.limitations_content);
  $('#section-physical').html(doc.physical_content);
  $('#section-emotional').html(doc.emotional_content);
  $('#section-social').html(doc.social_content);
  $('#section-family').html(doc.family_content);

  // Add the HTML content to the modal so Quill also has access
  quill_main_description.root.innerHTML = doc.main_description_content;
  quill_about.root.innerHTML = doc.about_content;
  quill_limitations.root.innerHTML = doc.limitations_content;
  quill_physical.root.innerHTML = doc.physical_content;
  quill_emotional.root.innerHTML = doc.emotional_content;
  quill_social.root.innerHTML = doc.social_content;
  quill_family.root.innerHTML = doc.family_content;

  // Populate globals as well so when saving, we won't accidentaly overwritte
  main_description_content = doc.main_description_content;
  about_content = doc.about_content;
  limitations_content = doc.limitations_content;
  physical_content = doc.physical_content;
  emotional_content = doc.emotional_content;
  social_content = doc.social_content;
  family_content = doc.family_content;
}

function load_document_data(id) {
  const doc_ref = db.collection('scenarios').doc(id);

  doc_ref
    .get()
    .then((doc) => {
      if (doc.exists) {
        render_document(doc.data());
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
