
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
const Today = new Date()
const hour = Today.getHours().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})
const minutes = Today.getMinutes().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})

const getSpace = ref(db, MAC + '/room')

const getD1 = ref(db, MAC + '/D1')
const getD2 = ref(db, MAC + '/D2')
const getD3 = ref(db, MAC + '/D3')

const getD1OT = ref(db, MAC + '/OT/D1')
const getD2OT = ref(db, MAC + '/OT/D2')
const getD3OT = ref(db, MAC + '/OT/D3')

const getD1CT = ref(db, MAC + '/CT/D1')
const getD2CT = ref(db, MAC + '/CT/D2')
const getD3CT = ref(db, MAC + '/CT/D3')

let StatOfD1 = document.querySelector('#StatOfD1')
let StatOfD2 = document.querySelector('#StatOfD2')
let StatOfD3 = document.querySelector('#StatOfD3')
let D1name = document.querySelector('#D1name')
let D2name = document.querySelector('#D2name')
let D3name = document.querySelector('#D3name')
let nameD1 = document.querySelector('#nameD1')
let nameD2 = document.querySelector('#nameD2')
let nameD3 = document.querySelector('#nameD3')
let TimeOnOfD1 = document.querySelector('#TimeOnOfD1')
let TimeOnOfD2 = document.querySelector('#TimeOnOfD2')
let TimeOnOfD3 = document.querySelector('#TimeOnOfD3')
let TimeOffOfD1 = document.querySelector('#TimeOffOfD1')
let TimeOffOfD2 = document.querySelector('#TimeOffOfD2')
let TimeOffOfD3 = document.querySelector('#TimeOffOfD3')
let TOD1Check = document.querySelector('#TOD1Check')
let TOD2Check = document.querySelector('#TOD2Check')
let TOD3Check = document.querySelector('#TOD3Check')
let TCD1Check = document.querySelector('#TCD1Check')
let TCD2Check = document.querySelector('#TCD2Check')
let TCD3Check = document.querySelector('#TCD3Check')
let TOD1confirm = document.querySelector('#TOD1confirm')
let TOD2confirm = document.querySelector('#TOD2confirm')
let TOD3confirm = document.querySelector('#TOD3confirm')
let TCD1confirm = document.querySelector('#TCD1confirm')
let TCD2confirm = document.querySelector('#TCD2confirm')
let TCD3confirm = document.querySelector('#TCD3confirm')
let TOD1Setconfirm = document.querySelector('#TOD1Setconfirm')
let TOD2Setconfirm = document.querySelector('#TOD2Setconfirm')
let TOD3Setconfirm = document.querySelector('#TOD3Setconfirm')
let TCD1Setconfirm = document.querySelector('#TCD1Setconfirm')
let TCD2Setconfirm = document.querySelector('#TCD2Setconfirm')
let TCD3Setconfirm = document.querySelector('#TCD3Setconfirm')
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
function spaceConfirm(){
    if(modeSet.value != '場景選單' && modeSet.value != '從此場景中移除'){
        update(ref(db, MAC),{
            room: modeSet.value
        })
        .then(()=>{
            moveDia.close()
        })
    }else if(modeSet.value == '從此場景中移除'){
        remove(ref(db, MAC + "/room"))
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
            set: '"' + NameOfDevice.innerHTML + " " + MAC + " 3stat " + NameOfD1.innerHTML + " " + NameOfD2.innerHTML + " " + NameOfD3.innerHTML + '"'
        })
    }
})

NameOfDevice.innerHTML = deviceName.split(",")[0]
NameOfD1.innerHTML = deviceName.split(",")[3]
NameOfD2.innerHTML = deviceName.split(",")[4]
NameOfD3.innerHTML = deviceName.split(",")[5]

