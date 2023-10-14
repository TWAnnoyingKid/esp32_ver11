import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
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
const analytics = getAnalytics(app);
            
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const db = getDatabase();

let account = document.querySelector("#account");
let password = document.querySelector("#password");
let confirmpassword = document.querySelector("#confirmpassword");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let signupBtn = document.querySelector("#signup");

let dataFail = document.querySelector('#dataFail')
let passwordFail = document.querySelector('#passwordFail')
let accountFail = document.querySelector('#accountFail')
let emailFail = document.querySelector('#emailFail')
let phoneFail = document.querySelector('#phoneFail')
let sus = document.querySelector('#sus')
let susBTN = document.querySelector('#susBTN');

let scheckEye = document.querySelector("#scheckEye");
let acheckEye = document.querySelector("#acheckEye");

if(Cookies.get('forget')){
    Cookies.remove('forget')
}

function signupData(){
    const dbref = ref(db);
    if(account.value == "" || password.value == "" || confirmpassword.value == "" || email.value == "" || phone.value == ""){
        dataFail.showModal()
    }
    else if(password.value != confirmpassword.value){
        passwordFail.showModal()
    }
    else{
        get(child(dbref, "UserData/使用者" + account.value))
        .then((snapshot)=>{
            if (snapshot.exists()) {
                accountFail.showModal()
            }else{
                let emaildb = email.value.replace('@', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '')
                get(child(dbref, "Email/" + emaildb))
                .then((snapshot)=>{
                    if (snapshot.exists()){
            emailFail.showModal()
                    }else{
            let phonedb = phone.value
            get(child(dbref, "Phone/" + phonedb))
            .then((snapshot)=>{
                if (snapshot.exists()){
                    phoneFail.showModal()
                }else{
                    set(ref(db, "UserData/使用者" + account.value),{
                        account: '"' + account.value + '"',
                        password: '"' + password.value + '"',
                        email: '"' + email.value + '"',
                        phone: '"' + phone.value + '"'
                    })
                    set(ref(db, "Email/" + emaildb),{
                        Setup: "true"
                    })
                    set(ref(db, "Phone/" + phonedb),{
                        Setup: "true"
                    })
                    .then(()=>{
                        sus.showModal()
                        
                    })
                }
            })
                    }

                })
                
            }
        })
    }
}
function susya(){
    window.location.href = "mainpage.html"
}

function passwordEye(){
    if(password.type === "password"){
        password.setAttribute('type','text')
        scheckEye.src = "picture/view.png"
    }else if(password.type === "text"){
        password.setAttribute('type','password')
        scheckEye.src = "picture/hidden.png"
    }
}
function checkpasswordEye(){
    if(confirmpassword.type === "password"){
        confirmpassword.setAttribute('type','text')
        acheckEye.src = "picture/view.png"
    }else if(confirmpassword.type === "text"){
        confirmpassword.setAttribute('type','password')
        acheckEye.src = "picture/hidden.png"
    }
}
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        signupData()
    }
});

scheckEye.addEventListener('click', passwordEye);
acheckEye.addEventListener('click', checkpasswordEye);
signupBtn.addEventListener('click', signupData)
susBTN.addEventListener('click', susya)