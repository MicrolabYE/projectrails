function contains(search_for, array) {
    flag = false;
    for (let i = 0; i < array.length; i++) {
        if (search_for == array[i]) {
            flag = true;
        }
      }
    return flag;
};

function contains_string(search_for, search_in) {
    let flag = false;
    for (let i = 0; i <= (search_in.length - search_for.length); i++) {
        if (search_for == search_in.slice(i, i + search_for.length)) {
            flag = true;
        }
    }
    return flag;
};

function time_check(start_input, end_input, now_input) {
    start = start_input.split(":")
    end = end_input.split(":")
    now = now_input.split(":")
    start_h = start[0]
    start_m = start[1]
    end_h = end[0]
    end_m = end[1]
    now_h = now[0]
    now_m = now[1]
    
    
    start_new = parseInt(start_h) + parseInt(start_m)/60
    end_new = parseInt(end_h) + parseInt(end_m)/60
    now_new = parseInt(now_h) + parseInt(now_m)/60
    
    if(start_new <= end_new) { 
        return ((now_new >= start_new) && (now_new <= end_new))
    } else {
        return ((now_new <= end_new) || (now_new >= start_new))
    }
}

script_generator = async () => {
    const request = "http://127.0.0.1:3000//compute/get_info_about_urls.json?"
    response = await fetch(request);
    urls = (await response.json()).urls.split(";")
    response = await fetch(request);
    settings = (await response.json()).settings.split(";")

    match_array = []
    block_array = []
    limited_array = []
    for (let i = 0; i < urls.length; i++) {
        match_array.push(urls[i])
        settings_splitted = settings[i].split("%")
        if (settings_splitted[0] == "inf") { block_array.push(urls[i]) }
        else if (settings_splitted[0] == "timer") { limited_array.push(urls[i]) }
    }

    script = 
    `
    // ==UserScript==
    // @name         New Userscript
    // @namespace    http://tampermonkey.net/
    // @version      2023-12-20
    // @description  try to take over the world!
    // @author       You
    `
    for (let i = 0; i < match_array.length; i++) {
        script += `// @match ` + match_array[i] + `
        `
    }

    script += `
    // @icon         https://www.google.com/s2/favicons?sz=64&domain=github.dev
    // @grant        none
    // ==/UserScript==
    
    (function() {
        'use strict';
    
        function includes(search_for, search_in) {
            let flag = false;
            for (let i = 0; i <= (search_in.length - search_for.length); i++) {
                if (search_for == search_in.slice(i, i + search_for.length)) {
                    flag = true;
                }
            }
            return flag;
        };
    
    
        const urls_lim = [`
        script += `"` + limited_array[0] + `"`
        for (let i = 1; i < limited_array.length; i++) {
            script += `,"` + limited_array[i] + `"`
        }
    
        script += `];
        const urls_block = [`
        script += `"` + block_array[0] + `"`
        for (let i = 1; i < block_array.length; i++) {
            script += `,"` + block_array[i] + `"`
        }
        
        script += `];
    
        const memory_window = window.location.href;
        let cookies = document.cookie;
    
        for(let i = 0; i < urls_lim.length; i++){
            if(urls_lim[i] == memory_window) {
                if(includes(urls_lim[i] + "visited=true", cookies) == true){
                    document.cookie = urls_lim[i] + "visited=false";
                } else if (includes(urls_lim[i] + "visited=false", cookies) == true) {
                    document.cookie = urls_lim[i] + "visited=true";
                    window.location.replace("http://127.0.0.1:3000//main/stop_page?&url_from=" + memory_window);
                } else {
                    document.cookie = urls_lim[i] + "visited=true";
                    window.location.replace("http://127.0.0.1:3000//main/stop_page?&url_from=" + memory_window);
                }
            }
       }
    
       for(let i = 0; i < urls_block.length; i++){
            if(urls_block[i] == memory_window) {
                window.location.replace("http://127.0.0.1:3000//main/stop_page?&url_from=" + memory_window);
            }
       }
    })();
    `
    var blob = new Blob([script], {type: "text/javascript"});
    return blob
};

wait_a_second = async () => {
    const window_search = new URLSearchParams(window.location.search);
    const url = window_search.get('url_from');
    
    const request = "http://127.0.0.1:3000//compute/get_info.json?url_from=" + url

    response = await fetch(request);
    const block_type = (await response.json()).blocktype
    
    response = await fetch(request);
    const block_time = (await response.json()).blocktime

    response = await fetch(request);
    const start_block = (await response.json()).start_block

    response = await fetch(request);
    const end_block = (await response.json()).end_block

    response = await fetch(request);
    const counter = (await response.json()).counter

    const currentTime = new Date();
    const currentTimeHours = currentTime.getHours() + ":" + currentTime.getMinutes();

    if(time_check(start_block, end_block, currentTimeHours) == true) {
        const count_request = "http://127.0.0.1:3000//compute/change_counter?url_from=" + url
        await fetch(count_request)

        if(block_type == "timer") {
            start = Date.now();
            setInterval(time_remaining, 10, start, start + parseInt(block_time), block_time);
    
            document.getElementById("label-remaining").style.display = "block";
            document.getElementById("stop-watch").style.display = "block";
            document.getElementById("stop-button").style.display = "none";
    
            function time_remaining(start_time, end_time, time){
                end_current = Date.now();
                if(end_current - start_time > time) {
                    document.getElementById("stop-watch").innerHTML = 0;
                    document.getElementById("label-remaining").innerHTML = "Происходит перенаправление, ожидайте...";
    
                    // alert(cookies)
                    
                    // if(contains_string(url + "visited=true", cookies) == true){
            
                    // } else if (contains_string(url + "visited=false", cookies) == true) {
                    //     document.cookie = url + "visited=true";
                    // } else if (block_type == "timer") {
                    //     document.cookie = url + "visited=true";
                    // }
    
                    window.location.replace(url)
                } else {
                    document.getElementById("stop-watch").innerHTML = ((end_time - end_current) / 1000).toFixed(3);
                }
            };
        } else if (block_type == "inf"){
            document.getElementById("label-remaining").style.display = "block";
            document.getElementById("label-remaining").innerHTML = "Эта страница заблокирована";
        }
    } else { window.location.replace(url) }
};

