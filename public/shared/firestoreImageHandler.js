function firestore_upload(image, update_callback) {
  let storageRef = firebase.storage().ref();
  //let img_ref = storageRef.child(image.name);
  let imgPath = `images/${image.name}`;
  let uploadTask = storageRef.child(imgPath).put(image);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          update_callback(progress);
          break;
        case firebase.storage.TaskState.SUCCESS:
          update_callback(100);
      }
    },
    (error) => {
      console.error(error);
      alert(MESSAGES.image_upload_error);
    },
    () => {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setAvatar(downloadURL);
      });
    }
  );
}
