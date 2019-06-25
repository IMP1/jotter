const NODE_DATA = {
    "1": {
        id: "1",
        author: 1,
        name: "Mir Worldbuilding",
        body: "Worldbuilding for fun! Realistic world, no magic, too much focus on gyres.",
        child_layout: 1,
        parent: null,
        children: ["5", "6", "7"],
        colour: "#FFF"
    },
    "5": {
        id: "5",
        author: 1,
        name: "Cool Ideas",
        body: "The general overview of the plot. Lorem ipsum blah de blah.",
        child_layout: 3,
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
        parent: "1",
        children: ["8", "9", "10", "11", "12"],
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

function setup_note(node_id) {

    let url = 'https://raw.githubusercontent.com/quiet324/LiangYouRadioResource201701/73a321ba86867a920f295a19f3162e1ae4306d0b/node/operate/cc_songs_names.json';

    // make_cors_request(url,
        // function(text) {
            // let obj = JSON.parse(text);
            // console.log(obj);
        // },
        // function() {
            // console.log("An error occured when trying to access the following URL: " + url);
        // },
    // );
    let node = NODE_DATA[node_id]; // TODO: get from model using node_id

    const LAYOUT_CLASSES = [null, "folder-container", "tree-container", "board-container"];
    const LAYOUT_FUNCTIONS = [null, setup_folder_container, setup_tree_container, setup_board_container];

    let parent_link = document.getElementsByClassName("note-parent")[0];
    if (node.parent !== null) {
        parent_link.setAttribute("href", "?note=" + node.parent);
        parent_link.getElementsByTagName("span")[0].textContent = NODE_DATA[node.parent].name;
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
    LAYOUT_FUNCTIONS[node.child_layout](node, note_container);
}

let url = new URL(window.location.href);
let note_id = parseInt(url.searchParams.get("note"));
setup_note(note_id);
