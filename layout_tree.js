let SVGNS = "http://www.w3.org/2000/svg";

function setup_tree(node, tree_element, node_data) {
    let node_children = []; // TODO: get from model somehow.

    // TODO: work out which nodes follow which nodes.

    const R = 6;

    let p0 = document.createElementNS(SVGNS, "path");
    p0.setAttributeNS(null, "d", "M -30 50 c 40 0 0 0 40 0");
    p0.setAttributeNS(null, "style", "stroke: black; fill: none;");
    tree_element.appendChild(p0);

    let p1 = document.createElementNS(SVGNS, "path");
    p1.setAttributeNS(null, "d", "M 10 50 c 40 0 0 0 40 0");
    p1.setAttributeNS(null, "style", "stroke: black; fill: none;");
    tree_element.appendChild(p1);

    let p2 = document.createElementNS(SVGNS, "path");
    p2.setAttributeNS(null, "d", "M 50 50 c 40 0 0 -20 40 -20");
    p2.setAttributeNS(null, "style", "stroke: black; fill: none;");
    tree_element.appendChild(p2);

    let p3 = document.createElementNS(SVGNS, "path");
    p3.setAttributeNS(null, "d", "M 50 50 c 50 0 0 20 50 20");
    p3.setAttributeNS(null, "style", "stroke: black; fill: none;");
    tree_element.appendChild(p3);

    let p4 = document.createElementNS(SVGNS, "path");
    p4.setAttributeNS(null, "d", "M 90 30 c 50 0 0 20 50 20");
    p4.setAttributeNS(null, "style", "stroke: black; fill: none;");
    tree_element.appendChild(p4);

    let p5 = document.createElementNS(SVGNS, "path");
    p5.setAttributeNS(null, "d", "M 100 70 c 40 0 0 -20 40 -20");
    p5.setAttributeNS(null, "style", "stroke: black; fill: none;");
    tree_element.appendChild(p5);

    let c1 = document.createElementNS(SVGNS, "circle");
    c1.setAttributeNS(null, "cx", 10);
    c1.setAttributeNS(null, "cy", 50);
    c1.setAttributeNS(null, "r", R);
    c1.setAttributeNS(null, "style", "fill: #888888; stroke: black; stroke-width: 1px;");
    c1.setAttributeNS(null, "data-name", "Setup");
    c1.setAttributeNS(null, "data-id", "5");
    tree_element.appendChild(c1);

    let c2 = document.createElementNS(SVGNS, "circle");
    c2.setAttributeNS(null, "cx", 50);
    c2.setAttributeNS(null, "cy", 50);
    c2.setAttributeNS(null, "r", R);
    c2.setAttributeNS(null, "style", "fill: #888888; stroke: black; stroke-width: 1px;");
    c2.setAttributeNS(null, "data-name", "Some Choice");
    c2.setAttributeNS(null, "data-id", "6");
    tree_element.appendChild(c2);

    let c3 = document.createElementNS(SVGNS, "circle");
    c3.setAttributeNS(null, "cx", 90);
    c3.setAttributeNS(null, "cy", 30);
    c3.setAttributeNS(null, "r", R);
    c3.setAttributeNS(null, "style", "fill: #88d8b0; stroke: black; stroke-width: 1px;");
    c3.setAttributeNS(null, "data-name", "Option #1");
    c3.setAttributeNS(null, "data-id", "7");
    tree_element.appendChild(c3);

    let c4 = document.createElementNS(SVGNS, "circle");
    c4.setAttributeNS(null, "cx", 100);
    c4.setAttributeNS(null, "cy", 70);
    c4.setAttributeNS(null, "r", R);
    c4.setAttributeNS(null, "style", "fill: #ffcc5c; stroke: black; stroke-width: 1px;");
    c4.setAttributeNS(null, "data-name", "Option #2");
    c4.setAttributeNS(null, "data-id", "8");
    tree_element.appendChild(c4);

    let c5 = document.createElementNS(SVGNS, "circle");
    c5.setAttributeNS(null, "cx", 140);
    c5.setAttributeNS(null, "cy", 50);
    c5.setAttributeNS(null, "r", R);
    c5.setAttributeNS(null, "style", "fill: #888888; stroke: black; stroke-width: 1px;");
    c5.setAttributeNS(null, "data-name", "Outcomes");
    c5.setAttributeNS(null, "data-id", "9");
    tree_element.appendChild(c5);
}

function setup_tree_tooltip(svg) {
    let tree_container = svg.parentElement;
    let tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    let body = document.getElementsByClassName("note-body")[0];
    tree_container.insertBefore(tooltip, body);

    let tree_nodes = svg.getElementsByTagName("circle");
    for (i = 0; i < tree_nodes.length; i ++) {
        let node = tree_nodes[i];
        let container = node.parentElement.parentElement;
        tree_nodes[i].addEventListener("mouseover", function(e) {
            tooltip.textContent = node.getAttribute("data-name");
            tooltip.style.visibility = "visible";
            tooltip.style.left = "" + (node.getBoundingClientRect().left - 5) + "px";
            tooltip.style.top = "" + (svg.getBoundingClientRect().bottom) + "px";
        });
        tree_nodes[i].addEventListener("click", function(e) {
            window.location.href = "?note=7"; // + node.getAttribute("data-id");
        });
    }
}

function setup_tree_container(node, container, node_data) {
    let svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "1000");
    svg.setAttribute("height", "100");
    svg.classList.add("tree-layout", "note-children");
    container.appendChild(svg);

    setup_tree(node.id, svg);

    setup_tree_tooltip(svg);
}
