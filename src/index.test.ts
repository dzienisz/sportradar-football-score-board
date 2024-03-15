import { Scoreboard } from "./index";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");

  test("should start a game with initial score 0 - 0", () => {
    scoreboard.startGame("Home", "Away");
    expect(scoreboard.getSummary()).toEqual(["Home 0 - Away 0"]);
  });

  test("should update score of a game correctly", () => {
    scoreboard.startGame("Home", "Away");
    scoreboard.updateScore("Home", "Away", 2, 3);
    expect(scoreboard.getSummary()).toEqual(["Home 2 - Away 3"]);
  });

  test("should remove a game on finish", () => {
    scoreboard.startGame("Home", "Away");
    scoreboard.finishGame("Home", "Away");
    expect(scoreboard.getSummary()).toHaveLength(0);
  });

  test("should order games by total score and most recently started", () => {
    scoreboard.startGame("Mexico", "Canada");
    setTimeout(() => scoreboard.updateScore("Mexico", "Canada", 0, 5), 100);

    scoreboard.startGame("Spain", "Brazil");
    setTimeout(() => scoreboard.updateScore("Spain", "Brazil", 10, 2), 100);

    scoreboard.startGame("Germany", "France");
    setTimeout(() => scoreboard.updateScore("Germany", "France", 2, 2), 100);

    scoreboard.startGame("Uruguay", "Italy");
    setTimeout(() => scoreboard.updateScore("Uruguay", "Italy", 6, 6), 100);

    scoreboard.startGame("Argentina", "Australia");
    setTimeout(
      () => scoreboard.updateScore("Argentina", "Australia", 3, 1),
      100
    );

    setTimeout(() => {
      const summary = scoreboard.getSummary();
      expect(summary[0]).toContain("Uruguay 6 - Italy 6");
      expect(summary[1]).toContain("Spain 10 - Brazil 2");
      expect(summary[2]).toContain("Mexico 0 - Canada 5");
      expect(summary[3]).toContain("Argentina 3 - Australia 1");
      expect(summary[4]).toContain("Germany 2 - France 2");
    }, 500);
  });
});
