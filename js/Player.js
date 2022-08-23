export default class Player {
  constructor(name, symbol, points = 0, level = 1) {
    this.name = name;
    this.symbol = symbol;
    this.points = points;
    this.level = level;
  }

  /**
   * Assignment
   * Add a function to add a point to the player total points
   */

  addPoint = () => {
    this.points += 5;
    for (let i = 0; i <= 1000; i += 10) {
      if (this.points === i) {
        this.increasePlayerLevel();
      }
    }
  }

  /**
   * Assignment
   * Add a function to raise the level of the Player, the level rises one every 10 points. 
   * Player starts at level 1
   * so if player has 10 points, then he will be level 2, if he has 20 points, he will be level 3 etc
   * Connect the method in the add point method. 
   */

  increasePlayerLevel = () => {
    this.level += 1;
  }
}
