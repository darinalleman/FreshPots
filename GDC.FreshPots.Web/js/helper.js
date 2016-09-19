Handlebars.registerHelper('Timer', function (seconds) {
    var seconds = seconds;
    if (seconds == 0)
    {
        return "";
    }
    var time = "";
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(seconds / 3600);

    seconds = seconds % 60;

    if (minutes >= 60) {
        minutes = minutes % 60;
    }
    time = time + hours + ":";

    if (minutes < 10) {
        time = time + "0" + minutes;
    } else {
        time = time + "" + minutes;
    }

    if (seconds < 10) {
        time = time + ":0" + seconds;
    } else {
        time = time + ":" + seconds;
    }

    return time;
});

Handlebars.registerHelper('ImageSource', function (seconds) {

    if (seconds == 0) {
        return "img/blank.png";
    }
    else if (seconds < 3600 && seconds > 0) {
        return "img/coffee-pot.png";
    } else if (seconds >= 3600) {
        return "img/coffee-pot-sad.png";
    }

});

Handlebars.registerHelper('TimerClass', function (seconds) {

    if (seconds == 0) {
        return "timer";
    }
    else if (seconds < 3600 && seconds > 300) {
        return "timer";
    }
    else if (seconds <= 300 && seconds > 0) {
        return "timer-expired";
    }
     else if (seconds >= 3600) {
        return "timer-expired";
    }

});

Handlebars.registerHelper('TypeClass', function (type) {

    if (type == "Empty") {
        return "";
    }
    else {
        return type;
    }

});

Handlebars.registerHelper('DeleteButtonClass', function (type) {

    if (type == "Empty") {
        return "-hidden";
    }
    else {
        return "";
    }

});