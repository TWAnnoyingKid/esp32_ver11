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


var NameOfDevice = document.querySelector('#NameOfDevice')
var MAC = deviceName.split(",")[1]
NameOfDevice.innerHTML = deviceName.split(",")[0]
var openGate = document.querySelector('#openGate')
var changePassword = document.querySelector('#changePassword')
var tempPassword = document.querySelector('#tempPassword')
var addCard = document.querySelector('#addCard')
var PWCheck = document.querySelector('#PWCheck')
var PWSet = document.querySelector('#PWSet')
var PWconfirm = document.querySelector('#PWconfirm')
var PWSetconfirm = document.querySelector('#PWSetconfirm')
var PW = document.querySelector('#PW')
var oldPW = document.querySelector('#oldPW')
var oldPWCheck = document.querySelector('#oldPWCheck')
var oldPWconfirm = document.querySelector('#oldPWconfirm')
var PWerror = document.querySelector('#PWerror')
var tempPW = document.querySelector('#tempPW')
var NewCardSetconfirm = document.querySelector('#NewCardSetconfirm')
var NewCardSetERROR = document.querySelector('#NewCardSetERROR')
var NewCardUid = document.querySelector('#NewCardUid')
var NewCard = document.querySelector('#NewCard')
var CardExist = document.querySelector('#CardExist')
var CardExistErr = document.querySelector('#CardExistErr')

const OP = ref(db, MAC + '/D1')
const NC = ref(db, MAC + '/TEMP_UID')
const PWTemp = ref(db, MAC + "/Password/PWTemp")

onValue(OP, (snapshot) => {
    var openGate = document.querySelector('#openGate')
    if (snapshot.val() == '0'){
        openGate.innerHTML = '開門'
    }else{
        openGate.innerHTML = '關門'
    }
})
onValue(PWTemp, (snapshot) => {
    var openGate = document.querySelector('#openGate')
    if (snapshot.val() != "0"){
        tempPassword.innerHTML = '暫時密碼已設定'
        tempPW.innerHTML = snapshot.val().replace('"', "").replace('"', "")
    }else{
        tempPassword.innerHTML = '建立暫時密碼'
        tempPW.innerHTML = ""
    }
})

function opendoor(){
    if(openGate.innerHTML == '開門'){
        update(ref(db, MAC),{
            D1: "1"
        })
    }else if(openGate.innerHTML == '關門'){
        update(ref(db, MAC),{
            D1: "0"
        })
    }
}
function setPW() {
    const dbref = ref(db);
    get(child(dbref, MAC + "/Password/PW1"))
    .then((snapshot)=>{
        if (snapshot.exists()) {
            PWCheck.showModal()
        }else{
            PWSet.showModal()
        }
    })
}
function oldPWcheck(){
    const dbref = ref(db);
    get(child(dbref, MAC + "/Password/PW1"))
    .then((snapshot)=>{
        if (snapshot.exists()) {
            var oPW = snapshot.val().replace('"', "").replace('"', "")
            if(oldPW.value == oPW){
                PWSet.showModal()
                oldPWCheck.close()
            }else{
                oldPWCheck.close()
                PWerror.showModal()
            }
        }
    })
}
function NewPWSet(){
    update(ref(db, MAC + "/Password"),{
        PW1: '"' + PW.value + '"'
    })
    PWSet.close()
}
function SetTempPW(){
    var tpw = (Math.floor(Math.random() * 1000000) + 100000)
    update(ref(db, MAC + "/Password"),{
        PWTemp: '"' + tpw + '"'
    })
}
function addNewCard(){
    if (addCard.innerHTML == '停止新增卡片'){
        addCard.innerHTML = '新增一張卡片'
    }else if (addCard.innerHTML == '新增一張卡片'){
        addCard.innerHTML = '停止新增卡片'
    }
    update(ref(db, MAC),{
        TEMP_UID: '"0"'
    })
    
}

onValue(NC, (snapshot) => {
    if(addCard.innerHTML == '停止新增卡片'){
        if(snapshot.val().replace('"', "").replace('"', "") != 0){
            if(snapshot.val().replace('"', "").replace('"', "") == 1){
                CardExist.showModal()
            }else{
                var uid = snapshot.val().replace('"', "").replace('"', "")
                NewCardUid.innerHTML = uid
                NewCard.showModal()  
            }
        }else{
            NewCardUid.innerHTML = ''
        }
    }       
})
function NewCardSus(){
    addCard.innerHTML = '新增一張卡片'
    NewCard.close()
    var uid = NewCardUid.innerHTML

    update(ref(db, MAC),{
        TEMP_UID: "0"
    })
    update(ref(db, MAC + "/UID/" + uid),{
        activation :"1"
    })
}
function NewCardERROR(){
    addCard.innerHTML = '新增一張卡片'
    NewCard.close()
    CardExist.close()
    update(ref(db, MAC),{
        TEMP_UID: "0"
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

openGate.addEventListener('click', opendoor)
changePassword.addEventListener('click', setPW)
oldPWconfirm.addEventListener('click', oldPWcheck)
PWSetconfirm.addEventListener('click', NewPWSet)
tempPassword.addEventListener('click', SetTempPW)
addCard.addEventListener('click', addNewCard)
NewCardSetconfirm.addEventListener('click', NewCardSus)
NewCardSetERROR.addEventListener('click', NewCardERROR)
CardExistErr.addEventListener('click', NewCardERROR)