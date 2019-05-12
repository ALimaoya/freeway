pushHistory();
window.addEventListener("popstate", function(e) {
    window.location = '../html/index.html';
}, false);
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");
}