import { firebaseConfig } from './firebase_config.js'
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

let name = document.getElementById("name")
let image = document.getElementById("image")
let category = document.getElementById("category")



async function getCurrentUser() {
    await onAuthStateChanged(auth, async function (user) {
        console.log(user.uid)
        const userRef = doc(db, "users", user.uid);
        const data = await getDoc(userRef)
        console.log(data.data())
        if (data.exists()) {
            name.innerText = `Welcome ${data.data()["name"]}`
            image.src = data.data()["imageUrl"]
        }
    })

}

function logOut() {
    signOut(auth)
    localStorage.clear()
    location.replace("login.html")
}

window.logOut = logOut

async function getAlLCategory() {
    const CategoryRef = collection(db, "Category");
    const data = await getDocs(CategoryRef)
    console.log(data.docs)
    for (var i = 0; i < data.docs.length; i++) {
        let cName = data.docs[i].data()["categoryName"];
        console.log(data.docs[i].data())
        category.innerHTML += `
        <button onclick ='reDirectUrl("${cName}")'>
        ${data.docs[i].data()["categoryName"]}</button>
        `
    }

}

function reDirectUrl(categoryName) {
    console.log(categoryName)
    window.location.href=`./Product.html?categoryName=${categoryName}`

}
window.reDirectUrl=reDirectUrl
getCurrentUser()
getAlLCategory()

console.log(app)


