import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character;
  @Output() sideAssigned = new EventEmitter<{name: string, side: string}>();
  swService: StarWarsService;

  constructor(swService: StarWarsService) { 
    this.swService = swService;
  }

  ngOnInit() {
  }

  onAssignSide(side) {
    // this.sideAssigned.emit({name: this.character.name, side: side});
    this.swService.assignSide({name: this.character.name, side: side})
  }
}
