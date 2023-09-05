const user = Cookies.get('user');
            var logout = document.querySelector("#logout");
            var username = document.querySelector("#username");
            var welcome = document.querySelector("#welcome");
            Cookies.remove('forget')
            Cookies.remove('device')
            Cookies.remove('saveName')
            Cookies.remove('tag')

            if (user != undefined){
                welcome.innerHTML = "歡迎! 使用者";
                username.innerHTML =user;
                document.getElementById("login").style.display='none'
                document.getElementById("logout").style.display='block'
                document.getElementById("signup").style.display='none'
                document.getElementById("noaccount").style.display='none'
                document.getElementById("device").style.display='block'
                
            }else{
                document.getElementById("login").style.display='block'
                document.getElementById("logout").style.display='none'
                document.getElementById("signup").style.display='inline-block'
                document.getElementById("noaccount").style.display='block'
                document.getElementById("device").style.display='none'
                
            }

            function out() {
                Cookies.remove('user')
                window.location.href = "mainpage.html"
            }

            logout.addEventListener('click', out)