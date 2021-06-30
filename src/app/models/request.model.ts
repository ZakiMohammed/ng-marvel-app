export interface MarvelRequestOptions {
    limit: number;
    offset: number;
    nameStartsWith?: string;
    titleStartsWith?: string;
}

export type Category = 'characters' | 'comics' | 'creators' | 'events' | 'series' | 'stories';