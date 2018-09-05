import {Component, Input, OnInit} from '@angular/core';
import {PageService} from "../page.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import Page = wikipedia.Page;


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input() page: Page;
  private audio;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private location: Location
  ) {
    this.audio = new Audio();

  }

  ngOnInit() {
    this.getPage();
  }

  private getPage() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageService.getPage(id)
      .subscribe(data => this.page = data);
  }

  read() {
    let api_key = 'd808a3c43e2d4c748e6fad246155c645';
    let extract = this.page.extract;
    this.play('http://api.voicerss.org/?key=' + api_key + '&hl=en-us&src=' + extract);
  }

  // load a url into audio object
  load(url: string) {
    this.audio.src = url;
    this.audio.load();
  }

  play(url: string) {
    this.load(url);
    this.audio.play()
  }
}
