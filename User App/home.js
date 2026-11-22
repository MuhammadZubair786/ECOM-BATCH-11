import { firebaseConfig } from './firebase_config.js'
import { getAuth, onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

let name = document.getElementById("name")
let image = document.getElementById("image")



async function getCurrentUser() {
    await onAuthStateChanged(auth, async function (user) {
        console.log(user.uid)
        const userRef = doc(db, "users", user.uid);
        const data = await getDoc(userRef)
        console.log(data.data())
        if(data.exists()){
            name.innerText=`Welcome ${data.data()["name"]}`
            image.src=data.data()["imageUrl"]
        }
    })

}

function logOut(){
    signOut(auth)
    localStorage.clear()
    location.replace("login.html")
}

window.logOut=logOut

getCurrentUser()

console.log(app)


