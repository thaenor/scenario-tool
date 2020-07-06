$(document).ready(function(){
	$('[data-bs-tooltip]').tooltip();
});

function populateProse(doc) {
	$("#Loading-text-block").remove();
	$("#Loading-text-block-1").remove();
	$("#Loading-text-block-2").remove();
	$("#Loading-text-block-3").remove();
	$("#Loading-text-block-4").remove();
	$("#Loading-text-block-5").remove();
	$("#Loading-text-block-6").remove();
	$("#Loading-text-block-7").remove();
	$("#person").html(doc.person);
	$("#summary").html(doc.summary);
	$("#background").html(doc.background);
	$("#difficulties").html(doc.difficulties);
	$("#social").html(doc.social);
	$("#family").html(doc.family);
	$("#emotional").html(doc.emotional);
	$("#additional").html(doc.additional);
  }