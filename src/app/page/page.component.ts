import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../page.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import Page = wikipedia.Page;
import {TextToSpeechService} from '../text-to-speech.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input() page: Page;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private textToSpeechService: TextToSpeechService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.getPage();
  }

  private getPage() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageService.getPage(id)
      .subscribe(data => {
        this.page = data;
        this.textToSpeechService.loadSound(this.page.extract);
      });
  }

  read() {
    this.textToSpeechService.play();
  }

}
