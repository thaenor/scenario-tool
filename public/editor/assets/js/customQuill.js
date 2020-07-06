let quills = {
  summary_quill: {},
  background_quill: {},
  person_quill: {},
  dificulties_quill: {},
  social_quill: {},
  family_quill: {},
  emotion_quill: {},
  additional_quill: {},
};

$(document).ready(() => {
  const options = {
    debug: 'warning',
    theme: 'snow',
  };
  const summary = document.getElementById('editor-summary');
  const antecedentes = document.getElementById('editor-antecedentes');
  const person_data = document.getElementById('editor-person-data');
  const dificulties = document.getElementById('editor-dificulties');
  const social = document.getElementById('editor-social');
  const family = document.getElementById('editor-family');
  const emotion = document.getElementById('editor-emotional');
  const additional = document.getElementById('editor-additiona-data');

  quills.summary_quill = new Quill('#editor-summary', {
    placeholder: 'Escreva aqui um resumo do caso...',
    bounds: summary,
    ...options,
  });

  quills.background_quill = new Quill('#editor-antecedentes', {
    placeholder: 'Escreva aqui sobre os antecedentes pessoais...',
    bounds: antecedentes,
    ...options,
  });

  quills.person_quill = new Quill('#editor-person-data', {
    placeholder: 'Escreva aqui informação básica relativamente ao paciente...',
    bounds: person_data,
    ...options,
  });

  quills.dificulties_quill = new Quill('#editor-dificulties', {
    placeholder: 'Escreva aqui quais as dificuldades e limitações...',
    bounds: dificulties,
    ...options,
  });

  quills.social_quill = new Quill('#editor-social', {
    placeholder: 'Escreva aqui sobre o suporte social...',
    bounds: social,
    ...options,
  });

  quills.family_quill = new Quill('#editor-family', {
    placeholder: 'Escreva aqui sobre o suporte familiar...',
    bounds: family,
    ...options,
  });

  quills.emotion_quill = new Quill('#editor-emotional', {
    placeholder: 'Escreva aqui sobre o perfil emocional...',
    bounds: emotion,
    ...options,
  });

  quills.additional_quill = new Quill('#editor-additiona-data', {
    placeholder: 'Escreva aqui dados adicionais sobre o caso...',
    bounds: additional,
    ...options,
  });

  quills.summary_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('summary', quills.summary_quill.root.innerHTML);
  });

  quills.background_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('background', quills.background_quill.root.innerHTML);
  });

  quills.person_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('person', quills.person_quill.root.innerHTML);
  });

  quills.dificulties_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('difficulties', quills.dificulties_quill.root.innerHTML);
  });

  quills.social_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('social', quills.social_quill.root.innerHTML);
  });

  quills.family_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('family', quills.family_quill.root.innerHTML);
  });

  quills.emotion_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('emotional', quills.emotion_quill.root.innerHTML);
  });

  quills.additional_quill.on('text-change', (delta, oldDelta, source) => {
    setProse('additional', quills.additional_quill.root.innerHTML);
  });
});

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