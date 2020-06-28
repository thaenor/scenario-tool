$(document).ready(function () {
  if (areWeOpeningExistingDoc()) {
    //we are editing an existing doc
    let data = load_document_data();
  }

  $('#save-button').click((e) => {
    let scenario = getDocumentData();
    saveNewDocData(scenario);
  });
});

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
    console.log(area);
    console.log(data[area]);
    setSupport(area, data[area]);
  }
}

function populateProse(doc) {
  quills.summary_quill.root.innerHTML = doc.summary;
  quills.person_quill.root.innerHTML = doc.person;
  quills.background_quill.root.innerHTML = doc.background;
  quills.dificulties_quill.root.innerHTML = doc.difficulties;
  quills.social_quill.root.innerHTML = doc.social;
  quills.family_quill.root.innerHTML = doc.family;
  quills.emotion_quill.root.innerHTML = doc.emotional;
  quills.additional_quill.root.innerHTML = doc.additional;
}

function getDocumentData() {
  let title = $('#scenario-title').text() || '';
  let name = $('#scenario-persona-name').text() || '';
  let avatar = $('#image-avatar').attr('src') || '';
  let scenario = {
    title,
    name,
    avatar,
    capabiltities: docData.capabilities || '',
    support: docData.support || '',
    selfcare: docData.selfcare || '',
    prose: docData.prose || '',
  };

  return scenario;
}
