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

import { getDatabase, set, get, update, remove, ref, onValue, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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
let mode = document.querySelector('#mode');
let bar = document.getElementById('#bar')

const getSpace = ref(userdb, user + "/" + deviceTag + '/room')
let removeConfirm = document.querySelector('#removeConfirm')
let CbC = document.querySelector('#CbC')
let Cset = document.querySelector('#set')
let controllerConfirm = document.querySelector('#controllerConfirm')
let rm = document.querySelector('#rm')
let s1 = document.querySelector('#s1')
let s2 = document.querySelector('#s2')
let s3 = document.querySelector('#s3')
let s4 = document.querySelector('#s4')
let s5 = document.querySelector('#s5')
let s6 = document.querySelector('#s6')
let s7 = document.querySelector('#s7')
let s8 = document.querySelector('#s8')
if(Cookies.get('space')){
    if(Cookies.get('space').split("/")[0] != undefined){
        let space1 = Cookies.get('space').split("/")[0]
        s1.innerHTML = space1
        s1.value = space1
        s1.style.display = 'block'
        rm.style.display = 'block'
    }else{
        let space1 = ''
    }
    if(Cookies.get('space').split("/")[1] != undefined){
        let space2 = Cookies.get('space').split("/")[1]
        s2.innerHTML = space2
        s2.value = space2
        s2.style.display = 'block'
    }else{
        let space2 = ''
    }
    if(Cookies.get('space').split("/")[2] != undefined){
        let space3 = Cookies.get('space').split("/")[2]
        s3.innerHTML = space3
        s3.value = space3
        s3.style.display = 'block'
    }else{
        let space3 = ''
    }
    if(Cookies.get('space').split("/")[3] != undefined){
        let space4 = Cookies.get('space').split("/")[3]
        s4.innerHTML = space4
        s4.value = space4
        s4.style.display = 'block'
    }else{
        let space4 = ''
    }
    if(Cookies.get('space').split("/")[4] != undefined){
        let space5 = Cookies.get('space').split("/")[4]
        s5.innerHTML = space5
        s5.value = space5
        s5.style.display = 'block'
    }else{
        let space5 = ''
    }
    if(Cookies.get('space').split("/")[5] != undefined){
        let space6 = Cookies.get('space').split("/")[5]
        s6.innerHTML = space6
        s6.value = space6
        s6.style.display = 'block'
    }else{
        let space6 = ''
    }
    if(Cookies.get('space').split("/")[6] != undefined){
        let space7 = Cookies.get('space').split("/")[6]
        s7.innerHTML = space7
        s7.value = space7
        
        s7.style.display = 'block'
    }else{
        let space7 = ''
    }
    if(Cookies.get('space').split("/")[7] != undefined){
        let space8 = Cookies.get('space').split("/")[7]
        s8.innerHTML = space8
        s8.value = space8
        s8.style.display = 'block'
    }else{
        let space8 = ''
    }
}

function spaceConfirm(){
    if(modeSet.value != '場景選單' && modeSet.value != '從此場景中移除'){
        update(ref(userdb,  user + "/" + deviceTag),{
            room: modeSet.value
        })
        .then(()=>{
            moveDia.close()
        })
    }else if(modeSet.value == '從此場景中移除'){
        remove(ref(userdb, user + "/" + deviceTag + '/room'))
        remove(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" +deviceTag))
        NameOfSpace.innerHTML = '總裝置'
        moveDia.close()
    }else{
        alert("請選擇場景")
    }
}
onValue(getSpace, (snapshot) => {
    if (snapshot.val() != undefined){
        if(NameOfDevice.innerHTML != "總裝置"){
            remove(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" +deviceTag)) 
        }
        NameOfSpace.innerHTML = snapshot.val()
        update(ref(userdb,  user + "/" + snapshot.val() + "/" +deviceTag),{
            set: '"' + NameOfDevice.innerHTML + " " + MAC + " strip " + '"'
        })
    }
})
const getController = ref(userdb, user + "/strip")
onValue(getController, (snapshot) => {
    const ddbref = ref(userdb);
    let controllerSet = document.getElementById('controllerSet')
    let o = document.createElement('option')
    snapshot.forEach((con) => {
        if (con.key != Cookies.get('tag')){
            get(child(ddbref, user + "/strip/" + con.key + "/set"))
            .then((a)=>{
                if (a.exists()) {
                    o.id = a.val().replace('"', '').split(" ")[1].replace('"', '')
                    o.value = a.val().replace('"', '').split(" ")[1].replace('"', '')
                    o.innerHTML = a.val().replace('"', '').split(" ")[0].replace('"', '')
                    controllerSet.appendChild(o)
                }
            })
        }
    })
})
function controllerChange(){
    update(ref(db, MAC),{
        CONTROLLER: '"' + controllerSet.value + '"'
    })
    controllDia.close()
}

const getControl = ref(db, MAC + '/CONTROLBYCONTROLLER');
onValue(getControl, (snapshot) => {
    if (snapshot.val() == '1'){
        CbC.innerHTML = '燈條控制'
        controlSTAT.innerHTML = '目前由控制器控制'
    }else{
        CbC.innerHTML = '控制器控制'
        controlSTAT.innerHTML = '目前由燈條控制'
    }
})

const ControllerSet = ref(db, MAC + '/CONTROLLER');
onValue(ControllerSet, (snapshot) => {
    document.getElementById(snapshot.val().replace('"', '').replace('"', '')).selected = true;
    if (snapshot.val().replace('"', '').replace('"', '') == "0"){
        CbC.style.display = "none"
        controlSTAT.style.display = "none"
        document.getElementById("non").style.display = "none"
    }else{
        CbC.style.display = "block"
        controlSTAT.style.display = "block"
        document.getElementById("non").style.display = "block"
    }
})


onValue(getMode, (snapshot) => {
    let modeStat = document.querySelector('#modeStat')
    if (snapshot.val() == '1'){
        document.getElementById("1").selected = true;
    }else if (snapshot.val() == '2'){
        document.getElementById("2").selected = true;
    }else if (snapshot.val() == '3'){
        document.getElementById("3").selected = true;
    }else if (snapshot.val() == '4'){
        document.getElementById("4").selected = true;
    }else if (snapshot.val() == '6'){
        document.getElementById("6").selected = true;
    }
})


function modeChange(){
    update(ref(db, MAC),{
        MODE: mode.value
    })
}

function slideBarSet() {
    loading.showModal()
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
            width: 200,
            color: {r: rcc, g: gcc, b: bcc},
            borderWidth: 0.5,
            borderColor: "#fff",
            layout: [{
                handleSvg: '#handle',
                component: iro.ui.Wheel,
                options: {
                    sliderType: 'hue'
                },
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
        
        loading.close()
    })
    
}
function delataDevice(){
    if(REMOVEword.value == "REMOVE"){
        if(NameOfSpace.innerHTML != "總裝置"){
            remove(ref(db, MAC + "/room"))
            remove(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag)) 
        }
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
        set: '"' + DnewName.value + " " + MAC + " strip " + '"'
    })
    if(NameOfSpace.innerHTML != "總裝置"){
        update(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag),{
            set: '"' + DnewName.value + " " + MAC + " strip " + '"'
        })
    }
    nameD.close()
}
function controller(){
    if (cstat == "y"){
        if(CbC.innerHTML == '燈條控制'){
            update(ref(db, MAC),{
                CONTROLBYCONTROLLER: "0"
            })
        }else if(CbC.innerHTML == '控制器控制'){
            update(ref(db, MAC),{
                CONTROLBYCONTROLLER: "1"
            })
        }
    }
}
function setcontroller(){
    controllDia.showModal()
}
controllerConfirm.addEventListener('click', controllerChange)
Cset.addEventListener('click', setcontroller)
CbC.addEventListener('click', controller)
moveConfirm.addEventListener('click', spaceConfirm)
ChangeDName.addEventListener('click', ChangeDeviceName)
Dconfirm.addEventListener('click', newDname)
removeConfirm.addEventListener('click', delataDevice)
mode.addEventListener('change', modeChange)
window.onload(slideBarSet())