onValue(getD1, (snapshot) => {
    let StatOfD1 = document.querySelector('#StatOfD1')
    if (snapshot.val() == '0'){
        StatOfD1.src="picture/offBTN.png"
        StatOfD1.name="off"
        StatOfD1.setAttribute('class' , "SWoff")
    }else{
        StatOfD1.src="picture/onBTN.png"
        StatOfD1.name="on"
        StatOfD1.setAttribute('class' , "SWon")
    }
})
onValue(getD2, (snapshot) => {
    let StatOfD2 = document.querySelector('#StatOfD2')
    if (snapshot.val() == '0'){
        StatOfD2.src="picture/offBTN.png"
        StatOfD2.name="off"
        StatOfD2.setAttribute('class' , "SWoff")
    }else{
        StatOfD2.src="picture/onBTN.png"
        StatOfD2.name="on"
        StatOfD2.setAttribute('class' , "SWon")
    }
})
onValue(getD3, (snapshot) => {
    let StatOfD3 = document.querySelector('#StatOfD3')
    if (snapshot.val() == '0'){
        StatOfD3.src="picture/offBTN.png"
        StatOfD3.name="off"
        StatOfD3.setAttribute('class' , "SWoff")
    }else{
        StatOfD3.src="picture/onBTN.png"
        StatOfD3.name="on"
        StatOfD3.setAttribute('class' , "SWon")
    }
})

let open = "1"
let close = "0"

function ChangeD1(){
    if(StatOfD1.name == "off"){
        StatOfD1.src = "picture/onBTN.png"
        StatOfD1.setAttribute('class' , "SWon")
        update(ref(db, MAC),{
            D1: open
        })
    }else if(StatOfD1.name == "on"){
        StatOfD1.src = "picture/offBTN.png"
        StatOfD1.setAttribute('class' , "SWoff")
        update(ref(db, MAC),{
            D1: close
        })
    }
}
function ChangeD2(){
    if(StatOfD2.name == "off"){
        StatOfD2.src = "picture/onBTN.png"
        StatOfD2.setAttribute('class' , "SWon")
        update(ref(db, MAC),{
            D2: open
        })
    }else if(StatOfD2.name == "on"){
        StatOfD2.src = "picture/offBTN.png"
        StatOfD2.setAttribute('class' , "SWoff")
        update(ref(db, MAC),{
            D2: close
        })
    }
}
function ChangeD3(){
    if(StatOfD3.name == "off"){
        StatOfD3.src = "picture/onBTN.png"
        StatOfD3.setAttribute('class' , "SWon")
        update(ref(db, MAC),{
            D3: open
        })
    }else if(StatOfD3.name == "on"){
        StatOfD3.src = "picture/offBTN.png"
        StatOfD3.setAttribute('class' , "SWoff")
        update(ref(db, MAC),{
            D3: close
        })
    }
}

