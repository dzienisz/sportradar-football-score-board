import { Game } from "../types";

export class Scoreboard {
  games: Game[] = [];
  id = 0;

  startGame(homeTeam: string, awayTeam: string): void {
    this.games.push({
      id: this.id + 1,
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(Date.now()),
    });
    this.id += 1;
  }

  updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ): void {
    const game = this.games.find(
      (game) => game.homeTeam === homeTeam && game.awayTeam === awayTeam
    );
    if (!game) throw new Error("Game not found");
    game.homeScore = homeScore;
    game.awayScore = awayScore;
  }

  finishGame(homeTeam: string, awayTeam: string): void {
    this.games = this.games.filter(
      (game) => game.homeTeam !== homeTeam || game.awayTeam !== awayTeam
    );
  }

  getSummary(): string[] {
    return this.games
      .sort(
        (a, b) =>
          b.homeScore + b.awayScore - (a.homeScore + a.awayScore) ||
          a.startTime.getTime() - b.startTime.getTime() ||
          b.id - a.id
      )
      .map(
        (game) =>
          `${game.homeTeam} ${game.homeScore} - ${game.awayTeam} ${game.awayScore}`
      );
  }

  getSummaryObject(): object[] {
    return this.games
      .sort(
        (a, b) =>
          b.homeScore + b.awayScore - (a.homeScore + a.awayScore) ||
          a.startTime.getTime() - b.startTime.getTime() ||
          b.id - a.id
      )
      .map((game) => ({
        name: game.homeTeam,
        score: game.homeScore,
        name2: game.awayTeam,
        score2: game.awayScore,
      }));
  }
}

// for interviewer test purposes

const scoreBoard = new Scoreboard();
scoreBoard.startGame("Mexico", "Canada");
scoreBoard.updateScore("Mexico", "Canada", 0, 5);
scoreBoard.startGame("Spain", "Brazil");
scoreBoard.updateScore("Spain", "Brazil", 10, 2);
scoreBoard.startGame("Germany", "France");
scoreBoard.updateScore("Germany", "France", 2, 2);
scoreBoard.startGame("Uruguay", "Italy");
scoreBoard.updateScore("Uruguay", "Italy", 6, 6);
scoreBoard.startGame("Argentina", "Australia");
scoreBoard.updateScore("Argentina", "Australia", 3, 1);

console.log(scoreBoard.getSummary());
console.log(scoreBoard.getSummaryObject());
