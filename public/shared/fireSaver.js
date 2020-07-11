if (typeof db !== 'undefined') {
  let db;
}

$(document).ready(function () {
  db = firebase.firestore();

  $('#save-button').click((e) => {
    let scenario = getDocumentData();
    saveDocData(scenario);
  });
});

function areWeOpeningExistingDoc() {
  return get_doc_id() ? true : false;
}

function saveDocData(scenario_contents) {
  const dbCollection =
    scenario_contents.type === 'caretaker' ? 'caretakers' : 'scenarios';

  if (areWeOpeningExistingDoc()) {
    db.collection(dbCollection)
      .doc(get_doc_id())
      .set(scenario_contents)
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        alert("sorry, I couldn' save the scenario");
        console.error('Error writing document: ', error);
      });
  } else {
    db.collection(dbCollection)
      .add(scenario_contents)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function (error) {
        alert("sorry, I couldn' save the scenario");
        console.error('Error adding document: ', error);
      });
  }
}

function firestore_upload(image) {
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
          break;
      }
    },
    (error) => {
      console.error(error);
      alert(
        'something went wrong uploading the image - check the console for more info'
      );
    },
    () => {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setAvatar(downloadURL);
      });
    }
  );
}
