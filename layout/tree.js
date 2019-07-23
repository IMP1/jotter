const SVGNS = "http://www.w3.org/2000/svg";

function add_node(tree_element, note, node) {
    const R = 6;

    let c = document.createElementNS(SVGNS, "circle");
    c.setAttributeNS(null, "cx", node.x);
    c.setAttributeNS(null, "cy", node.y);
    c.setAttributeNS(null, "r", R);
    c.setAttributeNS(null, "style", "stroke: black; stroke-width: 1px; fill: " + node.colour + ";");
    c.setAttributeNS(null, "data-name", note.name);
    c.setAttributeNS(null, "data-id", note.id);
    tree_element.appendChild(c);
}

function add_edge(tree_element, edge) {
    let p = document.createElementNS(SVGNS, "path");
    let path_string = "M " + edge.startX + " " + edge.startY;
    path_string += " c " + edge.path.join(" ");
    p.setAttributeNS(null, "d", path_string);
    p.setAttributeNS(null, "style", "stroke: black; fill: none;");
    tree_element.appendChild(p);
}

function setup_tree(tree_element, note) {

    for (var i = 0; i < note.children_layout_data.edges.length; i ++) {
        let edge = note.children_layout_data.edges[i];
        add_edge(tree_element, edge);
    }

    for (var i = 0; i < note.children_layout_data.nodes.length; i ++) {
        let node = note.children_layout_data.nodes[i];
        make_cors_request(node.note, "application/json",
            function(text) {
                let child_note = JSON.parse(text);
                let child_layout = node;
                add_node(tree_element, child_note, child_layout)
            },
            function() {
                console.log("An error occured when trying to access the following URL: " + node.note);
            }
        );
    }
    
}

function setup_tree_tooltip(svg) {
    // let tree_container = svg.parentElement;
    // let tooltip = document.createElement("div");
    // tooltip.classList.add("tooltip");
    // let body = document.getElementsByClassName("note-body")[0];
    // tree_container.insertBefore(tooltip, body);

    // let tree_nodes = svg.getElementsByTagName("circle");
    // for (i = 0; i < tree_nodes.length; i ++) {
    //     let node = tree_nodes[i];
    //     let container = node.parentElement.parentElement;
    //     tree_nodes[i].addEventListener("mouseover", function(e) {
    //         tooltip.textContent = node.getAttribute("data-name");
    //         tooltip.style.visibility = "visible";
    //         tooltip.style.left = "" + (node.getBoundingClientRect().left - 5) + "px";
    //         tooltip.style.top = "" + (svg.getBoundingClientRect().bottom) + "px";
    //     });
    //     tree_nodes[i].addEventListener("click", function(e) {
    //         window.location.href = "?note=7"; // + node.getAttribute("data-id");
    //     });
    // }
}

function setup_container(note_container, note) {
    let css = document.createElement("link");
    css.rel  = 'stylesheet';
    css.type = 'text/css';
    css.href = "https://imp1.github.io/jotter/layout/tree.css";
    document.head.appendChild(css);

    note_container.classList.add("tree-container");

    let container = document.getElementById("note-children");
    let svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.classList.add("tree-layout", "s12");
    container.appendChild(svg);

    setup_tree(svg, note);

    setup_tree_tooltip(svg);
}
