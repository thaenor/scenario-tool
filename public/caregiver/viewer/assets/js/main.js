function populateProse(doc) {
  $('#Loading-text-block').remove();
  $('#Loading-text-block-1').remove();
  $('#Loading-text-block-2').remove();

  $('#person').html(doc.person);
  $('#data').html(doc.data);
  $('#evolution').html(doc.evolution);
}

$(document).ready(function () {});
