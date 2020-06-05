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
let current_cognitive, current_memory, current_physical, current_economic;

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

  switch (target) {
    case cogBad:
    case cogMed:
    case cogGood:
      current_cognitive = status;
      break;
    case memBad:
    case memMed:
    case memGood:
      current_memory = status;
      break;
    case phyBad:
    case phyMed: 
    case phyGood:
      current_physical = status;
      break;
    case moneyBad:
    case moneyMed:
    case moneyGood:
      current_economic = status;
      break;
    default:
      break;
  }
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
