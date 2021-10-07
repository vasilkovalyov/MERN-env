class UserDto {
    email;
    _id;
    name;
    surname;
    initials;
    username;
    image;

    constructor({_id, name, surname, initials, email, username, image }) {
        this._id = _id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.initials = initials;
        this.username = username;
        this.image = image;
    }
}

module.exports = UserDto