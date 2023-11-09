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
const getTemp = ref(db, MAC + '/Temperature')
const getHumid = ref(db, MAC + '/Humidity')
NameOfDevice.innerHTML = deviceName.split(",")[0]

const getSpace = ref(userdb, user + "/" + deviceTag + '/room')
let removeConfirm = document.querySelector('#removeConfirm')
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
            remove(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag)) 
        }
        NameOfSpace.innerHTML = snapshot.val()
        update(ref(userdb,  user + "/" + snapshot.val() + "/" + deviceTag),{
            set: '"' + NameOfDevice.innerHTML + " " + MAC + " bme " + '"'
        })
    }
})

onValue(getTemp, (snapshot) => {
    let TempA = document.querySelector('#TempA')
    let TempB = document.querySelector('#TempB')
    TempA.innerHTML = snapshot.val().split(".")[0]
    TempB.innerHTML = ". " + snapshot.val().split(".")[1]
    if(TempA.innerHTML>=0 && TempA.innerHTML<=16){
        TempA.setAttribute('class', 'bmeNumberAB')
        TempB.setAttribute('class', 'bmeNumberBB')
    }else if(TempA.innerHTML>16 && TempA.innerHTML<=26){
        TempA.setAttribute('class', 'bmeNumberAG')
        TempB.setAttribute('class', 'bmeNumberBG')
    }else if(TempA.innerHTML>26 && TempA.innerHTML<=30){
        TempA.setAttribute('class', 'bmeNumberAY')
        TempB.setAttribute('class', 'bmeNumberBY')
    }else{
        TempA.setAttribute('class', 'bmeNumberAR')
        TempB.setAttribute('class', 'bmeNumberBR')
    }
})
onValue(getHumid, (snapshot) => {
    let HumidA = document.querySelector('#HumidA')
    let HumidB = document.querySelector('#HumidB')
    HumidA.innerHTML = snapshot.val().split(".")[0]
    HumidB.innerHTML = ". " + snapshot.val().split(".")[1]
    if(HumidA.innerHTML>=0 && HumidA.innerHTML<=40){
        HumidA.setAttribute('class', 'bmeNumberAY')
        HumidB.setAttribute('class', 'bmeNumberBY')
    }else if(HumidA.innerHTML>40 && HumidA.innerHTML<=70){
        HumidA.setAttribute('class', 'bmeNumberAG')
        HumidB.setAttribute('class', 'bmeNumberBG')
    }else{
        HumidA.setAttribute('class', 'bmeNumberAB')
        HumidB.setAttribute('class', 'bmeNumberBB')
    }
})
function delataDevice(){
    if(NameOfSpace.innerHTML != "總裝置"){
        remove(ref(db, MAC + "/room"))
        remove(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag)) 
    }
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
        alert("安全詞錯誤")
    }
}
function ChangeDeviceName(){
    nameD.showModal()
    Dname.innerHTML = '原本的裝置名稱：' + NameOfDevice.innerHTML
}
function newDname(){
    NameOfDevice.innerHTML = DnewName.value
    update(ref(userdb,  user + "/" + deviceTag),{
        set: '"' + DnewName.value + " " + MAC + " bme" + '"'
    })
    if(NameOfSpace.innerHTML != "總裝置"){
        update(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag),{
            set: '"' + DnewName.value + " " + MAC + " bme" + '"'
        })
    }
    nameD.close()
}
ChangeDName.addEventListener('click', ChangeDeviceName)
Dconfirm.addEventListener('click', newDname)
removeConfirm.addEventListener('click', delataDevice)
moveConfirm.addEventListener('click', spaceConfirm)

// function deviceCheck(){
//     update(ref(db, MAC),{
//         esp: "0"
//     })
//     .then(()=>{
//         update(ref(db, MAC),{
//             esp: "1"
//         })
//     })
// }
// window.onload(deviceCheck());