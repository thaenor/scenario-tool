var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'] // remove formatting button
];

var quill = null;

$(document).ready(function() {
  quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });

  quill.setContents({
    ops: [{ insert: 'Escreva aqui\n' }]
  });

  $('#get-content').click(function() {
    var editor_content = quill.container.firstChild.innerHTML;
    $(`#${window.sectionToSaveText}`)
      .parent()
      .append(editor_content);
    $('#editor-modal').modal('hide');
    quill.setContents({
      ops: [{ insert: 'Escreva aqui\n' }]
    });
  });
});
