import { firebaseConfig } from './firebase_config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth)

const db = getFirestore(app)

const signup = document.getElementById("signup")
const email = document.getElementById("email")
const password = document.getElementById("password")
const name = document.getElementById("name")
const contactNo = document.getElementById("contactNo")

const imageUploadVIEW = document.getElementById("imageUpload")
const imageView = document.getElementById("imageView")

let image="";

const cloudName = "zmpw6oge"
const bucket = "StorageBucket"

imageUploadVIEW.addEventListener("change", async function (e) {
    image = e.target.files[0]
   const objectUrl = URL.createObjectURL(image)
   imageView.src = objectUrl
   imageView.style.borderRadius = "50%"
   imageView.style.width = "100px"
   imageView.style.height = "100px"
})

async function imageUpload() {
   try {
      
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", bucket)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
         method: "POST",
         body: formData
      })
      const data = await response.json()
      console.log(data.secure_url)
      return data.secure_url
   }
   catch (e) {

   }
}

signup.addEventListener("click", async function () {

   await createUserWithEmailAndPassword(auth, email.value, password.value) 
      .then(async (userget) => {
         console.log(userget)

         await sendEmailVerification(userget.user); //account verify send link
         const imgUp = await imageUpload()
         await setDoc(doc(db, "users", userget.user.uid), {
            email: email.value,
            password: password.value,
            name: name.value,
            contactNo: contactNo.value,
            imageUrl : imgUp

         })

         alert("Account create & EMAIL SEND SUCCESSFULLY ")
         window.location.href = "./login.html"
      })
      .catch((e) => {
         console.log(e)
      })
})




