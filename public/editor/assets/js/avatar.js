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
