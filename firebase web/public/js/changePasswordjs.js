import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyD0UmlJNoacdrBfyZ50h0FyEI0yHKWUwBs",
    authDomain: "user-data-2e9be.firebaseapp.com",
    databaseURL: "https://user-data-2e9be-default-rtdb.firebaseio.com",
    projectId: "user-data-2e9be",
    storageBucket: "user-data-2e9be.appspot.com",
    messagingSenderId: "261163235969",
    appId: "1:261163235969:web:c60872f373060f75cb2b80",
    measurementId: "G-2X855JVZ8V"
};
const app = initializeApp(firebaseConfig);

import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const db = getDatabase();

let password = document.querySelector("#password");
let passwordConfirm = document.querySelector("#passwordConfirm");
let confirm = document.querySelector("#confirm");
const user = Cookies.get('forget');

function loginData() {
    if(password.value != "" && passwordConfirm.value != ""){
        if(password.value == passwordConfirm.value){
            update(ref(db, "UserData/使用者" + user),{
                password: '"' + password.value + '"'
            })
            .then((snapshot)=>{
                document.location.href="mainpage.html";
            })
            
        }else{
            passwordFail.showModal()
        }
    }else{
        passwordFail.showModal()
    }
}
function passwordEye(){
    if(password.type === "password"){
        password.setAttribute('type','text')
        qcheckEye.src = "picture/view.png"
    }else if(password.type === "text"){
        password.setAttribute('type','password')
        qcheckEye.src = "picture/hidden.png"
    }
}
function checkpasswordEye(){
    if(passwordConfirm.type === "password"){
        passwordConfirm.setAttribute('type','text')
        wcheckEye.src = "picture/view.png"
    }else if(passwordConfirm.type === "text"){
        passwordConfirm.setAttribute('type','password')
        wcheckEye.src = "picture/hidden.png"
    }
}
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        loginData()
    }
});
qcheckEye.addEventListener('click', passwordEye);
wcheckEye.addEventListener('click', checkpasswordEye);
confirm.addEventListener('click', loginData);