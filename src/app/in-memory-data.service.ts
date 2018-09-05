import {InMemoryDbService, ParsedRequestUrl} from 'angular-in-memory-web-api';
import {RequestInfoUtilities} from "angular-in-memory-web-api/interfaces";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = [
      {id: 'Astronomy', name: 'Astronomy', isFavorite: true},
      {id: 'Communication', name: 'Communication', isFavorite: false},
      {id: 'Ecology', name: 'Ecology', isFavorite: false},
      {id: 'Mathematics', name: 'Mathematics', isFavorite: false},
      {id: 'History', name: 'History', isFavorite: false},
      {id: 'Education', name: 'Education', isFavorite: false},
      {id: 'Animation', name: 'Animation', isFavorite: false},
      {id: 'Art', name: 'Art', isFavorite: false},
      {id: 'Music', name: 'Music', isFavorite: true},
      {id: 'Geography', name: 'Geography', isFavorite: true}
    ];


    return {categories};

  }

  parseRequestUrl(url: string, requestInfoUtils: RequestInfoUtilities): ParsedRequestUrl {
    if (url.indexOf("wikipedia") > -1) {
      console.log("calling wikipedia api");
      return {
        apiBase: '',
        collectionName: 'x',
        id: '',
        query: new Map(),
        resourceUrl: 'url',
      }
    } else {
      return requestInfoUtils.parseRequestUrl(url);
    }

  }
}
