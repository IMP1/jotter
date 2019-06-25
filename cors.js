
// Create the XHR object.
function create_cors_request(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Make the actual CORS request.
function make_cors_request(url, onsuccess, onfailure) {
    // This is a sample server that supports CORS.
    

    var xhr = create_cors_request('GET', url);
    if (!xhr) {
        onfailure();
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        onsuccess(text);
    };

    xhr.onerror = function() {
        onfailure();
    };

    xhr.send();
}