function areWeOpeningExistingDoc() {
  return get_doc_id() ? true : false;
}

function renderDocument(doc) {
  $('#scenario-title').text(doc.title);
  $('#scenario-persona-name').text(doc.name);
  $('#image-avatar').attr('src', doc.avatar);

  populateCapabilities(doc.capabiltities);
  populateProse(doc.prose);
}

function populateCapabilities(cap) {
  for (const area of Object.keys(cap)) {
    setParam(area, cap[area]);
  }
}

function get_doc_title() {
  return $('#scenario-title').text() || '';
}

function getDocumentData() {
  let title = $('#scenario-title').text() || '';
  let name = $('#scenario-persona-name').text() || '';
  let avatar = $('#image-avatar').attr('src') || '';
  let scenario = {
    title,
    name,
    avatar,
    type: 'caregiver',
    capabiltities: docData.capabilities || '',
    prose: docData.prose || '',
  };

  return scenario;
}
