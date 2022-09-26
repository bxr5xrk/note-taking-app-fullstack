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
