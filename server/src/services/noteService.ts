import { INote } from "../types";
import db from "../db";
import { createTitleAndSlug, parseDates } from "../helpers/toolsForNoteObj";
import { calculateCategoriesCount } from "../helpers/calculateCategoriesCount";

// ! rewrite postgres logic to obsidian

class NoteService {
    stats = async () =>
        calculateCategoriesCount(
            (await db.query<INote>("select * from active")).rows,
            (await db.query<INote>("select * from archive")).rows
        );

    findTitle = async (slug: string, type: "create" | "update") => {
        const allSlugs = (
            await db.query(
                "select active.slug from active union select archive.slug from archive"
            )
        ).rows;
        if (allSlugs.length) {
            const findTitle =
                type === "create"
                    ? allSlugs.find((i) => i.slug === slug)
                    : allSlugs
                          .filter((i) => i.slug !== slug)
                          .find((i) => i.slug === slug);
            if (findTitle) {
                return "already exists";
            }
        }
    };

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
        content,
        category,
    }: Pick<INote, "title" | "category" | "content">) => {
        const { slug, newTitle } = createTitleAndSlug(title);
        const find = await this.findTitle(slug, "create");
        if (!find) {
            const note = (
                await db.query(
                    `insert into active (title, slug, content, category, parseddates) values ($1, $2, $3, $4, $5) returning *`,
                    [newTitle, slug, content, category, parseDates(content)]
                )
            ).rows[0];
            return note;
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
        content,
        category,
    }: Pick<INote, "id" | "title" | "category" | "content">) => {
        if (!id) {
            throw new Error("No id");
        }
        const { slug, newTitle } = createTitleAndSlug(title);
        const find = await this.findTitle(slug, "update");
        if (!find) {
            return await (
                await db.query(
                    "update active set title = $1, slug = $2, content = $3, category = $4, parsedDates = $5 where id = $6 returning *",
                    [newTitle, slug, content, category, parseDates(content), id]
                )
            ).rows[0];
        } else {
            throw new Error(title + " already exists");
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
            return "archived";
        } else {
            await db.query(
                "with item as (delete from archive where id = $1 returning *) insert into active select * from item",
                [id]
            );
            return "unArchived";
        }
    };
}

export default new NoteService();
