import React, { useState } from 'react';
import { Scissors, Hand, Square, RotateCcw, Menu, Edit2 } from 'lucide-react';
import Layout from './components/Layout';

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
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Rock Paper Scissors</h1>
      
      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatBox label="Played" value={stats.played} bgColor="gray" />
        <StatBox label="Wins" value={stats.wins} bgColor="green" />
        <StatBox label="Losses" value={stats.losses} bgColor="red" />
        <StatBox label="Draws" value={stats.draws} bgColor="yellow" />
      </div>

      <GameControls handleChoice={handleChoice} />
      
      <GameResult 
        result={result}
        playerChoice={playerChoice}
        computerChoice={computerChoice}
        getResultColor={getResultColor}
      />

      <ResetButton resetGame={resetGame} />

      {/* Leaderboard Section */}
      <div className="mt-8 bg-pink-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Leader Board</h2>
        <div className="space-y-2">
          <p className="text-gray-500">Leaderboard coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}

// Create new components for better organization
const GameHeader = ({ stats }) => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Rock Paper Scissors</h1>
    <div className="grid grid-cols-4 gap-4 text-sm">
      <StatBox label="Played" value={stats.played} bgColor="gray" />
      <StatBox label="Wins" value={stats.wins} bgColor="green" />
      <StatBox label="Losses" value={stats.losses} bgColor="red" />
      <StatBox label="Draws" value={stats.draws} bgColor="yellow" />
    </div>
  </div>
);

const StatBox = ({ label, value, bgColor }) => (
  <div className={`bg-${bgColor}-50 p-2 rounded`}>
    <p className="font-semibold">{label}</p>
    <p className={`text-xl ${bgColor !== 'gray' ? `text-${bgColor}-600` : ''}`}>{value}</p>
  </div>
);

const GameControls = ({ handleChoice }) => (
  <div className="flex justify-center gap-4 mb-8">
    <GameButton choice="rock" icon={<Square className="w-8 h-8" />} onClick={handleChoice} />
    <GameButton choice="paper" icon={<Hand className="w-8 h-8" />} onClick={handleChoice} />
    <GameButton choice="scissors" icon={<Scissors className="w-8 h-8" />} onClick={handleChoice} />
  </div>
);

const GameButton = ({ choice, icon, onClick }) => (
  <button
    onClick={() => onClick(choice)}
    className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
    aria-label={`Choose ${choice}`}
  >
    {icon}
  </button>
);

const GameResult = ({ result, playerChoice, computerChoice, getResultColor }) => (
  result && (
    <div className="text-center mb-6">
      <div className="flex justify-center gap-8 mb-4">
        <ChoiceDisplay label="You chose:" choice={playerChoice} />
        <ChoiceDisplay label="Computer chose:" choice={computerChoice} />
      </div>
      <p className={`text-2xl font-bold ${getResultColor(result)}`}>
        {result.toUpperCase()}!
      </p>
    </div>
  )
);

const ChoiceDisplay = ({ label, choice }) => (
  <div>
    <p className="text-sm text-gray-600 mb-2">{label}</p>
    <div className="p-3 bg-gray-100 rounded-lg">
      {choice === 'rock' && <Square className="w-6 h-6" />}
      {choice === 'paper' && <Hand className="w-6 h-6" />}
      {choice === 'scissors' && <Scissors className="w-6 h-6" />}
    </div>
  </div>
);

const ResetButton = ({ resetGame }) => (
  <button
    onClick={resetGame}
    className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
  >
    <RotateCcw className="w-4 h-4" />
    Reset Game
  </button>
);

export default App;