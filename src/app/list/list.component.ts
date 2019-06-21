import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  // @Input() characters;
  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;
  loadedSide = 'all';
  subscription: Subscription;
  // loading = true;

  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) { 
    this.activatedRoute = activatedRoute;
    this.swService = swService;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.swService.getCharacters(params.side);
        this.loadedSide = params.side;
      }
    );


    this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        this.characters = this.swService.getCharacters(this.loadedSide);
      }
    );

    // this.subscription = this.swService.loading.subscribe(
    //   () => {
    //     this.loading = false;
    //   }
    // );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
