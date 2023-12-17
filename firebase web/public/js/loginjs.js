import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
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

            import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
            const db = getDatabase();

            let account = document.querySelector("#account");
            let password = document.querySelector("#password");
            let loginBtn = document.querySelector("#login");
            let checkEye = document.querySelector("#checkEye");
            
            if(Cookies.get('forget')){
                Cookies.remove('forget')
            }
            if(Cookies.get('device')){
                Cookies.remove('device')
            }

            function loginData() {
                const dbref = ref(db);
                get(child(dbref, "UserData/使用者" + account.value))
                .then((snapshot)=>{
                    if (snapshot.exists()) {
                        const Password = '"' + password.value + '"'
                        if (Password == snapshot.val().password){
                            Cookies.set('user', account.value, { expires : 7 });
                            // findAccount.innerHTML = "歡迎使用者" + snapshot.val().account;
                            window.location.href = "mainpage.html"
                        }else{
                            loginFail.showModal()
                        }
                    }else{
                        loginFail.showModal()
                    }
                })
            }
            function passwordEye(){
                if(password.type === "password"){
                    password.setAttribute('type','text')
                    checkEye.src = "picture/view.png"
                }else if(password.type === "text"){
                    password.setAttribute('type','password')
                    checkEye.src = "picture/hidden.png"
                }
            }
            document.addEventListener("keyup", function(event) {
                if (event.code === 'Enter') {
                    loginData()
                }
            });
            checkEye.addEventListener('click', passwordEye);
            loginBtn.addEventListener('click', loginData);