import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';

@Injectable()
export class StarWarsService {
    private characters = [
        {name: 'Skywalker', side: ''},
        {name: 'Vader', side: ''}
    ];
    private logService: LogService;
    charactersChanged = new Subject<void>();

    constructor(logService: LogService) {
        this.logService = logService;
    }

    getCharacters(chosenList) {
        if (chosenList === 'all') {
          return this.characters.slice();
        }
        return this.characters.filter((character) => {
          return character.side === chosenList;
        });
    }

    assignSide(character) {
        const index = this.characters.findIndex((char) => {
          return char.name === character.name;
        });

        this.characters[index].side = character.side;
        this.charactersChanged.next();
        this.logService.writeLog('Changed Side of ' + character.name + '! New side: ' + character.side);
    }

    addCharacter(name, side) {
      const newChar = {name, side};
      this.characters.push(newChar);
    }
}