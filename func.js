function setup_note_content(note_container, note) {
    const CONTENT_FUNCTIONS = [null, setup_markdown_content, setup_input_form_content];
    // TODO: use content_layout to determine how this is displayed.
    CONTENT_FUNCTIONS[note.content_layout](note_container, note);
}

function setup_note_children(note_container, note) {
    const LAYOUT_FUNCTIONS = [null, setup_folder_container, setup_tree_container, setup_board_container];
    // TODO: get layout function from the children_layout URL?
    LAYOUT_FUNCTIONS[note.children_layout](note_container, note);
}

function setup_note(note, parent) {
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
            parent_link.getElementsByTagName("span")[0].textContent = parent.name;
        }
        parent_link.setAttribute("href", "?note=" + note.parent);
        parent_link.getElementsByTagName("i")[0].textContent = "subdirectory_arrow_left";
        parent_link.getElementsByTagName("i")[0].classList.add("rotate-90");
    }

    let title = document.getElementsByClassName("note-title")[0];
    title.textContent = note.name;

    let note_container = document.getElementById("note-container");

    setup_note_content(note_container, note);
    setup_note_children(note_container, note);
}

function main() {
    let url = new URL(window.location.href);
    let note_url = url.searchParams.get("note");

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
