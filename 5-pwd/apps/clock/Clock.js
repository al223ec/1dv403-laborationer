PWD.App.Clock = {
    clockDiv : document.createElement("div"),
    p: document.createElement("p"),
    isDigital: true,

    format: function (num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    },
    start: function(){
        this.clockDiv.appendChild(this.p);
        this.clockDiv.className = "clock";
        PWD.add(this.clockDiv);
        this.update(this.p, this.format)();
        setInterval(this.update(this.p, this.format), 1000);
        //this.update();
        //setInterval(this.update, 1000);
    },
    update: function (p, format) {
        return function () {
            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            var seconds = currentTime.getSeconds();

            p.innerHTML = '';
            p.appendChild(document.createTextNode(format(hours) + ":" + format(minutes) + ":" + format(seconds)));
        };
    },
    //update: function () {
    //    if (PWD.App.Clock.isDigital) {
    //        var currentTime = new Date();
    //        var hours = currentTime.getHours();
    //        var minutes = currentTime.getMinutes();
    //        var seconds = currentTime.getSeconds();

    //        PWD.App.Clock.p.innerHTML = '';
    //        PWD.App.Clock.p.appendChild(document.createTextNode(PWD.App.Clock.format(hours) + ":" + PWD.App.Clock.format(minutes) + ":" + PWD.App.Clock.format(seconds)));
    //    } else {
            
    //    }
    //},
};