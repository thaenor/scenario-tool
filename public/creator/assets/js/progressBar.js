let state = {
  phy: ['phy-step-1', 'phy-step-2', 'phy-step-3', 'phy-step-4', 'phy-step-5'],
  emo: ['emo-step-1', 'emo-step-2', 'emo-step-3', 'emo-step-4', 'emo-step-5'],
  soc: ['soc-step-1', 'soc-step-2', 'soc-step-3', 'soc-step-4', 'soc-step-5'],
  fam: ['fam-step-1', 'fam-step-2', 'fam-step-3', 'fam-step-4', 'fam-step-5'],
};
let current_phy = 3,
  current_emo = 3,
  current_soc = 3,
  current_fam = 3;

$('.steps-progressbar li').click((e) => {
  let target = e.currentTarget.id;
  set_progress_bar(target);
});

function set_progress_bar(target) {
  let currentList = getCurrentList(target.substring(0, 3));
  let currentIndex = Number(target.slice(-1));
  let category_name = currentList[0].substring(0, 3);

  currentList.forEach((item) => {
    if (Number(item.slice(-1)) < currentIndex) {
      $(`#${item}`).removeClass('active').addClass('previous');
    }
    if (Number(item.slice(-1)) === currentIndex) {
      $(`#${item}`).removeClass('previous').addClass('active');
    }
    if (Number(item.slice(-1)) > currentIndex) {
      $(`#${item}`).removeClass('previous').removeClass('active');
    }
  });

  switch (category_name) {
    case 'phy':
      current_phy = Number(target[target.length - 1]);
      break;
    case 'emo':
      current_emo = Number(target[target.length - 1]);
      break;
    case 'soc':
      current_soc = Number(target[target.length - 1]);
      break;
    case 'fam':
      current_fam = Number(target[target.length - 1]);
      break;
    default:
      break;
  }
}

function getCurrentList(listName) {
  for (let key in state) {
    if (key === listName) {
      return state[key];
    }
  }
}
