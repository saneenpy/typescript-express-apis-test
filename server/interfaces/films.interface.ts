export interface Films {
    id?: number;
    title: string;
    releaseDate: string;
    characters: string[]
}

export interface PaginatedFilms<T> {
    size: number;
    page: number;
    total: number;
    content: T[];
}
