function setup_board(board_element, node_data) {
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

function setup_container(note_container, note) {
    let css = document.createElement("link");
    css.rel  = 'stylesheet';
    css.type = 'text/css';
    css.href = "https://imp1.github.io/jotter/layout/board.css";
    document.head.appendChild(css);

    note_container.classList.add("board-container");

    let board = document.getElementById("note-children");
    board.classList.add("board-layout");
    setup_board(board, note);
}
