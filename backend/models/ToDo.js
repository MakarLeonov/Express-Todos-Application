const db = require('../config/db');
const tableName = 'todos'

class ToDo {
    constructor(title, body, is_done) {
        this.title = title;
        this.body = body;
        this.is_done = is_done;
    }

    save() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
            INSERT INTO ${tableName}(title, body, is_done, created_at) 
            VALUES ('${this.title}', '${this.body}', ${0}, '${createdAtDate}')
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = `SELECT * FROM ${tableName};`;

        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM ${tableName} WHERE id = ${id};`;

        return db.execute(sql);
    }

    static delete(id) {
        let sql = `DELETE FROM ${tableName} WHERE id = ${id};`;

        return db.execute(sql);
    }
}

module.exports = ToDo;