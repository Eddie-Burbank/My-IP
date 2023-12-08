/*


*/
const MAX_IP_LENGTH = 45;

const MAIN_API_URL = "https://api.ipify.org/";
const FALLBACK_API_URL = "https://api.ipify.org/";

window.onload = function() {
    fetchClientIP();
};

function fetchClientIP() {
    callAjax(MAIN_API_URL, handler, false);
}

function callAjax(url, callback, isFallback) {
    let xhr = new XMLHttpRequest();
    if (!isFallback) {
        xhr.timeout = 1000;
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText, isFallback);
            } else {
                callback(null, isFallback);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function handler(content, isFallback) {
    if (!content && !isFallback) {
        callAjax(FALLBACK_API_URL, handler, true);
    } else {
        displayContent(content, isFallback);
    }
}

function displayContent(content, isFallback) {
    let ip = 'ERROR';
    if (content && content.length <= MAX_IP_LENGTH) {
        ip = sanitize(content);
    }
    document.getElementById("ip-address").style.color = isFallback ? "purple" : "purple";
    document.getElementById("ip-address").innerText = ip;
}

/**
 * @param s 
 * @returns 
 */

function sanitize(s) {
    return s.replace(/[^0-9:a-fA-F.]/g, '');
}