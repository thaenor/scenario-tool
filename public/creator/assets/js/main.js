const cogBad = 'cognitive-bad';
const cogMed = 'cognitive-medium';
const cogGood = 'cognitive-good';
const memBad = 'memory-bad';
const memMed = 'memory-medium';
const memGood = 'memory-good';
const phyBad = 'physical-bad';
const phyMed = 'physical-medium';
const phyGood = 'physical-good';
const moneyBad = 'money-bad';
const moneyMed = 'money-medium';
const moneyGood = 'money-good';
const statusBad = 'bad';
const statusMed = 'medium';
const statusGood = 'good';
let current_cognitive = '',
  current_memory = '',
  current_physical = '',
  current_economic = '';

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

$('#semaphore-selection-status .badge').click(function () {
  toggle_capacity_badge(this.id);
});

function toggle_capacity_badge(id) {
  switch (id) {
    case cogBad:
      toggleSelection(cogBad, statusBad, [cogMed, cogGood]);
      current_cognitive = id;
      break;
    case cogMed:
      toggleSelection(cogMed, statusMed, [cogBad, cogGood]);
      current_cognitive = id;
      break;
    case cogGood:
      toggleSelection(cogGood, statusGood, [cogBad, cogMed]);
      current_cognitive = id;
      break;
    case memBad:
      toggleSelection(memBad, statusBad, [memMed, memGood]);
      current_memory = id;
      break;
    case memMed:
      toggleSelection(memMed, statusMed, [memBad, memGood]);
      current_memory = id;
      break;
    case memGood:
      toggleSelection(memGood, statusGood, [memBad, memMed]);
      current_memory = id;
      break;
    case phyBad:
      toggleSelection(phyBad, statusBad, [phyMed, phyGood]);
      current_physical = id;
      break;
    case phyMed:
      toggleSelection(phyMed, statusMed, [phyBad, phyGood]);
      current_physical = id;
      break;
    case phyGood:
      toggleSelection(phyGood, statusGood, [phyBad, phyMed]);
      current_physical = id;
      break;
    case moneyBad:
      toggleSelection(moneyBad, statusBad, [moneyMed, moneyGood]);
      current_economic = id;
      break;
    case moneyMed:
      toggleSelection(moneyMed, statusMed, [moneyBad, moneyGood]);
      current_economic = id;
      break;
    case moneyGood:
      toggleSelection(moneyGood, statusGood, [moneyBad, moneyMed]);
      current_economic = id;
      break;
    default:
      break;
  }
}
