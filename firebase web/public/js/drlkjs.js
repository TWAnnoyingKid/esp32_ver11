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


let NameOfDevice = document.querySelector('#NameOfDevice')
let MAC = deviceName.split(",")[1]
NameOfDevice.innerHTML = deviceName.split(",")[0]
let openGate = document.querySelector('#openGate')
let changePassword = document.querySelector('#changePassword')
let tempPassword = document.querySelector('#tempPassword')
let addCard = document.querySelector('#addCard')
let PWCheck = document.querySelector('#PWCheck')
let PWSet = document.querySelector('#PWSet')
let PWconfirm = document.querySelector('#PWconfirm')
let PWSetconfirm = document.querySelector('#PWSetconfirm')
let PW = document.querySelector('#PW')
let oldPW = document.querySelector('#oldPW')
let oldPWCheck = document.querySelector('#oldPWCheck')
let oldPWconfirm = document.querySelector('#oldPWconfirm')
let PWerror = document.querySelector('#PWerror')
let tempPW = document.querySelector('#tempPW')
let NewCardSetconfirm = document.querySelector('#NewCardSetconfirm')
let NewCardSetERROR = document.querySelector('#NewCardSetERROR')
let NewCardUid = document.querySelector('#NewCardUid')
let NewCard = document.querySelector('#NewCard')
let CardExist = document.querySelector('#CardExist')
let CardExistErr = document.querySelector('#CardExistErr')
let gatestat = document.querySelector('#gatestat')
const OP = ref(db, MAC + '/D1')
const NC = ref(db, MAC + '/TEMP_UID')
const PWTemp = ref(db, MAC + "/Password/PWTemp")
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
        if(NameOfSpace.innerHTML != "總裝置"){
            remove(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" +deviceTag)) 
        }
        NameOfSpace.innerHTML = snapshot.val()
        update(ref(userdb,  user + "/" + snapshot.val() + "/" +deviceTag),{
            set: '"' + NameOfDevice.innerHTML + " " + MAC + " drlk " + "智慧門鎖" + '"'
        })
    }
})

onValue(OP, (snapshot) => {
    let openGate = document.querySelector('#openGate')
    if (snapshot.val() == '0'){
        openGate.src = "picture/lock.png"
        gatestat.innerHTML="關門"
        openGate.setAttribute('class', 'gatelock')
        openGate.name='lock'
        
    }else{
        openGate.src = "picture/unlock.png"
        gatestat.innerHTML="開門"
        openGate.setAttribute('class', 'gateunlock')
        openGate.name='unlock'
    }
})
onValue(PWTemp, (snapshot) => {
    let openGate = document.querySelector('#openGate')
    if (snapshot.val() != "0"){
        tempPassword.innerHTML = '暫時密碼已設定'
        tempPW.innerHTML = snapshot.val().replace('"', "").replace('"', "")
    }else{
        tempPassword.innerHTML = '建立暫時密碼'
        tempPW.innerHTML = "目前無暫時密碼"
    }
    loading.close()
})

function opendoor(){
    if(openGate.name=="lock"){
        openGate.src = "picture/unlock.png"
        gatestat.innerHTML="開門"
        openGate.setAttribute('class', 'gateunlock')
        openGate.name='unlock'
        update(ref(db, MAC),{
            D1: "1"
        })
    }else if(openGate.name=="unlock"){
        openGate.src = "picture/lock.png"
        gatestat.innerHTML="關門"
        openGate.setAttribute('class', 'gatelock')
        openGate.name='lock'
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
            let oPW = snapshot.val().replace('"', "").replace('"', "")
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
    if (tempPW.innerHTML == "目前無暫時密碼"){
        let tpw = (Math.floor(Math.random() * 1000000) + 100000)
            update(ref(db, MAC + "/Password"),{
                PWTemp: '"' + tpw + '"'
            })
    }else{
        TempPWCheck.showModal()
    }
    
}
function ResetTempPW(){
    update(ref(db, MAC + "/Password"),{
        PWTemp: '0'
    })
    TempPWCheck.close()
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
                let uid = snapshot.val().replace('"', "").replace('"', "")
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
    let uid = NewCardUid.innerHTML

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
        set: '"' + DnewName.value + " " + MAC + " drlk " + "智慧門鎖" + '"'
    })
    if(NameOfSpace.innerHTML != "總裝置"){
        update(ref(userdb,  user + "/" + NameOfSpace.innerHTML + "/" + deviceTag),{
            set: '"' + DnewName.value + " " + MAC + " drlk " + "智慧門鎖" + '"'
        })
    }
    nameD.close()
}
ChangeDName.addEventListener('click', ChangeDeviceName)
Dconfirm.addEventListener('click', newDname)

removeConfirm.addEventListener('click', delataDevice)

openGate.addEventListener('click', opendoor)
changePassword.addEventListener('click', setPW)
oldPWconfirm.addEventListener('click', oldPWcheck)
PWSetconfirm.addEventListener('click', NewPWSet)
tempPassword.addEventListener('click', SetTempPW)
TempPWcancel.addEventListener('click', ResetTempPW)
addCard.addEventListener('click', addNewCard)
NewCardSetconfirm.addEventListener('click', NewCardSus)
NewCardSetERROR.addEventListener('click', NewCardERROR)
CardExistErr.addEventListener('click', NewCardERROR)
moveConfirm.addEventListener('click', spaceConfirm)
window.onload(loading.showModal())

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