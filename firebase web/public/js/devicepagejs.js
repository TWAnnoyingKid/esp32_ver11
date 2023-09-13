import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
const firebaseConfig = {
    apiKey: "AIzaSyCF75el0I5Ni587JaOnNVOoqAzWuJG2agY",
    authDomain: "user-login-time.firebaseapp.com",
    databaseURL: "https://user-login-time-default-rtdb.firebaseio.com",
    projectId: "user-login-time",
    storageBucket: "user-login-time.appspot.com",
    messagingSenderId: "975739925033",
    appId: "1:975739925033:web:bbb3193030ed8e5425e238",
    measurementId: "G-KYLDQQK1GK"
};
const app = initializeApp(firebaseConfig);

import { getDatabase, get , ref, child, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const db = getDatabase();
const adbref = ref(db);
Cookies.remove('saveName')
if(!Cookies.get('user')){
    UserLost.showModal()
}

function deviceCheck(){
    if(Cookies.get('user')){
        const user = Cookies.get('user')
        const dbref = ref(db, user)
        Cookies.remove('device')
        Cookies.remove('tag')
        onValue(dbref, (snapshot) => {
            snapshot.forEach((devicetag) => {
                if(!Cookies.get('saveName')){
                    Cookies.set('saveName', devicetag.key.split("裝置")[1])
                }else{
                    let num = Cookies.get('saveName')
                    let dnum = devicetag.key.split("裝置")[1]
                    if (Number(num) > Number(dnum)){
                    }else{
            Cookies.set('saveName', dnum)
                    }
                }
                let a = devicetag.key
                get(child(adbref, user + '/' + a + "/set"))
                .then((deviceInfo)=>{
                    let devicestop = deviceInfo.val()
                    let mac = devicestop.replace('"', '').split(" ")[1]
                    addItems(devicestop, a);
                })
            })
        }) 
    }else{
        let noUser = document.querySelector('#noUser')
        UserLost.showModal()
    }
}

function addItems(devicestop, a){
    let deviceplace = document.getElementById('deviceplace')
    let _devicestop = document.createElement('button')
    let p = document.createElement('p')

    p.innerHTML="  "
    _devicestop.class = a
    _devicestop.innerHTML = devicestop.replace('"', '').split(" ")[0]
    _devicestop.name = "devices"
    _devicestop.id = devicestop.replace('"', '').replace('"', '').split(" ")
    _devicestop.onclick = function deviceSetup(){
        Cookies.set('device', _devicestop.id)
        Cookies.set('tag', _devicestop.class)
        location.href = devicestop.replace('"', '').split(" ")[2].replace('"', '') + ".html"
    }
    deviceplace.appendChild(_devicestop);
    deviceplace.appendChild(p);
}

window.onload(deviceCheck());