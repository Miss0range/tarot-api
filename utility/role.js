const Roles = Object.freeze({
    ADMIN: "admin",
    INTERNAL: "internal",
    USER: "user",
});

const InternalRoles = Object.freeze(["admin", "internal"]);

module.exports = {Roles, InternalRoles};
