import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
const firebaseConfig = {
apiKey: "AIzaSyAF4OdtYUAomk_4WnvE5MXb_nphlQ33UyA",
    authDomain: "esp8266-ai2.firebaseapp.com",
    databaseURL: "https://esp8266-ai2-default-rtdb.firebaseio.com",
    projectId: "esp8266-ai2",
    storageBucket: "esp8266-ai2.appspot.com",
    messagingSenderId: "245671703015",
    appId: "1:245671703015:web:28612316e5ec39dd6bcd42"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const firebaseUserConfig = {
    apiKey: "AIzaSyCF75el0I5Ni587JaOnNVOoqAzWuJG2agY",
    authDomain: "user-login-time.firebaseapp.com",
    databaseURL: "https://user-login-time-default-rtdb.firebaseio.com",
    projectId: "user-login-time",
    storageBucket: "user-login-time.appspot.com",
    messagingSenderId: "975739925033",
    appId: "1:975739925033:web:bbb3193030ed8e5425e238",
    measurementId: "G-KYLDQQK1GK"
};
const userapp = initializeApp(firebaseUserConfig, "secondary");
const userdb = getDatabase(userapp);

import { getDatabase, set, get, update, remove, ref, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const user = Cookies.get('user')
if(!Cookies.get('device')){
    UserLost.showModal()
}
const deviceName = Cookies.get('device');
const deviceTag = Cookies.get('tag');
let NameOfDevice = document.querySelector('#NameOfDevice')
let MAC = deviceName.split(",")[1]
let ip = deviceName.split(",")[3]
let camBlock = document.querySelector('#camBlock')
NameOfDevice.innerHTML = deviceName.split(",")[0]

function camSet(){
    camBlock.src = "http://" + ip + "/"
}
function delataDevice(){
    if(REMOVEword.value == "REMOVE"){
        remove(ref(userdb,  user + "/" + deviceTag))
        .then((snapshot)=>{
remove(ref(db, MAC + '/USER' + user))
.then((snapshot)=>{
    removeDia.close()
    window.location.href = "devicepage.html"
})
        })
    }else{
    }
}
function ChangeDeviceName(){
    nameD.showModal()
    Dname.innerHTML = '原本的裝置名稱：' + NameOfDevice.innerHTML
}
function newDname(){
    NameOfDevice.innerHTML = DnewName.value
    update(ref(userdb,  user + "/" + deviceTag),{
        set: '"' + DnewName.value + " " + MAC + " cam " + ip + '"'
    })
    nameD.close()
}
ChangeDName.addEventListener('click', ChangeDeviceName)
Dconfirm.addEventListener('click', newDname)
removeConfirm.addEventListener('click', delataDevice)
window.onload(camSet())