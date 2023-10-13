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
let spaceName = document.querySelector('#spaceName')
let spaceName1 = document.querySelector('#spaceName1')
let spaceName2 = document.querySelector('#spaceName2')
let spaceName3 = document.querySelector('#spaceName3')
let spaceName4 = document.querySelector('#spaceName4')
let spaceName5 = document.querySelector('#spaceName5')
let spaceName6 = document.querySelector('#spaceName6')
let spaceName7 = document.querySelector('#spaceName7')
let spaceName8 = document.querySelector('#spaceName8')
let spaceBTN0 = document.querySelector('#spaceBTN0')
let spaceBTN1 = document.querySelector('#spaceBTN1')
let spaceBTN2 = document.querySelector('#spaceBTN2')
let spaceBTN3 = document.querySelector('#spaceBTN3')
let spaceBTN4 = document.querySelector('#spaceBTN4')
let spaceBTN5 = document.querySelector('#spaceBTN5')
let spaceBTN6 = document.querySelector('#spaceBTN6')
let spaceBTN7 = document.querySelector('#spaceBTN7')
let spaceBTN8 = document.querySelector('#spaceBTN8')

import { getDatabase, get , ref, child, onValue, update } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
const db = getDatabase();
const adbref = ref(db);
Cookies.remove('saveName')
if(!Cookies.get('user')){
    UserLost.showModal()
}

var swiper1 = new Swiper('.mySwiper1', {
    mousewheel: true,
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 10,
    freeMode: true,
    loop: false,
    on:{
        click: function(){
            var index = swiper1.clickedIndex;
            var now = swiper.realIndex;
            swiperChange(index, now)
        },
    }
});
function swiperChange(index, now){
    var nowspace = "spaceBTN" + now
    var nextspace = "spaceBTN" + index
    let n = document.getElementById(nowspace)
    let i = document.getElementById(nextspace)
    n.setAttribute('class', 'swiper-slide')
    i.setAttribute('class', 'swiper-slide selected')
    swiper.slideTo(index, 500, false);
};

var swiper = new Swiper(".mySwiper", {
    mousewheel: true,
    spaceBetween: 18,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        // init: function(swiper){
        //     let word = document.getElementById("spaceName1").innerHTML
        //     if (word == 'none'){
        //         swiper.allowSlideNext = false
        //     }else{
        //         swiper.allowSlideNext = true
        //     }
        // }, 
        slideNextTransitionStart: function(swiper){
            let actn = Number(this.activeIndex) + 1
            if (actn>=8){
                actn=8
            }
            let wordtagn = "spaceName" + actn
            let wordn = document.getElementById(wordtagn).innerHTML
            if (wordn == 'none'){
                swiper.allowSlideNext = false
            }else{
                swiper.allowSlideNext = true
            }
        },
        slidePrevTransitionStart: function(swiper){
            let actp = Number(this.activeIndex) -1
            if (actp<=0){
                actp=0
            }
            let wordtagp = "spaceName" + actp
            let wordp = document.getElementById(wordtagp).innerHTML
            if (wordp == 'none'){
                swiper.allowSlideNext = false
            }else{
                swiper.allowSlideNext = true
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

space.addEventListener('click',Spaces)
addSpaceConfirm.addEventListener('click',addSpaces)
window.onload(deviceCheck());

