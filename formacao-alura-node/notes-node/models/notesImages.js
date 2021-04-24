const myConection = require("../infra/conexao");

class NoteImages {
    async add(note_id, path) {
        return await new Promise((resolve, reject) => {
            const sql = "insert into Note_images set ?";
            myConection.query(sql, {note_id: note_id, path: path}, (error, note) => {
                if (error) {
                    reject(error);
                }
                resolve(note);
            });
        });
    }
}

module.exports = new NoteImages()