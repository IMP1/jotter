const NODE_DATA = {
    "1": {
        id: "1",
        author: 1,
        name: "Mir Worldbuilding",
        body: "Worldbuilding for fun! Realistic world, no magic, too much focus on gyres.",
        child_layout: 1,
        content_layout: "markdown",
        parent: null,
        children: ["5", "6", "7", "8"],
        colour: "#FFF"
    },
    "5": {
        id: "5",
        author: 1,
        name: "Cool Ideas",
        body: "The general overview of the plot. Lorem ipsum blah de blah.",
        child_layout: 3,
        content_layout: "markdown",
        parent: "1",
        children: [],
        colour: "#FFF"
    },
    "6": {
        id: "6",
        author: 1,
        name: "Key Plot Points",
        body: "The general overview of the plot. Lorem ipsum blah de blah.",
        child_layout: 2,
        content_layout: "markdown",
        parent: "1",
        children: [],
        colour: "#FFF"
    },
    "7": {
        id: "7",
        author: 1,
        name: "Plot Overview",
        body: "The general overview of the plot. Lorem ipsum blah de blah.",
        child_layout: 1,
        content_layout: "markdown",
        parent: "1",
        children: [],
        colour: "#FFF"
    },
    "8": {
        id: "8",
        author: 1,
        name: "Characters",
        body: "The main NPCs of note across Mir.",
        child_layout: 1,
        content_layout: "markdown",
        parent: "1",
        children: ["9", "10", "11"],
        colour: "#FFF"
    },
};

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
        parent_link.getElementsByTagName("span")[0].textContent = NODE_DATA[node.parent].name;
        parent_link.getElementsByTagName("i")[0].textContent = "subdirectory_arrow_left";
        parent_link.getElementsByTagName("i")[0].classList.add("rotate-90");
    } else {
        parent_link.setAttribute("href", ""); // TODO: go to list of projects
        parent_link.getElementsByTagName("span")[0].textContent = "All Projects";
        parent_link.getElementsByTagName("i")[0].textContent = "exit_to_app";
        parent_link.getElementsByTagName("i")[0].classList.add("mirror-horizontal");
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

$(document).ready(function(){
    main();
    $('.fixed-action-btn').floatingActionButton();
});
