let quill_main_description,
  quill_about,
  quill_limitations,
  quill_physical,
  quill_emotional,
  quill_social,
  quill_family;
let main_description_content = "",
  about_content = "",
  limitations_content = "",
  physical_content = "",
  emotional_content = "",
  social_content = "",
  family_content = "";
const toolbarOptions = [
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
const qOpt = {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
};

$(document).ready(function () {
  quill_main_description = new Quill('#scenario-modal-main-description-editor', qOpt);
  quill_about = new Quill('#scenario-modal-about-editor', qOpt);
  quill_limitations = new Quill('#scenario-modal-limitations-editor', qOpt);
  quill_physical = new Quill('#scenario-modal-physical-editor', qOpt);
  quill_emotional = new Quill('#scenario-modal-emotional-editor', qOpt);
  quill_social = new Quill('#scenario-modal-social-editor', qOpt);
  quill_family = new Quill('#scenario-modal-family-editor', qOpt);

  $('#scenario-modal-main-description-get-content').click(e => {
    main_description_content = quill_main_description.root.innerHTML;
    $("#section-main-data").html(main_description_content);
  });
  $('#scenario-modal-about-get-content').click(e => {
    about_content = quill_about.root.innerHTML;
    $('#section-about').html(about_content);
  });
  $('#scenario-modal-limitations-get-content').click(e => {
    limitations_content = quill_limitations.root.innerHTML;
    $('#section-limitations').html(limitations_content);
  });
  $('#scenario-modal-physical-get-content').click(e => {
    physical_content = quill_physical.root.innerHTML;
    $('#section-physical').html(physical_content);
  });
  $('#scenario-modal-emotional-get-content').click(e => {
    emotional_content = quill_emotional.root.innerHTML;
    $('#section-emotional').html(emotional_content);
  });
  $('#scenario-modal-social-get-content').click(e => {
    social_content = quill_social.root.innerHTML;
    $('#section-social').html(social_content);
  });
  $('#scenario-modal-family-get-content').click(e => {
    family_content = quill_family.root.innerHTML;
    $('#section-family').html(family_content);
  });

  $('#image-selector').change(e => {
    let input = e.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $('#image-avatar').attr('src', e.target.result);
        firestore_upload(input.files[0]);
      }
      reader.readAsDataURL(input.files[0]);
    }
  });
});
