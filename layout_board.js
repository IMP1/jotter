function setup_board(node, board_element, node_data) {
    let node_children = [1]; // TODO: get from model somehow.

    // TODO: work out which nodes are lists and which are list items.

    for (i = 0; i < node_children.length; i ++) {
        let list = document.createElement("section");

        let title = document.createElement("h1");
        title.textContent = "List Title";
        list.appendChild(title);

        let items = document.createElement("ul");

        let item = document.createElement("li");
        item.textContent = "Foobar";
        items.appendChild(item);

        list.appendChild(items);

        board_element.appendChild(list);
    }
}

function setup_board_container(node, container, node_data) {
    let board = document.createElement("div");
    board.classList.add("board-layout", "note-children");

    setup_board(node, board);

    container.appendChild(board);
}