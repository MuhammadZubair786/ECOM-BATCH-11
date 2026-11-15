import { firebaseConfig } from './firebase_config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
    getAuth,
    sendPasswordResetEmail
}
    from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const link = document.getElementById("link")
const email = document.getElementById("email")

link.addEventListener("click",async()=>{
   await sendPasswordResetEmail(auth,email.value) 
   .then((user)=>{
   alert("reset link send if account exit")
   })
   .catch((e)=>{
    console.log(e)
   })
})