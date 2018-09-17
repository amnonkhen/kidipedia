import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '../../node_modules/@angular/common/http';
import {map} from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private audio: HTMLAudioElement;

  constructor(private http: HttpClient) {
    this.audio = new Audio();
  }

  loadSound(text: string) {
    const api_key = 'd808a3c43e2d4c748e6fad246155c645';
    const api_params = new HttpParams()
      .set('key', api_key)
      .set('hl', 'en-us')
      .set('src', text);
    const api_url = 'http://api.voicerss.org/';
    const api_options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'audio/mpeg'),
      responseType: 'blob' as 'json'
    };
    this.http.post<string>(api_url, api_params, api_options)
      .subscribe((o: string) => {
        // this.audio.src = o;
        this.audio.src = window.URL.createObjectURL(o);
      });
  }

  public play(): void {
    this.audio.play();
  }
}
