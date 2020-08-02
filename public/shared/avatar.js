$(document).ready(() => {
  $('#image-selector').change((e) => {
    let input = e.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        firestore_upload(input.files[0]);
      };
      reader.readAsDataURL(input.files[0]);
    }
  });
});

function loading_status(progress) {
  if (progress == 0) {
    $('#image-avatar').after(
      `<span id="update-status">upload ${progress}%...</span>`
    );
  }

  if (progress >= 100) {
    $('#update-status').empty();
  }
  $('#update-status').html(`<span id="update-status">upload ${progress}%...</span>`);
}

function setAvatar(url) {
  $('#image-avatar').attr('src', url);
}
