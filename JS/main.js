var firebaseConfig = {

  apiKey: "AIzaSyDHaO4jSKDXP5s3t14cwDoxx0KGgsnewuY",

  authDomain: "fts4-36ac5.firebaseapp.com",

  databaseURL: "https://fts4-36ac5-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "fts4-36ac5",

  storageBucket: "fts4-36ac5.appspot.com",

  messagingSenderId: "999700737775",

  appId: "1:999700737775:web:cdc060f2214da037f1b51a",

  measurementId: "G-EDEC5D7V4C"

};


function openRegister(){
  var card = document.getElementById("card");
  card.style.transform ="rotateY(-180deg)";
}
function openLogin(){
  var card = document.getElementById("card");
  card.style.transform ="rotateY(-360deg)";
}

function signUp(){
  var userFullName = document.getElementById("name_signup").value;
  var userEmail = document.getElementById("email_signup").value;
  var userPassword = document.getElementById("pass_signup").value;
  console.log(userFullName+"      "+userEmail);
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
          var user = firebase.auth().currentUser;
          var uid;
          if (user != null) {
              uid = user.uid;
          }
          console.log(uid);
          var firebaseRef = firebase.database().ref();
          var userData = {
              user: userFullName,
              email: userEmail,
          }
          firebaseRef.child(uid).set(userData);
          alert('Your account was created successfully\nYou can log in now.',
          
          )
      }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode+ "\n"+ errorMessage)
      });
      var card = document.getElementById("card");
  card.style.transform ="rotateY(-360deg)";
  document.getElementById("name_signup").value="";
  document.getElementById("email_signup").value="";
  document.getElementById("pass_signup").value="";
  
}

function signIn(){
    var userSIEmail = document.getElementById("email_login").value;
    var userSIPassword = document.getElementById("pass_login").value;

   
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            alert("You are successfully logged in")
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode+ "\n"+ errorMessage)
        });

    firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
            let user = firebase.auth().currentUser;
            let uid
            if(user != null){
                uid = user.uid;
            }
            let firebaseRefKey = firebase.database().ref().child(uid);
            firebaseRefKey.on('value', (dataSnapShot)=>{
                console.log(dataSnapShot.val().user+"   "+dataSnapShot.val().email)
            })
        } 
    });
    document.getElementById("email_login").value="";
    document.getElementById("pass_login").value="";
}

function alt(){
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{
            alert("UserName: "+ dataSnapShot.val().user+"\nEmail: "+dataSnapShot.val().email)
        })
    } 
    else {
      alert("Please Sign IN")
    }
});
}

function signOut(){
  firebase.auth().signOut().then(function() {
      alert("You are successfully logged out")
  }).catch(function(error) {
      let errorMessage = error.message;
      alert(errorCode)
  });
}