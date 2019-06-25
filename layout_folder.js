function setup_folder(node, list_element) {

    for (i = 0; i < node.children.length; i ++) {
        let child_node = NODE_DATA[node.children[i]];

        let item = document.createElement("li");

        let link = document.createElement("a");
        link.setAttribute("href", "?note=" + child_node.id);

        let icon = document.createElement("span");
        icon.classList.add("icon", "fa", "fa-lg");
        if (child_node.child_layout == 3) {
            icon.classList.add("fa-list-alt");
        } else if (child_node.child_layout == 2) { // TODO: get from child's child_layout field.
            icon.classList.add("fa-sitemap", "fa-rotate-270");
        } else {
            icon.classList.add("fa-folder");
        }
        link.appendChild(icon);

        let text = document.createElement("span");
        text.textContent = child_node.name;

        link.appendChild(text);
        item.appendChild(link);
        list_element.appendChild(item);
    }
}

function setup_folder_container(node, container) {
    let folder = document.createElement("ul");
    folder.classList.add("note-children");

    setup_folder(node, folder);

    container.appendChild(folder);

}