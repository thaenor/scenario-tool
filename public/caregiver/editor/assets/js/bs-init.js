$(document).ready(function(){
	$('[data-bs-hover-animate]')
		.mouseenter( function(){ var elem = $(this); elem.addClass('animated ' + elem.attr('data-bs-hover-animate')) })
		.mouseleave( function(){ var elem = $(this); elem.removeClass('animated ' + elem.attr('data-bs-hover-animate')) });
	$('[data-bs-tooltip]').tooltip();

	// $('#associate-button').click( e => {
	// 	db.collection('scenarios').get().then(snap => {
	// 		snap.docs.map((doc) => {
	// 			let scene = doc.data();
	// 			const html = typeof (scene.caregiver_id) === 'undefined' ?
	// 				`<li class="list-group-item selectScenarioAssociate" data-scenario-id="${doc.id}"><span>${scene.title}, ${scene.name}</span></li>`
	// 				:
	// 				`<li class="list-group-item selectScenarioAssociate" data-scenario-id="${doc.id}"><span>${scene.title}, ${scene.name} - associated with ${scene.caregiver_id}</span></li>`;
	// 			$('#firebase-scenario-list').append(html);
	// 		});
	// 		$('.selectScenarioAssociate').on('click', e => {
	// 			//TODO: figure out why this isn't working 
	// 			const scenario_id = $(this).attr('data-scenario-id');
	// 			alert(scenario_id);
	// 			docData.caregiver_id = scenario_id;
	// 			alert('Cuidador associado ao cenário '+scenario_id);
	// 		})
	// 	});
	// })
});