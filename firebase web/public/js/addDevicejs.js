import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
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
            const firebaseDeviceConfig = {
                apiKey: "AIzaSyAF4OdtYUAomk_4WnvE5MXb_nphlQ33UyA",
                authDomain: "esp8266-ai2.firebaseapp.com",
                databaseURL: "https://esp8266-ai2-default-rtdb.firebaseio.com",
                projectId: "esp8266-ai2",
                storageBucket: "esp8266-ai2.appspot.com",
                messagingSenderId: "245671703015",
                appId: "1:245671703015:web:28612316e5ec39dd6bcd42"
            };

            const userApp = initializeApp(firebaseUserConfig);
            const deviceApp = initializeApp(firebaseDeviceConfig, "secondary");
            import { getDatabase, get , ref, child, onValue, update, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
            const userdb = getDatabase(userApp);
            const devicedb = getDatabase(deviceApp);
            
            var user = Cookies.get('user')
            var ipSet = document.querySelector('#ipSet')
            var ipSetconfirm = document.querySelector('#ipSetconfirm')
            var search = document.querySelector('#search')
            var deviceplace = document.getElementById('deviceplace')
            var deviceSetconfirm = document.getElementById('deviceSetconfirm')
            var macinfo = document.getElementById('macinfo')
            var eleinfo = document.getElementById('eleinfo')
            var ipinfo = document.getElementById('ipinfo')
            var ip3s
            if(!Cookies.get('saveName')){
                var saveName = 0
            }else{
                var saveName = Cookies.get('saveName')
            }

            function urlSet(){
                if(ip1.value != '' && ip2.value != '' && ip3.value != '' && ip4.value != ''){
                    var urlfront = ip1.value +'.'+ ip2.value +'.'+ ip3.value +'.'
                    ipSet.close()
                    urlFinding(urlfront)
                }else{
                    ipSetError.showModal()
                }
            }
            
            function urlFinding(urlfront){
                var i=1
                while(i < 254){
                    var url = 'http://' + urlfront + i + '/info'
                    axios.get(url)
                    .then(function (response) {
                        var data = response.data
                        var mac = data.split("MAC=")[1].split("</h1>")[0]
                        var ele = data.split("ELEMENT=")[1].split("</h2>")[0]
                        var name = data.split("裝置名稱 = ")[1].split("</h3>")[0]
                        if (ele == 'cam'){
                            var ip = data.split("IP=")[1].split("</h4>")[0]
                        }
                        const devicedbref = ref(devicedb);
                        if(data.includes("sMART sTUFF")){
                            get(child(devicedbref, mac + "/USER" + user))
                            .then((snapshot)=>{
                                if (snapshot.exists() != true) {
                                    if (ele != 'cam'){
                                        addBTN(mac,ele,name)
                                    }else{
                                        CAMaddBTN(mac,ele,name,ip)
                                    }
                                }
                            })
                        }
                    })
                    .catch(function (error) {
                        alert(error);
                    }) 
                    i++
                }
            } 

            function addBTN(mac,ele,name){     
                var BTNadd = document.createElement('button')
                var p = document.createElement('p')
                BTNadd.name = "NEWdevices"
                BTNadd.class = ele
                BTNadd.id = mac
                BTNadd.innerHTML = name
                p.innerHTML=" "
                p.id = mac
                BTNadd.onclick = function deviceSetup(){
                    macinfo.innerHTML = mac
                    eleinfo.innerHTML = ele
                    deviceSet.showModal()
                }
                deviceplace.appendChild(BTNadd);
                deviceplace.appendChild(p);
            }

            function CAMaddBTN(mac,ele,name,ip){     
                var BTNadd = document.createElement('button')
                var p = document.createElement('p')
                BTNadd.name = "NEWdevices"
                BTNadd.class = ele
                BTNadd.id = mac
                BTNadd.innerHTML = name
                p.innerHTML=" "
                p.id = mac
                BTNadd.onclick = function deviceSetup(){
                    macinfo.innerHTML = mac
                    eleinfo.innerHTML = ele
                    ipinfo.innerHTML = ip
                    deviceSet.showModal()
                }
                deviceplace.appendChild(BTNadd);
                deviceplace.appendChild(p);
            }

            function saveDevice(){
                saveName = Number(saveName) + 1
                Cookies.set('saveName', saveName)
                var saveNameTag = "裝置" + saveName
                if(eleinfo.innerHTML == 'strip'){
                    var dset = '"' + devicename.value + ' ' + macinfo.innerHTML + ' ' + eleinfo.innerHTML + '"'
                    update(ref(userdb, user + "/" + saveNameTag),{
                        set : dset
                    })
                    update(ref(devicedb, macinfo.innerHTML + '/USER' + user),{
                        USER: user
                    })
                    update(ref(devicedb, macinfo.innerHTML),{
                        MODE: "5"
                    })
                    var dBTN = document.getElementById(macinfo.innerHTML);
                    dBTN.remove();
                }else if(eleinfo.innerHTML == 'bme' || eleinfo.innerHTML == 'moi'){
                    var dset = '"' + devicename.value + ' ' + macinfo.innerHTML + ' ' + eleinfo.innerHTML + '"'
                    update(ref(userdb, user + "/" + saveNameTag),{
                        set : dset
                    })
                    update(ref(devicedb, macinfo.innerHTML + '/USER' + user),{
                        USER: user
                    })
                    var dBTN = document.getElementById(macinfo.innerHTML);
                    dBTN.remove();
                }else if(eleinfo.innerHTML == 'cam'){
                    var dset = '"' + devicename.value + ' ' + macinfo.innerHTML + ' ' + eleinfo.innerHTML + ' ' + ipinfo.innerHTML + '"'
                    update(ref(userdb, user + "/" + saveNameTag),{
                        set : dset
                    })
                    update(ref(devicedb, macinfo.innerHTML + '/USER' + user),{
                        USER: user
                    })
                    update(ref(devicedb, macinfo.innerHTML),{
                        ip: ipinfo.innerHTML
                    })
                    var dBTN = document.getElementById(macinfo.innerHTML);
                    dBTN.remove();
                }else if(eleinfo.innerHTML == '3stat'){
                    var dset = '"' + devicename.value + ' ' + macinfo.innerHTML + ' ' + eleinfo.innerHTML + ' 插座1 插座2 插座3'+ '"'
                    update(ref(userdb, user + "/" + saveNameTag),{
                        set : dset
                    })
                    update(ref(devicedb, macinfo.innerHTML + '/USER' + user),{
                        USER: user
                    })
                    var dBTN = document.getElementById(macinfo.innerHTML);
                    dBTN.remove();
                }
                deviceSet.close()
            }

            ipSetconfirm.addEventListener('click', urlSet)
            deviceSetconfirm.addEventListener('click', saveDevice)