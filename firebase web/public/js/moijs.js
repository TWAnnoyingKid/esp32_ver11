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
            if(!Cookies.get('device')){
                UserLost.showModal()
            }
            const deviceName = Cookies.get('device');


            var NameOfDevice = document.querySelector('#NameOfDevice')
            var MAC = deviceName.split(",")[1]
            NameOfDevice.innerHTML = deviceName.split(",")[0]
            var humid = document.querySelector('#humid')
            var humidTAG = document.querySelector('#humidTAG')
            var water = document.querySelector('#water')
            var waterTime = document.querySelector('#waterTime')
            var humidHigh = document.querySelector('#humidHigh')
            var humidLow = document.querySelector('#humidLow')
            var HourSetWrong = document.querySelector('#HourSetWrong')
            var MinSetWrong = document.querySelector('#MinSetWrong')
            var WTCheck = document.querySelector('#WTCheck')
            var WTconfirm = document.querySelector('#WTconfirm')
            var WTSet = document.querySelector('#WTSet')
            var WThr = document.querySelector('#WThr')
            var WTmin = document.querySelector('#WTmin')
            var WTSetconfirm = document.querySelector('#WTSetconfirm')

            const Today = new Date()
            const hour = Today.getHours().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})
            const minutes = Today.getMinutes().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})

            const MOI = ref(db, MAC + "/Moisture")
            const WTIMESet = ref(db, MAC + "/TIME")
            const wt = ref(db, MAC + "/WATER")

            onValue(MOI, (snapshot) => {
                if(snapshot.val() != "0" && snapshot.val() != null){
                    humidTAG.innerHTML = '目前土壤濕度：'
                    humid.innerHTML = snapshot.val() + '%'
                }else{
                    humidTAG.innerHTML = ''
                    humid.innerHTML = ''
                }
            })
            onValue(wt, (snapshot) => {
                if(snapshot.val() == "0"){
                    water.innerHTML = '澆水'
                }else{
                    water.innerHTML = '澆水中...'
                }
            })
            onValue(WTIMESet, (snapshot) => {
                if(snapshot.val() == '0' || snapshot.val() == null){
                    waterTime.innerHTML = '定時澆水'
                }else{
                    var TimeHR = snapshot.val().replace('"', "").replace('"', "").split(":")[0]
                    var TimeMIN = snapshot.val().replace('"', "").replace('"', "").split(":")[1]
                    if (TimeHR <= 9 && TimeMIN <= 9){
                        var Wtime = "0" + TimeHR + ":0" + TimeMIN 
                    }else if(TimeHR <= 9){
                        var Wtime = TimeHR + ":" + TimeMIN
                    }else if(TimeMIN <= 9){
                        var Wtime = TimeHR + ":0" + TimeMIN
                    }else{
                        var Wtime = TimeHR + ":" + TimeMIN
                    }
                    waterTime.innerHTML = '已設定 ' + Wtime + ' 澆水'
                }
            })
            
            function WTBTNSET(){
                WThr.value = hour
                WTmin.value = minutes
                if(waterTime.innerHTML == '定時澆水'){
                    WTSet.showModal()
                }else{
                    WTCheck.showModal()
                }
            }
            function ResetWT(){
                update(ref(db, MAC),{
                    TIME: "0"
                })
                WTCheck.close()
            }
            function SetWT(){
                if ( WThr.value >= 24 || WThr.value < 0){
                    HourSetWrong.showModal()
                }else if ( WTmin.value > 59 || WTmin.value < 0){
                    MinSetWrong.showModal()
                }else{
                    var time = '"' + WThr.value + ":" + WTmin.value + '"'
                    update(ref(db, MAC),{
                        TIME: time
                    })
                    WTSet.close()
                }
            }
            function watering(){
                if(water.innerHTML == "澆水"){
                    update(ref(db, MAC),{
                        WATER: "1"
                    })
                    water.innerHTML="澆水中..."
                }else if(water.innerHTML == "澆水中..."){
                    update(ref(db, MAC),{
                        WATER: "0"
                    })
                    water.innerHTML="澆水"
                }
                
            }

            waterTime.addEventListener('click',WTBTNSET)
            WTSetconfirm.addEventListener('click',SetWT)
            WTconfirm.addEventListener('click',ResetWT)
            water.addEventListener('click',watering)