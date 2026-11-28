const url =new URLSearchParams(location.search) //get from
let cName = url.get("categoryName")

var categoryName = document.getElementById("categoryName")
categoryName.innerText="category name "+cName




