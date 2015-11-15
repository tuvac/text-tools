var tools = require('string-utils');

(function() {

    function update(callback) {

        var text = document.getElementById('text');
        text.value = callback(text.value);
    }

    var handlers = {

        webify: function() {

            update(function(str) {
            
                return tools.websafe(str);
            });
        },
        
        ssid: function(str) {
        
            update(function(str) {
            
                return tools.fwssid(str);
            });
        },
        
        lowercase: function(str) {

            update(function(str) {
            
                return str.toLowerCase();
            });
        },
        
        uppercase: function(str) {

            update(function(str) {
            
                return str.toUpperCase();
            });
        },
        
        sentence: function(str) {

            update(function(str) {

                return str.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0)
                        .toUpperCase() + txt.substr(1).toLowerCase();
                });
            });
        },
    };

    [].forEach.call(document.querySelectorAll('button'), function(btn) {

        var handler = btn.innerHTML.toLowerCase();
        btn.addEventListener('click', handlers[handler]);
    });


})();