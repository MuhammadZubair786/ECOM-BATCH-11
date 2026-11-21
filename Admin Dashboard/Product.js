import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query,doc,setDoc } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
let category = document.getElementById("category")

let pname = document.getElementById("pname")
let pprice = document.getElementById("pprice")
let pdescription = document.getElementById("pdescription")
let ppicture = document.getElementById("ppicture")

// ppicture.addEventListener("change",function(){})


const cloudName = "zmpw6oge"
const bucket = "StorageBucket"

function ShowERROR(message) {
    Toastify({
        text: message,
        duration: 1000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, red)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

}


async function addNewProduct() {
    console.log(ppicture.files.length==0)
   
    let CatValue = category.options[category.selectedIndex].innerText
    let CatKey = category.value

    if (CatValue == "Open this select Category") {
        console.log("set 1")
        ShowERROR("Please select cateory")
    }
    else if (pname.value == "") {
        ShowERROR("Enter Product name")
        console.log("set 2")


    }
    else if (pprice.value == "") {
        ShowERROR("Enter Product price")

    }
    else if (pdescription.value == "") {
        ShowERROR("Enter Product description")

    }
    else if(ppicture.files.length==0){
        ShowERROR("Please select product picture")
    }
    else{
        let pimageurl  =await imageUpload(ppicture.files[0])
        console.log(pimageurl)

        let pobject ={
            productName : pname.value,
            productPrice :pprice.value,
            productDescription :pdescription.value,
            productCategory : CatValue,
            productCategoryKey : CatKey,
            productImageUrl : pimageurl

        }
        console.log(pobject)
        var productRef = doc(collection(db,"Products"))
        await setDoc(productRef,pobject)
        ShowERROR("aDD nEW PROFDUCT")
    }
  

}

window.addNewProduct = addNewProduct


async function imageUpload(image) {
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


async function getAllcategory() {
    let catRef = collection(db, "Category")
    let data = await getDocs(catRef)
    console.log(data.docs)
    for (var i = 0; i < data.docs.length; i++) {
        console.log(data.docs[i].data())
        category.innerHTML += `
        <option value=${data.docs[i].data()["categoryKey"]}>${data.docs[i].data()["categoryName"]}</option>
        `
    }
}

getAllcategory()
