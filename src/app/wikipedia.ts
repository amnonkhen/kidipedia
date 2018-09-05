namespace wikipedia {
  export interface Page {
    title: string;
    thumbnail: string;
    extract: string;
  }

  export interface Category {
    id: string;
    name: string;
    image: string;
    pages: wikipedia.Page[];
    isFavorite: boolean;
  }
}

namespace wikipedia.transport {
  export interface QueryResponse {
    continue?: Continue;
    batchcomplete?: boolean;
    query: Query;
  }

  export interface Continue {
    imcontinue: string;
    continue: string;
  }

  export interface Image {
    ns: number;
    title: string;
  }

  export interface Thumbnail {
    source: string;
    width: number;
    height: number;
  }

  export interface Original {
    source: string;
    width: number;
    height: number;
  }

  export interface Page {
    pageid: number;
    ns: number;
    title: string;
    extract: string;
    images: Image[];
    thumbnail?: Thumbnail;
    original: Original;
    pageimage: string;
  }

  export interface Query {
    pages: Page[];
  }
}