onValue(getD1OT, (snapshot) => {
    let TimeOnOfD1 = document.querySelector('#TimeOnOfD1')
    if (snapshot.val() == '0'){
        TimeOnOfD1.innerHTML = '設定開啟時間'
    }else{
        let D1OTimeHR = snapshot.val().replace('"', "").replace('"', "").split(":")[0]
        let D1OTimeMIN = snapshot.val().replace('"', "").replace('"', "").split(":")[1]
        if (D1OTimeHR <= 9 && D1OTimeMIN <= 9){
            var D1Otime = "0" + D1OTimeHR + ":0" + D1OTimeMIN 
        }else if(D1OTimeHR <= 9){
            var D1Otime = D1OTimeHR + ":" + D1OTimeMIN
        }else if(D1OTimeMIN <= 9){
            var D1Otime = D1OTimeHR + ":0" + D1OTimeMIN
        }else{
            var D1Otime = D1OTimeHR + ":" + D1OTimeMIN
        }
        TimeOnOfD1.innerHTML = '已設定' + D1Otime + '開啟'
    }
})
onValue(getD2OT, (snapshot) => {
    let TimeOnOfD2 = document.querySelector('#TimeOnOfD2')
    if (snapshot.val() == '0'){
        TimeOnOfD2.innerHTML = '設定開啟時間'
    }else{
        let D2OTimeHR = snapshot.val().replace('"', "").replace('"', "").split(":")[0]
        let D2OTimeMIN = snapshot.val().replace('"', "").replace('"', "").split(":")[1]
        if (D2OTimeHR <= 9 && D2OTimeMIN <= 9){
            var D2Otime = "0" + D2OTimeHR + ":0" + D2OTimeMIN 
        }else if(D2OTimeHR <= 9){
            var D2Otime = D2OTimeHR + ":" + D2OTimeMIN
        }else if(D2OTimeMIN <= 9){
            var D2Otime = D2OTimeHR + ":0" + D2OTimeMIN
        }else{
            var D2Otime = D2OTimeHR + ":" + D2OTimeMIN
        }
        TimeOnOfD2.innerHTML = '已設定' + D2Otime + '開啟'
    }
})
onValue(getD3OT, (snapshot) => {
    let TimeOnOfD3 = document.querySelector('#TimeOnOfD3')
    if (snapshot.val() == '0'){
        TimeOnOfD3.innerHTML = '設定開啟時間'
    }else{
        let D3OTimeHR = snapshot.val().replace('"', "").replace('"', "").split(":")[0]
        let D3OTimeMIN = snapshot.val().replace('"', "").replace('"', "").split(":")[1]
        if (D3OTimeHR <= 9 && D3OTimeMIN <= 9){
            var D3Otime = "0" + D3OTimeHR + ":0" + D3OTimeMIN 
        }else if(D3OTimeHR <= 9){
            var D3Otime = D3OTimeHR + ":" + D3OTimeMIN
        }else if(D3OTimeMIN <= 9){
            var D3Otime = D3OTimeHR + ":0" + D3OTimeMIN
        }else{
            var D3Otime = D3OTimeHR + ":" + D3OTimeMIN
        }
        TimeOnOfD3.innerHTML = '已設定' + D3Otime + '開啟'
    }
})

onValue(getD1CT, (snapshot) => {
    let TimeOffOfD1 = document.querySelector('#TimeOffOfD1')
    if (snapshot.val() == '0'){
        TimeOffOfD1.innerHTML = '設定關閉時間'
    }else{
        let D1CTimeHR = snapshot.val().replace('"', "").replace('"', "").split(":")[0]
        let D1CTimeMIN = snapshot.val().replace('"', "").replace('"', "").split(":")[1]
        if (D1CTimeHR <= 9 && D1CTimeMIN <= 9){
            var D1Ctime = "0" + D1CTimeHR + ":0" + D1CTimeMIN 
        }else if(D1CTimeHR <= 9){
            var D1Ctime = D1CTimeHR + ":" + D1CTimeMIN
        }else if(D1CTimeMIN <= 9){
            var D1Ctime = D1CTimeHR + ":0" + D1CTimeMIN
        }else{
            var D1Ctime = D1CTimeHR + ":" + D1CTimeMIN
        }
        TimeOffOfD1.innerHTML = '已設定' + D1Ctime + '關閉'
    }
})
onValue(getD2CT, (snapshot) => {
    let TimeOffOfD2 = document.querySelector('#TimeOffOfD2')
    if (snapshot.val() == '0'){
        TimeOffOfD2.innerHTML = '設定關閉時間'
    }else{
        let D2CTimeHR = snapshot.val().replace('"', "").replace('"', "").split(":")[0]
        let D2CTimeMIN = snapshot.val().replace('"', "").replace('"', "").split(":")[1]
        if (D2CTimeHR <= 9 && D2CTimeMIN <= 9){
            var D2Ctime = "0" + D2CTimeHR + ":0" + D2CTimeMIN 
        }else if(D2CTimeHR <= 9){
            var D2Ctime = D2CTimeHR + ":" + D2CTimeMIN
        }else if(D2CTimeMIN <= 9){
            var D2Ctime = D2CTimeHR + ":0" + D2CTimeMIN
        }else{
            var D2Ctime = D2CTimeHR + ":" + D2CTimeMIN
        }
        TimeOffOfD2.innerHTML = '已設定' + D2Ctime + '關閉'
    }
})
onValue(getD3CT, (snapshot) => {
    let TimeOffOfD3 = document.querySelector('#TimeOffOfD3')
    if (snapshot.val() == '0'){
        TimeOffOfD3.innerHTML = '設定關閉時間'
    }else{
        let D3CTimeHR = snapshot.val().replace('"', "").replace('"', "").split(":")[0]
        let D3CTimeMIN = snapshot.val().replace('"', "").replace('"', "").split(":")[1]
        if (D3CTimeHR <= 9 && D3CTimeMIN <= 9){
            var D3Ctime = "0" + D3CTimeHR + ":0" + D3CTimeMIN 
        }else if(D3CTimeHR <= 9){
            var D3Ctime = D3CTimeHR + ":" + D3CTimeMIN
        }else if(D3CTimeMIN <= 9){
            var D3Ctime = D3CTimeHR + ":0" + D3CTimeMIN
        }else{
            var D3Ctime = D3CTimeHR + ":" + D3CTimeMIN
        }
        TimeOffOfD3.innerHTML = '已設定' + D3Ctime + '關閉'
    }
})



