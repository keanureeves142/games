import React, { useState } from 'react';
import { Scissors, Hand, Square, RotateCcw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'loss' | 'draw' | null;

function App() {
  const [stats, setStats] = useState({
    played: 0,
    wins: 0,
    losses: 0,
    draws: 0,
  });
  const [result, setResult] = useState<Result>(null);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);

  const getComputerChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'loss';
  };

  const handleChoice = (choice: Choice) => {
    const computerMove = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(computerMove);
    const gameResult = determineWinner(choice, computerMove);
    setResult(gameResult);
    setStats(prev => ({
      played: prev.played + 1,
      wins: prev.wins + (gameResult === 'win' ? 1 : 0),
      losses: prev.losses + (gameResult === 'loss' ? 1 : 0),
      draws: prev.draws + (gameResult === 'draw' ? 1 : 0),
    }));
  };

  const resetGame = () => {
    setStats({
      played: 0,
      wins: 0,
      losses: 0,
      draws: 0,
    });
    setResult(null);
    setPlayerChoice(null);
    setComputerChoice(null);
  };

  const getResultColor = (result: Result) => {
    switch (result) {
      case 'win': return 'text-green-600';
      case 'loss': return 'text-red-600';
      case 'draw': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Rock Paper Scissors</h1>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-semibold">Played</p>
              <p className="text-xl">{stats.played}</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p className="font-semibold">Wins</p>
              <p className="text-xl text-green-600">{stats.wins}</p>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <p className="font-semibold">Losses</p>
              <p className="text-xl text-red-600">{stats.losses}</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <p className="font-semibold">Draws</p>
              <p className="text-xl text-yellow-600">{stats.draws}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleChoice('rock')}
            className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Choose Rock"
          >
            <Square className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleChoice('paper')}
            className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Choose Paper"
          >
            <Hand className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleChoice('scissors')}
            className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Choose Scissors"
          >
            <Scissors className="w-8 h-8" />
          </button>
        </div>

        {result && (
          <div className="text-center mb-6">
            <div className="flex justify-center gap-8 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">You chose:</p>
                <div className="p-3 bg-gray-100 rounded-lg">
                  {playerChoice === 'rock' && <Square className="w-6 h-6" />}
                  {playerChoice === 'paper' && <Hand className="w-6 h-6" />}
                  {playerChoice === 'scissors' && <Scissors className="w-6 h-6" />}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Computer chose:</p>
                <div className="p-3 bg-gray-100 rounded-lg">
                  {computerChoice === 'rock' && <Square className="w-6 h-6" />}
                  {computerChoice === 'paper' && <Hand className="w-6 h-6" />}
                  {computerChoice === 'scissors' && <Scissors className="w-6 h-6" />}
                </div>
              </div>
            </div>
            <p className={`text-2xl font-bold ${getResultColor(result)}`}>
              {result.toUpperCase()}!
            </p>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;