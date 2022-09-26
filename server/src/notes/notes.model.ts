import { Column, DataType, Model, Table } from "sequelize-typescript";

interface NoteCreationAttr {
    title: string;
    content: string;
    category: string;
}

@Table({ tableName: "active" })
class Note extends Model<Note, NoteCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    slug: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category: string;

    // @Column({
    //     type: DataType.TIME,
    //     allowNull: false,
    // })
    // created_at: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
    })
    parseddates: string[];
}

export default Note;

// Note.init({
//     title: {
//         type: DataType.STRING,
//         unique: true,
//     },
// });

// CREATE TABLE active (
//     id SERIAL NOT NULL PRIMARY KEY,
//     title varchar(50) unique,
//     slug varchar(50) unique,
//     content text,
//     parseddates text[],
//     category varchar(50),
//     created_at TIMESTAMP NOT NULL DEFAULT NOW()
//   );
