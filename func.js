const LAYOUT_DATA = {
    "7": {
        child_layout: {
            "8": {
                x: 10, y: 10,
            },
        },
    },
};

let SVGNS = "http://www.w3.org/2000/svg";

function setup_note(node_id, node_data) {

    let url = 'https://raw.githubusercontent.com/quiet324/LiangYouRadioResource201701/73a321ba86867a920f295a19f3162e1ae4306d0b/node/operate/cc_songs_names.json';

    let node = node_data[node_id]; // TODO: get from model using node_id

    const LAYOUT_CLASSES = [null, "folder-container", "tree-container", "board-container"];
    const LAYOUT_FUNCTIONS = [null, setup_folder_container, setup_tree_container, setup_board_container];

    let parent_link = document.getElementsByClassName("note-parent")[0];
    if (node.parent !== null) {
        parent_link.setAttribute("href", "?note=" + node.parent);
        parent_link.getElementsByTagName("span")[0].textContent = node_data[node.parent].name;
        parent_link.getElementsByTagName("i")[0].classList.remove("fa-sign-out", "fa-flip-horizontal");
        parent_link.getElementsByTagName("i")[0].classList.add("fa-level-up");
    } else {
        parent_link.setAttribute("href", ""); // TODO: go to list of projects
        parent_link.getElementsByTagName("span")[0].textContent = "All Projects";
        parent_link.getElementsByTagName("i")[0].classList.remove("fa-level-up");
        parent_link.getElementsByTagName("i")[0].classList.add("fa-sign-out", "fa-flip-horizontal");
    }

    let title = document.getElementsByClassName("note-title")[0];
    title.textContent = node.name;

    let note_container = document.getElementById("note-container");

    let body = document.createElement("section");
    body.setAttribute("contenteditable", true);
    body.classList.add("note-body");
    body.classList.add("markdown");
    body.textContent = node.body;
    note_container.appendChild(body);

    document.getElementById("note-container").classList.add(LAYOUT_CLASSES[node.child_layout]);
    LAYOUT_FUNCTIONS[node.child_layout](node, note_container, node_data);
}

function main() {
    let url = new URL(window.location.href);
    let note_id = parseInt(url.searchParams.get("note"));

    make_cors_request("example_data.json", "application/json",
        function(text) {
            let node_data = JSON.parse(text);
            setup_note(note_id, node_data);
        },
        function() {
            console.log("An error occured when trying to access the following URL: " + url);
        },
    );
}

main();
