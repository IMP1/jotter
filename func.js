function get_note_data(note, callback) {
    
}

function new_note(parent_note, callback) {
    console.log("creating new child note");
}

function update_note(note, new_data) {
    console.log("updating note");
    console.log(new_data);
}

function delete_note(note) {
    // TODO: have a soft delete, which removes references to the note, but keeps the data.
    //       and maybe saves the URL in a list of deleted notes somewhere.
}

function setup_note_content(note_container, note) {
    let script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = note.content_layout;
    script.onload = function() {
        setup_content(note_container, note);
    };
    document.body.appendChild(script);
}

function setup_note_children(note_container, note) {
    let script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = note.children_layout;
    script.onload = function() {
        setup_container(note_container, note);
    };
    document.body.appendChild(script);
}

let current_note = null;

function setup_note(note, parent) {
    current_note = note;
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

function setup_page() {
    $('.fixed-action-btn').floatingActionButton();
    $('#fab-new-child').click(function() {
        let note = current_note;
        new_note(note, function() {
            
        });
    });
    $('#fab-child-layout').click(function() {
        let note = current_note;
        update_note(note, {"children_layout": "new_layout"});
    });
    $('#fab-content-layout').click(function() {
        let note = current_note;
        update_note(note, {"content_layout": "new_layout"});
    });
}

function main() {
    let url = new URL(window.location.href);
    let note_url = url.searchParams.get("note");

    make_cors_request(note_url, "application/json",
        function(text) {
            let node_data = JSON.parse(text);
            setup_note(node_data);
            setup_page();
        },
        function() {
            console.log("An error occured when trying to access the following URL: " + url);
        },
    );
}

$(document).ready(function(){
    main();
});
