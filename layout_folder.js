function setup_folder(node, list_element, node_data) {
    for (i = 0; i < node.children.length; i ++) {
        let child_node = node_data[node.children[i]];

        let card = document.createElement("div");
        card.classList.add("mdc-card", "col", "s16", "m4", "l3", "blue-grey");

        let content = document.createElement("a");
        content.setAttribute("href", "?note=" + child_node.id);
        content.classList.add("mdc-card__primary-action");

        let header = document.createElement("header");
        header.classList.add("demo-card__primary", "white-text");

        let icons = document.createElement("ul");
        icons.classList.add("note-card-icons");

        // let child_layout_icon = document.createElement("li");
        // child_layout_icon.classList.add("material-icons");
        // if (child_node.child_layout == 3) {
        //     child_layout_icon.textContent = "dns";
        // } else if (child_node.child_layout == 2) {
        //     child_layout_icon.textContent = "timeline";
        // } else {
        //     child_layout_icon.textContent = "view_module";
        // }
        // icons.appendChild(child_layout_icon);

        let content_layout_icon = document.createElement("li");
        content_layout_icon.classList.add("material-icons");
        if (child_node.content_layout == "character-sheet") {
            content_layout_icon.textContent = "person";
        } else if (child_node.child_layout == 3) {
            content_layout_icon.textContent = "dns";
        } else if (child_node.child_layout == 2) {
            content_layout_icon.textContent = "timeline";
        } else if (child_node.children.length > 0) {
            content_layout_icon.textContent = "folder";
        } else {
            content_layout_icon.textContent = "description";
        }
        icons.appendChild(content_layout_icon);

        header.appendChild(icons);

        let title = document.createElement("h2");
        title.classList.add("note-card-title", "demo-card__title", "mdc-typography", "mdc-typography--headline6", "white-text");
        title.textContent = child_node.name;
        header.appendChild(title);

        content.appendChild(header);

        let body = document.createElement("div");
        body.classList.add("demo-card__secondary", "mdc-typography", "mdc-typography--body2", "white-text");
        body.textContent = child_node.body;
        content.appendChild(body);

        card.appendChild(content);

        let actions = document.createElement("div");
        actions.classList.add("mdc-card__actions");

        let buttons = document.createElement("div");
        buttons.classList.add("mdc-card__action-buttons");

        let main_button = document.createElement("a");
        main_button.classList.add("mdc-button", "mdc-card__action", "mdc-card__action--button", "white-text");
        main_button.setAttribute("href", "?note=" + child_node.id);
        main_button.textContent = "View Note";
        buttons.appendChild(main_button);

        let action_icons = document.createElement("div");
        action_icons.classList.add("mdc-card__action-icons", "white-text");

        let delete_button = document.createElement("button");
        delete_button.classList.add("mdc-icon-button", "material-icons", "mdc-card__action", "mdc-card__action--icon--unbounded");
        delete_button.setAttribute("title", "Delete");
        delete_button.setAttribute("data-mdc-ripple-is-unbounded", true);
        delete_button.textContent = "delete";

        let more_button = document.createElement("button");
        more_button.classList.add("mdc-icon-button", "material-icons", "mdc-card__action", "mdc-card__action--icon--unbounded");
        more_button.setAttribute("title", "More Options");
        more_button.setAttribute("data-mdc-ripple-is-unbounded", true);
        more_button.textContent = "more_vert";

        action_icons.appendChild(delete_button);
        action_icons.appendChild(more_button);

        actions.appendChild(buttons);
        actions.appendChild(action_icons);
        card.appendChild(actions);

        list_element.appendChild(card);
    }
}

function setup_folder_container(node, container, node_data) {
    let folder = document.createElement("div");
    folder.classList.add("note-children", "row");

    setup_folder(node, folder, node_data);

    container.appendChild(folder);
}