function AskD1OT(){
    TOD1hr.value = hour
    TOD1min.value = minutes
    if(TimeOnOfD1.innerHTML == '設定開啟時間'){
        TOD1Set.showModal()
    }else{
        TOD1Check.showModal()
    }
}
function AskD2OT(){
    TOD2hr.value = hour
    TOD2min.value = minutes
    if(TimeOnOfD2.innerHTML == '設定開啟時間'){
        TOD2Set.showModal()
    }else{
        TOD2Check.showModal()
    }
}
function AskD3OT(){
    TOD3hr.value = hour
    TOD3min.value = minutes
    if(TimeOnOfD3.innerHTML == '設定開啟時間'){
        TOD3Set.showModal()
    }else{
        TOD3Check.showModal()
    }
}

function ResetD1OT(){
    update(ref(db, MAC + '/OT'),{
        D1: close
    })
    TOD1Check.close()
}
function ResetD2OT(){
    update(ref(db, MAC + '/OT'),{
        D2: close
    })
    TOD2Check.close()
}
function ResetD3OT(){
    update(ref(db, MAC + '/OT'), {
        D3: close
    })
    TOD3Check.close()
}

function SetD1OT(){
    if ( TOD1hr.value >= 24 || TOD1hr.value < 0){
        HourSetWrong.showModal()
    }else if ( TOD1min.value > 59 || TOD1min.value < 0){
        MinSetWrong.showModal()
    }else{
        let time = '"' + TOD1hr.value + ":" + TOD1min.value + '"'
        update(ref(db, MAC + '/OT'),{
            D1: time
        })
        TOD1Set.close() 
    }
    
}
function SetD2OT(){
    if ( TOD2hr.value >= 24 || TOD2hr.value < 0){
        HourSetWrong.showModal()
    }else if ( TOD2min.value > 59 || TOD2min.value < 0){
        MinSetWrong.showModal()
    }else{
        let time = '"' + TOD2hr.value + ":" + TOD2min.value + '"'
        update(ref(db, MAC + '/OT'),{
            D2: time
        })
        TOD2Set.close()
    }
}
function SetD3OT(){
    if ( TOD3hr.value >= 24 || TOD3hr.value < 0){
        HourSetWrong.showModal()
    }else if ( TOD3min.value > 59 || TOD3min.value < 0){
        MinSetWrong.showModal()
    }else{
        let time = '"' + TOD3hr.value + ":" + TOD3min.value + '"'
        update(ref(db, MAC + '/OT'),{
            D3: time
        })
        TOD3Set.close()
    }
}

function AskD1CT(){
    TCD1hr.value = hour
    TCD1min.value = minutes
    if(TimeOffOfD1.innerHTML == '設定關閉時間'){
        TCD1Set.showModal()
    }else{
        TCD1Check.showModal()
    }
}
function AskD2CT(){
    TCD2hr.value = hour
    TCD2min.value = minutes
    if(TimeOffOfD2.innerHTML == '設定關閉時間'){
        TCD2Set.showModal()
    }else{
        TCD2Check.showModal()
    }
}
function AskD3CT(){
    TCD3hr.value = hour
    TCD3min.value = minutes
    if(TimeOffOfD3.innerHTML == '設定關閉時間'){
        TCD3Set.showModal()
    }else{
        TCD3Check.showModal()
    }
}

