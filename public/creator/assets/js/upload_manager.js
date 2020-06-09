const db = firebase.firestore();
let avatar_url = "";

$("#firebase-sync").click(e => {
    let title = $('#scenario-title').text();
    let name = $('#scenario-persona-name').text();
    let scenario_contents = {
        title,
        name,
        avatar: avatar_url,
        capabilities: {
            cognitive: current_cognitive,
            memory: current_memory,
            physical: current_physical,
            economic: current_economic
        },
        profile: {
            physical: current_phy,
            emotional: current_emo,
            social: current_soc,
            family: current_fam
        },
        main_description_content,
        about_content,
        limitations_content,
        physical_content,
        emotional_content,
        social_content,
        family_content
    };
    
    db.collection("scenarios").add(scenario_contents)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});


// db.collection("scenarios").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         var dt = doc.data();
//         console.log(`${doc.id} => ${doc.data()}`);
//         console.log(dt);
//     });
// });

function firestore_upload(image) {
  let storageRef = firebase.storage().ref();
  let img_ref = storageRef.child(image.name);
  let imgPath = `images/${image.name}`;
  let uploadTask = storageRef.child(imgPath).put(image);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function (snapshot) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function (error) {
    // Handle unsuccessful uploads
    console.error(error);
  }, function () {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      console.log('File available at', downloadURL);
      avatar_url = downloadURL;
    });
  });
}