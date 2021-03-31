const UserRepository = require('../repositories/userRepository')
const repository = new UserRepository();

const findAll = async (filter, options) => {
    return repository.findAllWithPagination(filter, options);
}

const findById = async (id) => {
    return repository.findById(id);
}

const save = async (user) => {
    return repository.save(user);
}

const update = async (id, user) => {
    return repository.update(id, user);
}

const remove = async (id) => {
    return repository.remove(id);
}

module.exports = {
    findAll,
    findById,
    save,
    update,
    remove
}