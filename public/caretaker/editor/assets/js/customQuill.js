let quills = {
  personQuill: {},
  dataQuill: {},
  evolutionQuill: {},
};

$(document).ready(() => {
  const options = {
    debug: 'warning',
    theme: 'snow',
  };

  const person = document.getElementById('person');
  const data = document.getElementById('data');
  const evolution = document.getElementById('evolution');

  quills.personQuill = new Quill(person, {
    placeholder: 'Escreva aqui informação básica sobre o cuidador...',
    bounds: person,
    ...options,
  });

  quills.dataQuill = new Quill(data, {
    placeholder: 'Escreva aqui um resumo do caso...',
    bounds: data,
    ...options,
  });

  quills.evolutionQuill = new Quill(evolution, {
    placeholder: 'Escreva aqui sobre a evolução do caso...',
    bounds: evolution,
    ...options,
  });

  quills.personQuill.on('text-change', (delta, oldDelta, source) => {
    setProse('person', quills.personQuill.root.innerHTML);
  });
  quills.dataQuill.on('text-change', (delta, oldDelta, source) => {
    setProse('data', quills.dataQuill.root.innerHTML);
  });
  quills.evolutionQuill.on('text-change', (delta, oldDelta, source) => {
    setProse('evolution', quills.evolutionQuill.root.innerHTML);
  });
});

function populateProse(doc) {
  quills.personQuill.root.innerHTML = doc.person;
  quills.dataQuill.root.innerHTML = doc.data;
  quills.evolutionQuill.root.innerHTML = doc.evolution;
}