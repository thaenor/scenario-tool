$(document).ready(function () {
  if (areWeOpeningExistingDoc()) {
    //we are editing an existing doc
    let data = load_document_data();
  }
});

function areWeOpeningExistingDoc() {
  return get_doc_id() ? true : false;
}

function renderDocument(doc) {
  $('#scenario-title').text(doc.title);
  $('#scenario-persona-name').text(doc.name);
  $('#image-avatar').attr('src', doc.avatar);

  populateCapabilities(doc.capabiltities);
  populateSelfcare(doc.selfcare);
  populateSupport(doc.support);
  populateProse(doc.prose);
}

function populateCapabilities(cap) {
  for (const area of Object.keys(cap)) {
    setCapabiltities(area, cap[area]);
  }
}

function populateSelfcare(data) {
  for (const area of Object.keys(data)) {
    setSelfcare(area, data[area]);
  }
}

function populateSupport(data) {
  for (const area of Object.keys(data)) {
    setSupport(area, data[area]);
  }
}

function getDocumentData() {
  let title = $('#scenario-title').text() || '';
  let name = $('#scenario-persona-name').text() || '';
  let avatar = $('#image-avatar').attr('src') || '';
  let scenario = {
    title,
    name,
    avatar,
    type: 'patient',
    capabiltities: docData.capabilities || '',
    support: docData.support || '',
    selfcare: docData.selfcare || '',
    prose: docData.prose || '',
  };

  return scenario;
}
