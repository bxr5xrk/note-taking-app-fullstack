// export interface INote {
//     id: number;
//     title: string;
//     slug: string;
//     content: string;
//     category: string;
//     creationDate: string;
//     parsedDates: string[];
// }

export interface INote {
    id: number;
    title: string;
    slug: string;
    content: string;
    category: string;
    parseddates: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IStats {
    category: string;
    count: { total: number; active: number; archive: number };
}
