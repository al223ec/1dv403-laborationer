PWD.Settings = {
    Name: "PWDSettings",
    Memory: {
        cards: 2,
    },
    RssReader: {
        currentPath: "http://www.dn.se/m/rss/senaste-nytt",
        updateIntervall: 1000 * 60 * 4,
    },
    ChatBoard: {
        author: "Doe",
        updateIntervallTime: 10000,
        messagesToDisplay: 4,
    },
    Save: function () {
        if (!localStorage) {
            PWD.useCookie = true; 
        }
        if (PWD.useCookie) {
            PWD.Settings.CookieUtil.set(this.Name, JSON.parse());
            return;
        }
        var settings = [];
        settings.push(this.Memory);
        settings.push(this.RssReader);
        settings.push(this.ChatBoard);

        localStorage.setItem("PWDSettings", JSON.stringify(settings))
    },
    Load: function () {
        //var loadedSettings; 
        //if (!localStorage) {
        //    PWD.useCookie = true; 
        //}else{
        //    var loadedSettings = JSON.parse(localStorage.getItem("PWDSettings"));
        //}

        //if (PWD.useCookie) {
        //    loadedSettings = JSON.parse(PWD.Settings.CookieUtil.get(PWDSettings));
        //}
        if (!JSON.parse(localStorage.getItem("PWDSettings"))) {
            this.Save();
        }
        var loadedSettings = JSON.parse(localStorage.getItem("PWDSettings"));

        this.Memory = loadedSettings[0];
        this.RssReader = loadedSettings[1];
        this.ChatBoard = loadedSettings[2];
    },
};

PWD.Settings.CookieUtil = {
    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;

        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }

        return cookieValue;
    },

    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }

        if (domain) {
            cookieText += "; domain=" + domain;
        }

        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    },

    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};
