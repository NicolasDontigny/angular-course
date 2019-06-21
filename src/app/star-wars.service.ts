import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {
    private characters = [
        // {name: 'Skywalker', side: ''},
        // {name: 'Vader', side: ''}
    ];
    private logService: LogService;
    charactersChanged = new Subject<void>();
    isLoading = true;
    loading = new Subject<void>();
    http: Http;

    constructor(logService: LogService, http: Http) {
        this.logService = logService;
        this.http = http;
    }

    getCharacters(chosenList) {
        if (chosenList === 'all') {
          return this.characters.slice();
        }
        return this.characters.filter((character) => {
          return character.side === chosenList;
        });
    }

    fetchCharacters() {
      this.http.get('https://swapi.co/api/people/')
        .map(
          (response: any) => {
            const data = response.json();
            const extractedChars = data.results;
            const chars = extractedChars.map((char) => {
              return ({ name: char.name, side: '' });
            });
            return chars;
        })
        .subscribe(
          (data) => {
            this.characters = data;
            this.charactersChanged.next();
            this.loading.next();
            this.isLoading = false;
          }
        );
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