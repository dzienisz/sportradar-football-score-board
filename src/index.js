"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scoreboard = void 0;
var Scoreboard = /** @class */ (function () {
    function Scoreboard() {
        this.games = [];
        this.id = 0;
    }
    Scoreboard.prototype.startGame = function (homeTeam, awayTeam) {
        this.games.push({
            id: this.id + 1,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            homeScore: 0,
            awayScore: 0,
            startTime: new Date(Date.now()),
        });
        this.id += 1;
    };
    Scoreboard.prototype.updateScore = function (homeTeam, awayTeam, homeScore, awayScore) {
        var game = this.games.find(function (game) { return game.homeTeam === homeTeam && game.awayTeam === awayTeam; });
        if (!game)
            throw new Error("Game not found");
        game.homeScore = homeScore;
        game.awayScore = awayScore;
    };
    Scoreboard.prototype.finishGame = function (homeTeam, awayTeam) {
        this.games = this.games.filter(function (game) { return game.homeTeam !== homeTeam || game.awayTeam !== awayTeam; });
    };
    Scoreboard.prototype.getSummary = function () {
        return this.games
            .sort(function (a, b) {
            return b.homeScore + b.awayScore - (a.homeScore + a.awayScore) ||
                a.startTime.getTime() - b.startTime.getTime() ||
                b.id - a.id;
        })
            .map(function (game) {
            return "".concat(game.homeTeam, " ").concat(game.homeScore, " - ").concat(game.awayTeam, " ").concat(game.awayScore);
        });
    };
    Scoreboard.prototype.getSummaryObject = function () {
        return this.games
            .sort(function (a, b) {
            return b.homeScore + b.awayScore - (a.homeScore + a.awayScore) ||
                a.startTime.getTime() - b.startTime.getTime() ||
                b.id - a.id;
        })
            .map(function (game) { return ({
            name: game.homeTeam,
            score: game.homeScore,
            name2: game.awayTeam,
            score2: game.awayScore,
        }); });
    };
    return Scoreboard;
}());
exports.Scoreboard = Scoreboard;
// for interviewer test purposes
var scoreBoard = new Scoreboard();
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