function ResetD1CT(){
    update(ref(db, MAC + '/CT'),{
        D1: close
    })
    TCD1Check.close()
}
function ResetD2CT(){
    update(ref(db, MAC + '/CT'),{
        D2: close
    })
    TCD2Check.close()
}
function ResetD3CT(){
    update(ref(db, MAC + '/CT'),{
        D3: close
    })
    TCD3Check.close()
}

function SetD1CT(){
    if ( TCD1hr.value >= 24 || TCD1hr.value < 0){
        HourSetWrong.showModal()
    }else if ( TCD1min.value > 59 || TCD1min.value < 0){
        MinSetWrong.showModal()
    }else{
        let time = '"' + TCD1hr.value + ":" + TCD1min.value + '"'
        update(ref(db, MAC + '/CT'),{
            D1: time
        })
        TCD1Set.close()
    }
}
function SetD2CT(){
    if ( TCD2hr.value >= 24 || TCD2hr.value < 0){
        HourSetWrong.showModal()
    }else if ( TCD2min.value > 59 || TCD2min.value < 0){
        MinSetWrong.showModal()
    }else{
        let time = '"' + TCD2hr.value + ":" + TCD2min.value + '"'
        update(ref(db, MAC + '/CT'),{
            D2: time
        })
        TCD2Set.close()
    }
}
function SetD3CT(){
    if ( TCD3hr.value >= 24 || TCD3hr.value < 0){
        HourSetWrong.showModal()
    }else if ( TCD3min.value > 59 || TCD3min.value < 0){
        MinSetWrong.showModal()
    }else{
        let time = '"' + TCD3hr.value + ":" + TCD3min.value + '"'
        update(ref(db, MAC + '/CT'),{
            D3: time
        })
        TCD3Set.close()
    }
}

function ChangeDeviceName(){
    nameD.showModal()
    Dname.innerHTML = '原本的裝置名稱：' + NameOfDevice.innerHTML
}

function ChangeD1Name(){
    nameD1.showModal()
    D1name.innerHTML = '原本的裝置名稱：' + NameOfD1.innerHTML
}
function ChangeD2Name(){
    nameD2.showModal()
    D2name.innerHTML = '原本的裝置名稱：' + NameOfD2.innerHTML
}
function ChangeD3Name(){
    nameD3.showModal()
    D3name.innerHTML = '原本的裝置名稱：' + NameOfD3.innerHTML
}

