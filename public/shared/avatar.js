$(document).ready(() => {
  $('#image-selector').change((e) => {
    let input = e.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        firestore_upload(input.files[0], loading_status);
      };
      reader.readAsDataURL(input.files[0]);
    }
  });
});

function loading_status(progress) {
  let rounded_progress = Math.round(progress);
  if (rounded_progress == 0) {
    $('#image-avatar').after(
      `<span id="update-status">upload ${rounded_progress}%...</span>`
    );
  }

  if (rounded_progress >= 90) {
    $('#update-status').empty();
  } else {
    $('#update-status').html(
      `<span id="update-status">upload ${rounded_progress}%...</span>`
    );
  }
}

function setAvatar(url) {
  $('#image-avatar').attr('src', url);
}
