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

            var account = document.querySelector("#account");
            var password = document.querySelector("#password");
            var loginBtn = document.querySelector("#login");
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

            loginBtn.addEventListener('click', loginData);