const COLORS = {
  GREEN: 'badge-success',
  YELLOW: 'badge-warning',
  RED: 'badge-danger',
  CLEAN: 'badge-primary',
};

function setParam(area, value) {
  if (docData.capabilities[area] === value) {
    docData.capabilities[area] = 0;
    clearIndicators(area);
  } else {
    docData.capabilities[area] = value;
    updateStatusIndicators(area, value);
  }
}

function updateStatusIndicators(area, value) {
  let others = [];
  color = '';
  switch (value) {
    case 1:
      others = [2, 3];
      color = COLORS.RED;
      break;
    case 2:
      others = [1, 3];
      color = COLORS.YELLOW;
      break;
    case 3:
      others = [1, 2];
      color = COLORS.GREEN;
      break;
  }
  $(`#${area}-${value}`).removeClass(COLORS.CLEAN).addClass(color);
  $(`#${area}-${others[0]}`)
    .addClass(COLORS.CLEAN)
    .removeClass(COLORS.RED)
    .removeClass(COLORS.YELLOW)
    .removeClass(COLORS.GREEN);
  $(`#${area}-${others[1]}`)
    .addClass(COLORS.CLEAN)
    .removeClass(COLORS.RED)
    .removeClass(COLORS.YELLOW)
    .removeClass(COLORS.GREEN);
}

function clearIndicators(area) {
  $(`#${area}-1`)
    .addClass(COLORS.CLEAN)
    .removeClass(COLORS.RED)
    .removeClass(COLORS.YELLOW)
    .removeClass(COLORS.GREEN);
  $(`#${area}-2`)
    .addClass(COLORS.CLEAN)
    .removeClass(COLORS.RED)
    .removeClass(COLORS.YELLOW)
    .removeClass(COLORS.GREEN);
  $(`#${area}-3`)
    .addClass(COLORS.CLEAN)
    .removeClass(COLORS.RED)
    .removeClass(COLORS.YELLOW)
    .removeClass(COLORS.GREEN);
}
