import { INote } from "../types";
import db from "../db";

// ! add parsing dates
// ! simplify code
// ! rewrite postgres logic to obsidian

class NoteService {
    // getStats = () => calculateCategoriesCount(data);
    getActive = async () =>
        (await db.query("select * from active ORDER BY id asc")).rows;

    getArchive = async () =>
        (await db.query("select * from archive ORDER BY id asc")).rows;

    getOneById = async (slug: string) => {
        if (!slug) {
            throw new Error("no slug");
        } else {
            const note = (
                await db.query("select * from active where slug = $1", [slug])
            ).rows[0];
            if (!note) {
                throw new Error("Wrong note slug");
            } else {
                return note;
            }
        }
    };
    create = async ({
        title,
        slug,
        content,
        category,
        parseddates,
    }: Pick<
        INote,
        "title" | "slug" | "category" | "content" | "parseddates"
    >) => {
        const allSlugs = (
            await db.query(
                "select active.slug from active union select archive.slug from archive"
            )
        ).rows;
        if (allSlugs.length) {
            const findTitle = allSlugs.find((i) => i.slug === slug);
            if (!findTitle) {
                const note = (
                    await db.query(
                        `insert into active (title, slug, content, category, parseddates) values ($1, $2, $3, $4, $5) returning *`,
                        [title, slug, content, category, parseddates]
                    )
                ).rows[0];
                if (note) {
                    return note;
                } else {
                    throw new Error(title + " already exists");
                }
            }
        } else {
            throw new Error(title + " already exists");
        }
    };

    delete = async (id: number) => {
        if (!id) {
            throw new Error("No id");
        }
        const noteInActive = await db.query(
            "select * from active where id = $1",
            [id]
        );
        if (noteInActive) {
            await db.query("delete from active where id = $1", [id]);
        } else {
            await db.query("delete from archive where id = $1", [id]);
        }
        return `successfully deleted note with id: ${id}`;
    };
    update = async ({
        id,
        title,
        slug,
        content,
        category,
        parseddates,
    }: Pick<
        INote,
        "id" | "title" | "category" | "slug" | "parseddates" | "content"
    >) => {
        if (!id) {
            throw new Error("No id");
        }
        const allSlugs = (
            await db.query(
                "select active.slug from active union select archive.slug from archive"
            )
        ).rows;
        if (allSlugs.length) {
            const findTitle = allSlugs
                .filter((i) => i.slug !== slug)
                .find((i) => i.slug === slug);
            if (!findTitle) {
                return await (
                    await db.query(
                        "update active set title = $1, slug = $2, content = $3, category = $4, parsedDates = $5 where id = $6 returning *",
                        [title, slug, content, category, parseddates, id]
                    )
                ).rows[0];
            } else {
                throw new Error(title + " already exists");
            }
        } else {
            throw new Error("exists");
        }
    };

    archiveOrUnArchive = async (id: number) => {
        if (!id) {
            throw new Error("No id");
        }
        const findInActive = (
            await db.query("select * from active where id = $1", [id])
        ).rows[0];
        if (findInActive) {
            await db.query(
                "with item as (delete from active where id = $1 returning *) insert into archive select * from item",
                [id]
            );
        } else {
            await db.query(
                "with item as (delete from archive where id = $1 returning *) insert into active select * from item",
                [id]
            );
        }
        return findInActive ? "archived" : "unArchived";
    };
}

export default new NoteService();
