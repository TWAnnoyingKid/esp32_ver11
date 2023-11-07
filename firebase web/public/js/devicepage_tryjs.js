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
const db = getDatabase(app);
const DfirebaseConfig = {
    apiKey: "AIzaSyAF4OdtYUAomk_4WnvE5MXb_nphlQ33UyA",
    authDomain: "esp8266-ai2.firebaseapp.com",
    databaseURL: "https://esp8266-ai2-default-rtdb.firebaseio.com",
    projectId: "esp8266-ai2",
    storageBucket: "esp8266-ai2.appspot.com",
    messagingSenderId: "245671703015",
    appId: "1:245671703015:web:28612316e5ec39dd6bcd42"
};
const Dapp = initializeApp(DfirebaseConfig, "secondary");
const Ddb = getDatabase(Dapp);

let spaceName = document.querySelector('#spaceName')
let spaceName1 = document.querySelector('#spaceName1')
let spaceName2 = document.querySelector('#spaceName2')
let spaceName3 = document.querySelector('#spaceName3')
let spaceName4 = document.querySelector('#spaceName4')
let spaceName5 = document.querySelector('#spaceName5')
let spaceName6 = document.querySelector('#spaceName6')
let spaceName7 = document.querySelector('#spaceName7')
let spaceName8 = document.querySelector('#spaceName8')
let spaceBTN1 = document.querySelector('#spaceBTN1')
let spaceBTN2 = document.querySelector('#spaceBTN2')
let spaceBTN3 = document.querySelector('#spaceBTN3')
let spaceBTN4 = document.querySelector('#spaceBTN4')
let spaceBTN5 = document.querySelector('#spaceBTN5')
let spaceBTN6 = document.querySelector('#spaceBTN6')
let spaceBTN7 = document.querySelector('#spaceBTN7')
let spaceBTN8 = document.querySelector('#spaceBTN8')
let trash = document.querySelector('#trash')
let removeConfirm = document.querySelector('#removeConfirm')
let removeSpaceName = document.querySelector('#removeSpaceName')
import { getDatabase, get , ref, child, onValue, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const adbref = ref(db);
Cookies.remove('saveName')
if(!Cookies.get('user')){
    UserLost.showModal()
}

var swiper1 = new Swiper('.mySwiper1', {
    mousewheel: true,
    centeredSlides: true,
    slidesPerView: 2.5,
    paginationClickable: true,
    spaceBetween: 5,
    freeMode: true,
    loop: false,
    on:{
        click: function(){
            var index = swiper1.clickedIndex;
            var now = swiper.realIndex;
            swiperChange(index, now)
            if (index != "0"){
                trash.style.display = 'block'
            }
        },
    }
});
function swiperChange(index, now){
    var nowspace = "spaceBTN" + now
    var nextspace = "spaceBTN" + index
    if (nextspace != "spaceBTN0"){
        trash.style.display = 'block'
    }else{
        trash.style.display = 'none'
    }
    let n = document.getElementById(nowspace)
    let i = document.getElementById(nextspace)
    n.setAttribute('class', 'swiper-slide')
    i.setAttribute('class', 'swiper-slide selected')
    swiper.slideTo(index, 500, false);
    swiper1.slideTo(index, 500, false);
};

var swiper = new Swiper(".mySwiper", {
    // mousewheel: true,
    spaceBetween: 18,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        slideNextTransitionStart: function(swiper){
            let index = Number(this.activeIndex) -1
            var nowspace = "spaceBTN" + index
            var nextspace = "spaceBTN" + this.activeIndex
            let n = document.getElementById(nowspace)
            let i = document.getElementById(nextspace)
            n.setAttribute('class', 'swiper-slide')
            i.setAttribute('class', 'swiper-slide selected')
            swiper1.slideTo(this.activeIndex, 500, false);
            if (nextspace != "spaceBTN0"){
                trash.style.display = 'block'
            }else{
                trash.style.display = 'none'
            }
        },
        slidePrevTransitionStart: function(swiper){
            let index = Number(this.activeIndex) +1
            var nowspace = "spaceBTN" + index
            var nextspace = "spaceBTN" + this.activeIndex
            let n = document.getElementById(nowspace)
            let i = document.getElementById(nextspace)
            n.setAttribute('class', 'swiper-slide')
            i.setAttribute('class', 'swiper-slide selected')
            swiper1.slideTo(this.activeIndex, 500, false);
            if (nextspace != "spaceBTN0"){
                trash.style.display = 'block'
            }else{
                trash.style.display = 'none'
            }
        },
    },
});

