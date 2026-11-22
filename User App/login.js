import { firebaseConfig } from './firebase_config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
     sendEmailVerification
}
    from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import {getFirestore,collection,query, where, getDocs}
  from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const dbRef = collection(db,"users")

const signin = document.getElementById("signin")
const email = document.getElementById("email")
const password = document.getElementById("password")
const google = document.getElementById("google")

google.addEventListener("click", async function () {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
        .then((user) => {


        })
        .catch((e) => {
            console.log(e)

        })

})


signin.addEventListener("click", async function () {
    await signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async(user) => {
            if (user.user.emailVerified == false) { //check email verified or npot
                alert("Please verify your email")
                   await sendEmailVerification(user.user); 
                   
            }
            else {
                console.log(user)
                 const q = query(dbRef, where("email", "==",email.value ));
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot.docs[0].data())
                localStorage.setItem("userLogin",true)
                localStorage.setItem("userId",user.user.uid)
                location.replace("home.html")



            }
        })
        .catch((e) => {
            console.log(e)

        })


})


function checkLoginStatus(){
    var userLoginStatus = localStorage.getItem("userLogin")
    if(userLoginStatus=="true"){
        window.location.replace("home.html")

    }
}
checkLoginStatus()