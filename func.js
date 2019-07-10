function setup_note(note, parent) {

    const LAYOUT_CLASSES = [null, "folder-container", "tree-container", "board-container"];
    const LAYOUT_FUNCTIONS = [null, setup_folder_container, setup_tree_container, setup_board_container];

    if (note.parent !== null) {
        // TODO: Redo breadcrumbs, rather than a link to just the parent?
        let parent_link = document.getElementsByClassName("note-parent")[0];
        if (parent === undefined) {
            make_cors_request(note.parent, "application/json",
                function(text) {
                    let parent_note = JSON.parse(text);
                    parent_link.getElementsByTagName("span")[0].textContent = parent_note.name;
                },
                function() {
                    console.log("An error occured when trying to access the following URL: " + url);
                },
            );
        } else {
            console.log("using provided parent");
        }
        parent_link.setAttribute("href", "?note=" + note.parent);
        parent_link.getElementsByTagName("i")[0].textContent = "subdirectory_arrow_left";
        parent_link.getElementsByTagName("i")[0].classList.add("rotate-90");
    }

    let title = document.getElementsByClassName("note-title")[0];
    title.textContent = note.name;

    let note_container = document.getElementById("note-container");

    // TODO: use content_layout to determine how this is displayed.
    let body = document.createElement("section");
    body.setAttribute("contenteditable", true);
    body.classList.add("note-body");
    body.classList.add("markdown");
    body.textContent = note.content;
    note_container.appendChild(body);

    document.getElementById("note-container").classList.add(LAYOUT_CLASSES[note.child_layout]);
    LAYOUT_FUNCTIONS[note.child_layout](note_container, note);
}

function main() {
    let url = new URL(window.location.href);
    let note_url = url.searchParams.get("note");
    // "https://raw.githubusercontent.com/IMP1/jotter/gh-pages/test_data/1.json";

    make_cors_request(note_url, "application/json",
        function(text) {
            let node_data = JSON.parse(text);
            console.log(text);
            setup_note(node_data);
        },
        function() {
            console.log("An error occured when trying to access the following URL: " + url);
        },
    );
}

$(document).ready(function(){
    main();
    $('.fixed-action-btn').floatingActionButton();
});
