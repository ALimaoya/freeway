// pushHistory();
window.addEventListener("popstate", function (e) {
    var url = window.location;
    if (url.indexOf("index.html") >= 0) {
        window.Android.backToApp();
    } else {
        window.location = '../html/index.html';
    }
}, false);

function pushHistory() {
    // var state = {
    //     title: "title",
    //     url: "#"
    // };
    // window.history.pushState(state, "title", "#");
}