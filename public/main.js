function contains(search_for, array) {
    flag = false;
    for (let i = 0; i < array.length; i++) {
        if (search_for == array[i]) {
            flag = true;
        }
      }
    return flag;
};

wait_a_second = async () => {
    const window_search = new URLSearchParams(window.location.search);
    const url = window_search.get('url');
    const blocking_time = 3000;

    start_block = Date.now();
    setInterval(time_remaining, 10, start_block, start_block + blocking_time, blocking_time);

    document.getElementById("label").innerHTML = "Оставшееся время в миллисекундах:";

    function time_remaining(start_time, end_time, time){
        end_current = Date.now();
        if(end_current - start_time > time) {
            document.getElementById("stop_watch").innerHTML = 0;
            document.getElementById("label").innerHTML = "Происходит перенаправление, ожидайте...";
            window.location.replace(url)
        } else {
            document.getElementById("stop_watch").innerHTML = end_time - end_current;
        }
    };
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