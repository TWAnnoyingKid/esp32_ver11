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

var account = document.querySelector("#account");
var password = document.querySelector("#password");
var confirmpassword = document.querySelector("#confirmpassword");
var email = document.querySelector("#email");
var phone = document.querySelector("#phone");
var signupBtn = document.querySelector("#signup");

var dataFail = document.querySelector('#dataFail')
var passwordFail = document.querySelector('#passwordFail')
var accountFail = document.querySelector('#accountFail')
var emailFail = document.querySelector('#emailFail')
var phoneFail = document.querySelector('#phoneFail')
var sus = document.querySelector('#sus')
var close = document.querySelector('#close');
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
                var emaildb = email.value.replace('@', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '')
                get(child(dbref, "Email/" + emaildb))
                .then((snapshot)=>{
                    if (snapshot.exists()){
            emailFail.showModal()
                    }else{
            var phonedb = phone.value
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
                        window.location.href = "mainpage.html"
                    })
                }
            })
                    }

                })
                
            }
        })
    }
}
signupBtn.addEventListener('click', signupData)