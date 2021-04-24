class MyTables {
    init(conection) {
        this.conection = conection;
        this.createNotes();
        this.createImageNotes()
    }

    createNotes() {
        const sql =
            "create table if not exists Notes (id int not null auto_increment, creation_date datetime not null, text varchar(50) not null, primary key (id))";

        this.conection.query(sql, (error) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log("Tabela Notes criadas");
        });
    }

    createImageNotes() {
        const sql =
            "create table if not exists Note_images (id int not null auto_increment, note_id int not null, path varchar(50) not null, primary key (id), foreign key (note_id) references Notes(id))";

        this.conection.query(sql, (error) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log("Tabela Note images criadas");
        });
    }
}

module.exports = new MyTables();
