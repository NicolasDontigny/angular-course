export class StarWarsService {
    private characters = [
        {name: 'Skywalker', side: ''},
        {name: 'Vader', side: ''}
    ];

    getCharacters(chosenList) {
        if (chosenList === 'all') {
          return this.characters;
        }
        return this.characters.filter((character) => {
          return character.side === chosenList;
        });
    }

    assignSide(character) {
        const index = this.characters.findIndex((char) => {
          return char.name === character.name
        });
    
        this.characters[index].side = character.side;
    }
}