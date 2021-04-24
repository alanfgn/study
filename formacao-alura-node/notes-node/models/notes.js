const myConection = require("../infra/conexao");
const moment = require("moment");

class Notes {
    async add(note) {
        return await new Promise((resolve, reject) => {
            note.creation_date = moment().format()
            const sql = "insert into Notes set ?";
            myConection.query(sql, note, (error, note) => {
                if (error) {
                    reject(error);
                }
                resolve(note);
            });
        });
    }

    async get(id) {
        return await new Promise((resolve, reject) => {
            myConection.query(`select * from Notes where id=?`, id, (error, notes) => {
                if (error) {
                    reject(error);
                }
                resolve(notes[0]);
            });
        });
    }

    async list() {
        return await new Promise((resolve, reject) => {
            myConection.query(`select * from Notes`, (error, notes) => {
                if (error) {
                    reject(error);
                }
                resolve(notes);
            });
        });
    }

    async update(id, note) {
        return await new Promise((resolve, reject) => {
            myConection.query(`update Notes set ? where id=?`, [note, id], (error, note) => {
                if (error) {
                    reject(error);
                }
                resolve(note);
            });
        });
    }

    async remove(id) {
        return await new Promise((resolve, reject) => {
            myConection.query(`delete from Notes where id=?`, id, (error, note) => {
                if (error) {
                    reject(error);
                }
                resolve(note);
            });
        });
    }
}

module.exports = new Notes();
