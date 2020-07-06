const COLORS = {
  GREEN: 'badge-success',
  YELLOW: 'badge-warning',
  RED: 'badge-danger',
  CLEAN: 'badge-primary',
};
let docData = {
  capabilities: {
    cognitive: 0,
    guidance: 0,
    motor: 0,
    conscience: 0,
    learning: 0,
    economic: 0,
  },
  support: {
    social: 0,
    family: 0,
    emotional: 0,
  },
  selfcare: {
    feeding: 0,
    walking: 0,
    arrange: 0,
    shower: 0,
    sanitary: 0,
    medication: 0,
    transfer: 0,
    turn: 0,
    elevate: 0,
    dress: 0,
  },
  prose: {
    person: '',
    summary: '',
    background: '',
    difficulties: '',
    social: '',
    family: '',
    emotional: '',
    additional: '',
  },
};

function setCapabiltities(area, value) {
  if (docData.capabilities[area] === value) {
    docData.capabilities[area] = 0;
    clearIndicators(area);
  } else {
    docData.capabilities[area] = value;
    updateStatusIndicators(area, value);
  }
}

function setSelfcare(area, value) {
  if (docData.selfcare[area] === value) {
    (docData.selfcare[area] = value), clearIndicators(area);
  } else {
    docData.selfcare[area] = value;
    updateStatusIndicators(area, value);
  }
}

function setSupport(area, value) {
  if (docData.support[area] === value) {
    value = 0;
  }
  docData.support[area] = value;
  let emptyRanges = [1, 2, 3, 4, 5];
  let filledRanges = emptyRanges.slice(0, value - 1);

  emptyRanges = emptyRanges.slice(value, emptyRanges.lenght);
  $(`#${area}-${value}`).removeClass('previous').addClass('active');
  filledRanges.forEach((el) => {
    $(`#${area}-${el}`).removeClass('active').addClass('previous');
  });
  emptyRanges.forEach((el) => {
    $(`#${area}-${el}`).removeClass('previous').removeClass('active');
  });
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

function setProse(area, contents) {
  docData.prose[area] = contents;
}
