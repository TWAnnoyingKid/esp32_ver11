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

            var password = document.querySelector("#password");
            var passwordConfirm = document.querySelector("#passwordConfirm");
            var confirm = document.querySelector("#confirm");
            const user = Cookies.get('forget');

            function loginData() {
                if(password.value != "" && passwordConfirm.value != ""){
                    if(password.value == passwordConfirm.value){
                        update(ref(db, "UserData/使用者" + user),{
                            password: '"' + password.value + '"'
                        })
                        .then((snapshot)=>{
                            document.location.href="mainpage.html";
                        })
                        
                    }else{
                        passwordFail.showModal()
                    }
                }else{
                    passwordFail.showModal()
                }
            }
            confirm.addEventListener('click', loginData);