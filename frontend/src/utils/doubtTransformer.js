
export const buildDoubtsTree = (doubts) => {
    const doubtMap = {};
    const tree = [];

    //first pass: create a map of all doubts by their ID
    doubts.forEach(doubt => {
        doubtMap[doubt._id] = { ...doubt, items: [] };
    });

    //second pass: link children to their parents
    doubts.forEach(doubt => {
        if (doubt.parentDoubt) {
            // if its a child of some doubt
            if (doubtMap[doubt.parentDoubt]) {
                doubtMap[doubt.parentDoubt].items.push(doubtMap[doubt._id]);
            }
        } else {
            //if its a top-level doubt
            tree.push(doubtMap[doubt._id]);
        }
    });

    return tree;
};