send_message = async () => {
    const contacts_name = document.getElementById("contacts-name").value;
    const contacts_email = document.getElementById("contacts-email").value;
    const contacts_message = document.getElementById("contacts-message").value;
    if ((contacts_name == "") || (contacts_email == "") || (contacts_message == "")) {
        alert("Заполните ВСЕ данные формы!");
    } else if (contains("@", contacts_email.split("")) == false) {
         alert("Введите почту корректно в формате ivanov@gmail.com");
    } else {
        const url = "http://127.0.0.1:3000//compute/add_message?contacts_name=" + contacts_name + "&contacts_email=" + contacts_email + "&contacts_message=" + contacts_message;
        const response = await fetch(url);
        const result = await response
        document.getElementById("contacts-name").value = "";
        document.getElementById("contacts-email").value = "";
        document.getElementById("contacts-message").value = "";
        alert("Ваше сообщение отправлено")
    }
};

login = async () => {
    const user_name = document.getElementById("username_login").value;
    const user_mail = document.getElementById("email_login").value;
    const user_password = document.getElementById("pwd_login").value;

    if ((user_name == "") || (user_mail == "") || (user_password == "")) {
        alert("Заполните ВСЕ данные формы!");
    } else if (contains("@", user_mail.split("")) == false) {
        alert("Введите почту корректно в формате ivanov@gmail.com");
    } else if (user_password.length < 8) {
        alert("Пароль должен быть минимум 8 символов в длину");
    } else {
        const url = "http://127.0.0.1:3000//compute/add_user.json?name=" + user_name + "&mail=" + user_mail + "&password=" + user_password;
        const response = await fetch(url);
        const result = (await response.json()).value

        if (result == true) { alert("Пользователь с такой почтой уже зарегестрирован")}
        else { 
            alert("Регистрация прошла успешно");
            const url = "http://127.0.0.1:3000//compute/add_session?mail=" + user_mail;
            await fetch(url);
            window.location.replace("http://127.0.0.1:3000/main/profile"); }
    }
};

signin = async () => {
    const user_mail = document.getElementById("email_signin").value;
    const user_password = document.getElementById("pwd_signin").value;
    if ((user_mail == "") || (user_password == "")) {
        alert("Заполните ВСЕ данные формы!");
    } else if (contains("@", user_mail.split("")) == false) {
        alert("Введите почту корректно в формате ivanov@gmail.com");
    } else if (user_password.length < 8) {
        alert("Пароль должен быть минимум 8 символов в длину");
    } else {
        const url = "http://127.0.0.1:3000//compute/check_user.json?mail=" + user_mail + "&password=" + user_password;
        const response = await fetch(url);
        const result = (await response.json()).value
        if (result == true) {
            const url = "http://127.0.0.1:3000//compute/add_session?mail=" + user_mail;
            const response = await fetch(url);
            alert("Авторизация прошла успешно")
            window.location.replace("http://127.0.0.1:3000/main/profile") 
        } else {
            alert("Почта или пароль введены неправильно")
        }
    }
};

delete_url = async (ind) => {
    const deleting_url = document.getElementById("deleteurl" + ind).innerHTML.slice(10);
    const request = "http://127.0.0.1:3000//compute/delete_url?delete_url=" + deleting_url
    const response = await fetch(request);
    document.getElementById("deletediv" + ind).style.display = "none"
};

add_url = async () => {
    const blocking_url = document.getElementById("inputurl").value;
    const block_type = document.getElementById("blocktype").value;
    block_time = document.getElementById("seconds").value;
    start_block = document.getElementById("start-block-time").value;
    end_block = document.getElementById("end-block-time").value;

    if (block_time.length < 1) {block_time = 5}
    if (start_block.length < 1) {start_block = "00:00"}
    if (end_block.length < 1) {end_block = "23:59"}

    const request = "http://127.0.0.1:3000//compute/check_url.json?blocking_url=" + blocking_url
    const response = await fetch(request);
    const result = (await response.json()).value

    if((blocking_url == "") || (contains_string("http:/", blocking_url) == false && contains_string("https:/", blocking_url) == false)){
        alert("Введите адрес ресурса корректно в формате https://vk.com/im")
    } else if (result == true) {
        alert("Введенный url уже есть в списке")
    } else {
        const url = "http://127.0.0.1:3000//compute/add_url?blocking_url=" + blocking_url + "&block_type=" + block_type + "&block_time=" + block_time + "&start_block=" + start_block + "&end_block=" + end_block;
        await(fetch(url))
        
        window.location.replace("http://127.0.0.1:3000/main/profile") 
    }
};

download_script = async () => {
    script = await script_generator()

    var url = window.URL.createObjectURL(script);

    var link = document.getElementById('downloading_href');
    
    link.href = url;

    link.click()

};