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

import { getDatabase, set, get, update, remove, ref, onValue, push, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const user = Cookies.get('user')
if(!Cookies.get('device')){
    UserLost.showModal()
}
const deviceName = Cookies.get('device');
const deviceTag = Cookies.get('tag');

let NameOfDevice = document.querySelector('#NameOfDevice');
let MAC = deviceName.split(",")[1];
const getMode = ref(db, MAC + '/MODE');
NameOfDevice.innerHTML = deviceName.split(",")[0];
let modeSet = document.querySelector('#modeSet');
let bar = document.getElementById('#bar')


onValue(getMode, (snapshot) => {
    let modeStat = document.querySelector('#modeStat')
    if (snapshot.val() == '1'){
        modeStat.innerHTML = '恆亮'
    }else if (snapshot.val() == '2'){
        modeStat.innerHTML = '呼吸'
    }else if (snapshot.val() == '3'){
        modeStat.innerHTML = '跑馬燈'
    }else if (snapshot.val() == '4'){
        modeStat.innerHTML = '彩虹'
    }else if (snapshot.val() == '6'){
        modeStat.innerHTML = '關閉'
    }
})


function modeChange(){
    update(ref(db, MAC),{
        MODE: modeSet.value
    })
}

function slideBarSet() {
    const dbref = ref(db);
    get(child(dbref, MAC + "/COLOR"))
    .then((snapshot)=>{
        let rc = snapshot.val().substr(1, 3)
        let gc = snapshot.val().substr(4, 3)
        let bc = snapshot.val().substr(7, 3)
        if(rc<10){
            var rcc = rc.substr(2, 1)
        }else if(rc<100){
            var rcc = rc.substr(1, 2)
        }else{
            var rcc = rc
        }
        if(gc<10){
            var gcc = gc.substr(2, 1)
        }else if(gc<100){
            var gcc = gc.substr(1, 2)
        }else{
            var gcc = gc
        }
        if(bc<10){
            var bcc = bc.substr(2, 1)
        }else if(bc<100){
            var bcc = bc.substr(1, 2)
        }else{
            var bcc = bc
        }
        let colorSet = new iro.ColorPicker("#sliderPicker", {
            width: 320,
            color: {r: rcc, g: gcc, b: bcc},
            borderWidth: 0.5,
            borderColor: "#fff",
            layout: [{
                component: iro.ui.Slider,
                options: {
                    sliderType: 'hue'
                }
            }]
        })
        
        colorSet.on(["color:init", "color:change"], function(color){
            let r = color.red
            let g = color.green
            let b = color.blue
            if(r < 10){
                var rs = '00' + r
            }else if(r > 10 && r < 100){
                var rs = '0' + r
            }else{
                var rs = r
            }
            if(g < 10){
                var gs = '00' + g
            }else if(g > 10 && g < 100){
                var gs = '0' + g
            }else{
                var gs = g
            }
            if(b < 10){
                var bs = '00' + b
            }else if(b > 10 && b < 100){
                var bs = '0' + b
            }else{
                var bs = b
            }
            update(ref(db, MAC),{
                COLOR: '"' + rs+gs+bs + '"'
            })
            // bar.style.boxShadow = "10px 20px 30px blue";
        });
        
    })
}

function StatCallBack(){
    update(ref(db, MAC),{
        esp : 0
    })
    .then(()=>{
        update(ref(db, MAC),{
            esp: 1
        })
    })
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
removeConfirm.addEventListener('click', delataDevice)
modeSet.addEventListener('change', modeChange)
window.onload(slideBarSet())