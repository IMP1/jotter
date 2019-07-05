// Create the XHR object.
function create_cors_request(method, url, mime_type) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType(mime_type);
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

function make_cors_request(url, mime_type, onsuccess, onfailure) {
    var xhr = create_cors_request('GET', url, mime_type);
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
