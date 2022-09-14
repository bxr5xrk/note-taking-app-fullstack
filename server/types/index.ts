export interface INote {
    id: number;
    title: string;
    slug: string;
    content: string;
    category: string;
    creationDate: string;
    parsedDates: string[];
}