function deviceCheck(){
    if(Cookies.get('user')){
        Cookies.remove('space')
        Cookies.remove('device')
        Cookies.remove('tag')
        const user = Cookies.get('user')
        const dbref = ref(db, user)
        onValue(dbref, (snapshot) => {
            snapshot.forEach((devicetag) => {
                let a = devicetag.key
                if (devicetag.key.substr(0, 2) == "裝置"){
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
                    get(child(adbref, user + '/' + a + "/set"))
                    .then((deviceInfo)=>{
                        let devicestop = deviceInfo.val()
                        let mac = devicestop.replace('"', '').split(" ")[1]
                        addItems(devicestop, a);
                    })
                }else{
                    if(spaceName1.innerHTML == 'none'){
                        spaceName1.innerHTML = devicetag.key
                        spaceBTN1.innerHTML = devicetag.key
                        spaceBTN1.style.display = "block"
                        space1.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName1.innerHTML)
                        }else{
                            let allspacetag1 = Cookies.get('space') + "/" + spaceName1.innerHTML
                            Cookies.set('space', allspacetag1)
                        }
                        let spaceName = spaceName1.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace1"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }else if(spaceName2.innerHTML === 'none'){
                        spaceName2.innerHTML = devicetag.key
                        spaceBTN2.innerHTML = devicetag.key
                        spaceBTN2.style.display = "block"
                        space2.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName2.innerHTML)
                        }else{
                            let allspacetag2 = Cookies.get('space') + "/" + spaceName2.innerHTML
                            Cookies.set('space', allspacetag2)
                        }
                        let spaceName = spaceName2.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace2"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }else if(spaceName3.innerHTML === 'none'){
                        spaceName3.innerHTML = devicetag.key
                        spaceBTN3.innerHTML = devicetag.key
                        spaceBTN3.style.display = "block"
                        space3.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName3.innerHTML)
                        }else{
                            let allspacetag3 = Cookies.get('space') + "/" + spaceName3.innerHTML
                            Cookies.set('space', allspacetag3)
                        }
                        let spaceName = spaceName3.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace3"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }else if(spaceName4.innerHTML === 'none'){
                        spaceName4.innerHTML = devicetag.key
                        spaceBTN4.innerHTML = devicetag.key
                        spaceBTN4.style.display = "block"
                        space4.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName4.innerHTML)
                        }else{
                            let allspacetag4 = Cookies.get('space') + "/" + spaceName4.innerHTML
                            Cookies.set('space', allspacetag4)
                        }
                        let spaceName = spaceName4.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace4"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }else if(spaceName5.innerHTML === 'none'){
                        spaceName5.innerHTML = devicetag.key
                        spaceBTN5.innerHTML = devicetag.key
                        spaceBTN5.style.display = "block"
                        space5.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName5.innerHTML)
                        }else{
                            let allspacetag5 = Cookies.get('space') + "/" + spaceName5.innerHTML
                            Cookies.set('space', allspacetag5)
                        }
                        let spaceName = spaceName5.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace5"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }else if(spaceName6.innerHTML === 'none'){
                        spaceName6.innerHTML = devicetag.key
                        spaceBTN6.innerHTML = devicetag.key
                        spaceBTN6.style.display = "block"
                        space6.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName6.innerHTML)
                        }else{
                            let allspacetag6 = Cookies.get('space') + "/" + spaceName6.innerHTML
                            Cookies.set('space', allspacetag6)
                        }
                        let spaceName = spaceName6.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace6"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }else if(spaceName7.innerHTML === 'none'){
                        spaceName7.innerHTML = devicetag.key
                        spaceBTN7.innerHTML = devicetag.key
                        spaceBTN7.style.display = "block"
                        space7.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName7.innerHTML)
                        }else{
                            let allspacetag7 = Cookies.get('space') + "/" + spaceName7.innerHTML
                            Cookies.set('space', allspacetag7)
                        }
                        let spaceName = spaceName7.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace7"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }else if(spaceName8.innerHTML === 'none'){
                        spaceName8.innerHTML = devicetag.key
                        spaceBTN8.innerHTML = devicetag.key
                        spaceBTN8.style.display = "block"
                        space8.style.display = "block"
                        swiper.update()
                        swiper1.update()
                        if(!Cookies.get('space')){
                            Cookies.set('space', spaceName8.innerHTML)
                        }else{
                            let allspacetag8 = Cookies.get('space') + "/" + spaceName8.innerHTML
                            Cookies.set('space', allspacetag8)
                        }
                        let spaceName = spaceName8.innerHTML
                        const alldbref = ref(db, user + "/" + spaceName)
                        onValue(alldbref, (device) => {
                            device.forEach((spacedevice) => {
                                let s = spacedevice.key
                                let space = "deviceplace8"
                                if (spacedevice.key.substr(0, 2) == "裝置"){
                                    get(child(adbref, user + '/' + spaceName + "/" + s + "/set"))
                                    .then((deviceInfo)=>{
                                        let devicestop = deviceInfo.val()
                                        let mac = devicestop.replace('"', '').split(" ")[1]
                                        addSpaceItems(devicestop, s, space);
                                    })
                                }
                            })
                        })
                    }
                }
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
    let devicediv = document.createElement('div')
    let div = document.createElement('div')
    let p = document.createElement('p')
    devicediv.style.width = "35%"
    devicediv.style.height = "20%"
    devicediv.style.backgroundColor = "#16164e"
    if (devicestop.replace('"', '').split(" ")[2].replace('"', '') == "3stat"){
        var i = 3
        do{
            let p = document.createElement('p')
            let devicediv = document.createElement('div')
            let DN = document.createElement('p')
            let statBTN = document.createElement('img')
            devicediv.class = a
            devicediv.name = "devicediv"
            devicediv.id = devicestop.replace('"', '').replace('"', '').split(" ")
            let MAC = devicestop.replace('"', '').split(" ")[2].replace('"', '')
            devicediv.onclick = function deviceSetup(){
                Cookies.set('device', devicediv.id)
                Cookies.set('tag', devicediv.class)
                location.href = devicestop.replace('"', '').split(" ")[2].replace('"', '') + ".html"
            }
            devicediv.style.width = "35%"
            devicediv.style.height = "20%"
            devicediv.style.backgroundColor = "#16164e"
            devicediv.style.color = "#f0ffff"
            // devicediv.style.border-radius == "10px";
            p.innerHTML="  "
            let stat = devicestop.replace('"', '').split(" ")[i].replace('"', '')
            DN.innerHTML = stat
            statBTN.src = "picture/onBTN.png" 
            statBTN.id = devicediv.id
            statBTN.class = "d" + i
            statBTN.style.width = "30px"
            statBTN.style.height = "30px"
            if (i == 1){
                statBTN.onclick = function turn(){
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
            }
            
            deviceplace.appendChild(devicediv)
            devicediv.appendChild(DN)
            devicediv.appendChild(statBTN)
            deviceplace.appendChild(p)
            i++
        }while(i < 6);
    }else{
        devicediv.innerHTML = devicestop.replace('"', '').split(" ")[0]
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
        deviceplace.appendChild(devicediv)
    }
    deviceplace.appendChild(p);
}
function addSpaceItems(devicestop, s, space){
    let deviceplace = document.getElementById(space)
    let _devicestop = document.createElement('button')
    let p = document.createElement('p')

    p.innerHTML="  "
    _devicestop.class = s
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
function Spaces(){
    addSpace.showModal();
}
function addSpaces(){
    const user = Cookies.get('user')
    if(spaceName1.innerHTML == 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else if(spaceName2.innerHTML === 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else if(spaceName3.innerHTML === 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else if(spaceName4.innerHTML === 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else if(spaceName5.innerHTML === 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else if(spaceName6.innerHTML === 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else if(spaceName7.innerHTML === 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else if(spaceName8.innerHTML === 'none'){
        update(ref(db, user + "/" + spaceName.value),{
            set:1
        })
        .then(()=>{
            addSpace.close();
            window.location.reload()
        })
    }else{
        alert("最多只能有8個場景喔")
    }
}
function RSpace(){
    var now = swiper.realIndex;
    var RSpaceN = "spaceName" + now
    let n = document.getElementById(RSpaceN)
    removeSpaceName.innerHTML = "刪除場景：" + n.innerHTML + "？"
    removeDia.showModal()
}
function removing(){
    if(REMOVEword.value = "REMOVE"){
        let name = removeSpaceName.innerHTML.split("：")[1].split("？")[0]
        const user = Cookies.get('user')
        const dbref = ref(db, user + "/" + name)
        remove(ref(db, user + "/" + name + "/set"))
        .then(function(){
            get(child(adbref, user + '/' + name))
            .then((check) => {
                if (check.exists()) {
                    onValue(dbref, (snapshot) => {
                        snapshot.forEach((devicetag) => {
                            get(child(adbref, user + '/' + devicetag.key + "/set"))
                            .then((deviceInfo)=>{
                                remove(ref(db,  user + "/" + devicetag.key + "/room"))
                                .then(function(){
                                    remove(ref(db, user + "/" + name))
                                    removeDia.close()
                                    window.location.reload()
                                })
                            })
                        })
                    })
                }else{
                    remove(ref(db, user + "/" + name))
                    removeDia.close()
                    window.location.reload()
                }
            })
        })
    }else{
        alert("安全詞錯誤")
    }
}
trash.addEventListener('click',RSpace)
removeConfirm.addEventListener('click',removing)
space.addEventListener('click',Spaces)
addSpaceConfirm.addEventListener('click',addSpaces)
window.onload(deviceCheck());

