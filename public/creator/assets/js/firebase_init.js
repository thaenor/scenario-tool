var firebaseConfig = {
    apiKey: "AIzaSyC9DZtmJ_bDrC0YkOxVWF2S2jP4gpX06f8",
    authDomain: "scenario-tool.firebaseapp.com",
    databaseURL: "https://scenario-tool.firebaseio.com",
    projectId: "scenario-tool",
    storageBucket: "scenario-tool.appspot.com",
    messagingSenderId: "75545633744",
    appId: "1:75545633744:web:e1b43c7440c2290d020fd5"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

$("#firebase-sync").click(e => {
    let title = $('#scenario-title').val();
    let name = $('#scenario-persona-name').val();
    //TODO: check for nulls
    let scenario_contents = {
        title,
        name,
        avatar: "", //TODO
        capabilities: {
            cognitive: current_cognitive,
            memory: current_memory, //BUG: find out why this is never set
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
    debugger;
    db.collection("scenarios").add(scenario_contents)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        //TODO: store known document ID???
    })
    .catch(function(error) {
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
