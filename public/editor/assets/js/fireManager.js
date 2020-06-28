let db;

$(document).ready(function () {
  db = firebase.firestore();
});

function get_doc_id() {
  return getParams(window.location.href).title;
}

function areWeOpeningExistingDoc() {
  return get_doc_id() ? true : false;
}

function load_document_data() {
  let id = get_doc_id();
  const doc_ref = db.collection('scenarios').doc(id);

  doc_ref
    .get()
    .then((doc) => {
      if (doc.exists) {
        renderDocument(doc.data());
      } else {
        console.warn('Document not found');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('there has been an error, please check the console for details');
    });
}

function saveNewDocData(scenario_contents) {
  if (areWeOpeningExistingDoc()) {
    db.collection('scenarios')
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
    db.collection('scenarios')
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
        console.log('File available at', downloadURL);
        $('#image-avatar').attr('src', downloadURL);
      });
    }
  );
}

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
const getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};