function newDname(){
    NameOfDevice.innerHTML = DnewName.value
    update(ref(userdb,  user + "/" + deviceTag),{
        set: '"' + DnewName.value + " " + MAC + " 3stat " + NameOfD1.innerHTML + " " + NameOfD2.innerHTML + " " + NameOfD3.innerHTML + '"'
    })
    if(NameOfSpace.innerHTML != "總裝置"){
        update(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag),{
            set: '"' + DnewName.value + " " + MAC + " 3stat " + NameOfD1.innerHTML + " " + NameOfD2.innerHTML + " " + NameOfD3.innerHTML + '"'
        })
    }
    nameD.close()
}
function newD1name(){
    NameOfD1.innerHTML = D1newName.value
    update(ref(userdb,  user + "/" + deviceTag),{
        set: '"' + NameOfDevice.innerHTML + " " + MAC + " 3stat " + D1newName.value + " " + NameOfD2.innerHTML + " " + NameOfD3.innerHTML + '"'
    })
    if(NameOfSpace.innerHTML != "總裝置"){
        update(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag),{
            set: '"' + NameOfDevice.innerHTML + " " + MAC + " 3stat " + D1newName.value + " " + NameOfD2.innerHTML + " " + NameOfD3.innerHTML + '"'
        })
    }
    nameD1.close()
}
function newD2name(){
    NameOfD2.innerHTML = D2newName.value
    update(ref(userdb,  user + "/" + deviceTag),{
        set: '"' + NameOfDevice.innerHTML + " " + MAC + " 3stat " + NameOfD1.innerHTML + " " + D2newName.value + " " + NameOfD3.innerHTML + '"'
    })
    if(NameOfSpace.innerHTML != "總裝置"){
        update(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag),{
            set: '"' + NameOfDevice.innerHTML + " " + MAC + " 3stat " + NameOfD1.innerHTML + " " + D2newName.value + " " + NameOfD3.innerHTML + '"'        
        })
    }
    nameD2.close()
}
function newD3name(){
    NameOfD3.innerHTML = D3newName.value
    update(ref(userdb,  user + "/" + deviceTag),{
        set: '"' + NameOfDevice.innerHTML + " " + MAC + " 3stat " + NameOfD1.innerHTML + " " +NameOfD2.innerHTML + " " + D3newName.value + '"'
    })
    if(NameOfSpace.innerHTML != "總裝置"){
        update(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag),{
            set: '"' + NameOfDevice.innerHTML + " " + MAC + " 3stat " + NameOfD1.innerHTML + " " +NameOfD2.innerHTML + " " + D3newName.value + '"'
        })
    }
    nameD3.close()
}

function delataDevice(){
    if(REMOVEword.value == "REMOVE"){
        if(NameOfSpace.innerHTML != "總裝置"){
            remove(ref(db, MAC + "/room"))
            remove(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag)) 
         }
        remove(ref(userdb,  user + "/" + deviceTag))
        .then(()=>{
            remove(ref(db, MAC + '/USER' + user))
            .then(()=>{
                removeDia.close()
                window.location.href = "devicepage.html"
            })
        })
    }else{
        alert("安全詞錯誤")
    }
}
function deviceCheck(){
    update(ref(db, MAC),{
        esp: "0"
    })
    .then(()=>{
        update(ref(db, MAC),{
            esp: "1"
        })
    })
}
window.onload(deviceCheck());

removeConfirm.addEventListener('click', delataDevice)
StatOfD1.addEventListener('click', ChangeD1)
StatOfD2.addEventListener('click', ChangeD2)
StatOfD3.addEventListener('click', ChangeD3)

ChangeDName.addEventListener('click', ChangeDeviceName)
newD1.addEventListener('click', ChangeD1Name)
newD2.addEventListener('click', ChangeD2Name)
newD3.addEventListener('click', ChangeD3Name)

TimeOnOfD1.addEventListener('click', AskD1OT)
TimeOnOfD2.addEventListener('click', AskD2OT)
TimeOnOfD3.addEventListener('click', AskD3OT)
TimeOffOfD1.addEventListener('click', AskD1CT)
TimeOffOfD2.addEventListener('click', AskD2CT)
TimeOffOfD3.addEventListener('click', AskD3CT)

TOD1confirm.addEventListener('click', ResetD1OT)
TOD2confirm.addEventListener('click', ResetD2OT)
TOD3confirm.addEventListener('click', ResetD3OT)
TCD1confirm.addEventListener('click', ResetD1CT)
TCD2confirm.addEventListener('click', ResetD2CT)
TCD3confirm.addEventListener('click', ResetD3CT)

TOD1Setconfirm.addEventListener('click', SetD1OT)
TOD2Setconfirm.addEventListener('click', SetD2OT)
TOD3Setconfirm.addEventListener('click', SetD3OT)
TCD1Setconfirm.addEventListener('click', SetD1CT)
TCD2Setconfirm.addEventListener('click', SetD2CT)
TCD3Setconfirm.addEventListener('click', SetD3CT)

Dconfirm.addEventListener('click', newDname)
D1confirm.addEventListener('click', newD1name)
D2confirm.addEventListener('click', newD2name)
D3confirm.addEventListener('click', newD3name)

moveConfirm.addEventListener('click', spaceConfirm)


