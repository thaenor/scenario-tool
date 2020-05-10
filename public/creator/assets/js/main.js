let cogBad = 'cognitive-bad';
let cogMed = 'cognitive-medium';
let cogGood = 'cognitive-good';
let memBad = 'memory-bad';
let memMed = 'memory-medium';
let memGood = 'memory-good';
let phyBad = 'physical-bad';
let phyMed = 'physical-medium';
let phyGood = 'physical-good';
let moneyBad = 'money-bad';
let moneyMed = 'money-medium';
let moneyGood = 'money-good';
let statusBad = 'bad';
let statusMed = 'medium';
let statusGood = 'good';

function toggleSelection(target, status, others) {
  switch (status) {
    case 'bad':
      $(`#${target}`).css('background-color', 'rgb(201,26,26)');
      break;
    case 'medium':
      $(`#${target}`).css('background-color', 'rgb(234,189,74)');
      break;
    case 'good':
      $(`#${target}`).css('background-color', 'rgb(72,217,22)');
      break;
    default:
      break;
  }

  $(`#${others[0]}`).css('background-color', '#dddddd');
  $(`#${others[1]}`).css('background-color', '#dddddd');
}

$('#semaphore-selection-status .badge').click(function() {
  switch (this.id) {
    case cogBad:
      toggleSelection(cogBad, statusBad, [cogMed, cogGood]);
      break;
    case cogMed:
      toggleSelection(cogMed, statusMed, [cogBad, cogGood]);
      break;
    case cogGood:
      toggleSelection(cogGood, statusGood, [cogBad, cogMed]);
      break;
    case memBad:
      toggleSelection(memBad, statusBad, [memMed, memGood]);
      break;
    case memMed:
      toggleSelection(memMed, statusMed, [memBad, memGood]);
      break;
    case memGood:
      toggleSelection(memGood, statusGood, [memBad, memMed]);
      break;
    case phyBad:
      toggleSelection(phyBad, statusBad, [phyMed, phyGood]);
      break;
    case phyMed:
      toggleSelection(phyMed, statusMed, [phyBad, phyGood]);
      break;
    case phyGood:
      toggleSelection(phyGood, statusGood, [phyBad, phyMed]);
      break;
    case moneyBad:
      toggleSelection(moneyBad, statusBad, [moneyMed, moneyGood]);
      break;
    case moneyMed:
      toggleSelection(moneyMed, statusMed, [moneyBad, moneyGood]);
      break;
    case moneyGood:
      toggleSelection(moneyGood, statusGood, [moneyBad, moneyMed]);
      break;
    default:
      break;
  }
});

$(
  '#main-data, #about-section, #dificulties-section, #phy-section, #emo-section, #soc-section, #fam-section'
).click(e => {
  let target = e.currentTarget.id;
  window.sectionToSaveText = `${target}`;
  quill.setContents({
    ops: [{ insert: 'Escreva aqui\n' }]
  });
  $('#editor-modal').modal();
});

$('#print').click(e => {
  $(
    '#main-data, #about-section, #dificulties-section, #phy-section, #emo-section, #soc-section, #fam-section, #print, #image-selector'
  ).hide();

  CreatePDFfromHTML();

  $(window).click(e => {
    $(
      '#main-data, #about-section, #dificulties-section, #phy-section, #emo-section, #soc-section, #fam-section, #print, #image-selector'
    ).show();
  });
});

function previewFile() {
  var preview = document.querySelector('#image-avatar');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function() {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
}

function CreatePDFfromHTML() {
  window.resizeTo(992, 600);
  var HTML_Width = 992; // $('.html-content').width();
  var HTML_Height = 600; // $('.html-content').height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + top_left_margin * 2;
  var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  html2canvas($('.html-content')[0]).then(function(canvas) {
    var imgData = canvas.toDataURL('image/jpeg', 1.0);
    var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    pdf.addImage(
      imgData,
      'JPG',
      top_left_margin,
      top_left_margin,
      canvas_image_width,
      canvas_image_height
    );
    for (var i = 1; i <= totalPDFPages; i++) {
      pdf.addPage(PDF_Width, PDF_Height);
      pdf.addImage(
        imgData,
        'JPG',
        top_left_margin,
        -(PDF_Height * i) + top_left_margin * 4,
        canvas_image_width,
        canvas_image_height
      );
    }
    pdf.save('Your_PDF_Name.pdf');
    var img = document.createElement('img');
    img.src = imgData;
    img.setAttribute('width', '500px');
    img.setAttribute('border', '1px solid red');
    $('body').append(img);
    //$('.html-content').hide();
  });
}
