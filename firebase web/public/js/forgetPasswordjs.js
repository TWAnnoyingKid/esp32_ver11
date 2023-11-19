import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
            const firebaseConfig = {
                apiKey: "AIzaSyD0UmlJNoacdrBfyZ50h0FyEI0yHKWUwBs",
                authDomain: "user-data-2e9be.firebaseapp.com",
                databaseURL: "https://user-data-2e9be-default-rtdb.firebaseio.com",
                projectId: "user-data-2e9be",
                storageBucket: "user-data-2e9be.appspot.com",
                messagingSenderId: "261163235969",
                appId: "1:261163235969:web:c60872f373060f75cb2b80",
                measurementId: "G-2X855JVZ8V"
            };
            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);

            import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
            const db = getDatabase();

            let account = document.querySelector("#account");
            let confirm = document.querySelector("#confirm");
            let emailAdd = document.querySelector("#emailAdd");
            let captcha = document.querySelector("#captcha");
            let emailInform = document.querySelector("#emailInform");
            let resend = document.querySelector("#resend");
            let timerId = setInterval(timer, 1000);
            let count = 61;
            function timer() {
                count--; 
                resend.innerHTML = count + 's 重新寄送'
                resend.disabled = true
                if (count <= 0) {
                    clearInterval(timerId); 
                    resend.innerHTML = '重新寄送驗證碼'
                    remove(ref(db, "UserData/使用者" + account.value + "/captcha"))
                    resend.disabled = false
                }
            }
            if(Cookies.get('forget')){
                Cookies.remove('forget')
            }
            function resendCaptcha(){
                let timerId = setInterval(timer, 1000)
                count = 61
                const dbref = ref(db);
                get(child(dbref, "UserData/使用者" + account.value))
                    .then((snapshot)=>{
                        if (snapshot.exists()) {
                            emailAdd.innerHTML = snapshot.val().email.replace('"', "").replace('"', "")
                            let tpw = Math.floor(Math.random() * 999999) + 100000
                            Email.send({
                                SecureToken : "3ca73cb1-4aa4-4191-86f1-2e1f37fa3026",
                                To : emailAdd.innerHTML,
                                From : "smart.stuff.18340@gmail.com",
                                Subject: "更改密碼",
                                Body: "驗證碼為：" + tpw,
                            })
                            update(ref(db, "UserData/使用者" + account.value),{
                                captcha: tpw
                            })
                        }
                    })
                timer
            }
            
            function loginData() {
                const dbref = ref(db);
                if(captcha.style.display == 'none' && account.style.display == 'inline'){
                    get(child(dbref, "UserData/使用者" + account.value))
                    .then((snapshot)=>{
                        if (snapshot.exists()) {
                            emailAdd.innerHTML = snapshot.val().email.replace('"', "").replace('"', "")
                            let tpw = Math.floor(Math.random() * 999999) + 100000
                            Email.send({
                                SecureToken : "3ca73cb1-4aa4-4191-86f1-2e1f37fa3026",
                                To : emailAdd.innerHTML,
                                From : "smart.stuff.18340@gmail.com",
                                Subject: "更改密碼",
                                Body: "【sMART sTUFF 智慧家庭】更改密碼驗證碼為：" + tpw + " , 請不要將此驗證碼分享給任何人。",
                            })
                            update(ref(db, "UserData/使用者" + account.value),{
                                captcha: tpw
                            })
                            emailInform.innerHTML = "驗證碼已寄送至信箱"
                            account.style.display='none'
                            captcha.style.display='inline'
                            resend.style.display='inline'
                        }else{
                            loginFail.showModal()
                        }
                    })
                }else if(account.style.display == 'none' && captcha.style.display == 'inline'){
                    timer
                    const dbref = ref(db);
                    get(child(dbref, "UserData/使用者" + account.value))
                    .then((snapshot)=>{
                        if (snapshot.exists()) {
                            if(captcha.value == snapshot.val().captcha){
                                Cookies.set('forget', account.value, { expires : 1 });
                                remove(ref(db, "UserData/使用者" + account.value + "/captcha"))
                                document.location.href="changePassword.html";
                            }else{
                                captchaFail.showModal()
                            }
                        }else{
                            captchaFail.showModal()
                        }
                    })
                }
            }
            document.addEventListener("keyup", function(event) {
                if (event.code === 'Enter') {
                    loginData()
                }
            });
            confirm.addEventListener('click', loginData);
            resend.addEventListener('click', resendCaptcha);