const db = require('./dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    removeAll
};

function find() {
    return db('zoos');
}

function findById(id) {
    return db('zoos').where({ id: id }).first();
}

function add(zoo) {
    return db('zoos').insert(zoo);
}

function update(id, name) {
    return db('zoos')
        .where({ id })
        .update(name);
}

function remove(id) {
    return db('zoos')
        .where({ id })
        .delete(id);
}

function removeAll() {
    return db('zoos').delete();
}

// function execute(id) {
//     const findZoos = findById(1);
//     console.log(findZoos);
// }

// execute();
