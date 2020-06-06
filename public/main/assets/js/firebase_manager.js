const db = firebase.firestore();

const scenarios = db.collection("scenarios").get()
                    .then( snapshot => {
                        snapshot.docs.map(doc => {
                            console.log(doc.data());
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });