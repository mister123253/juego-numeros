import React, { useState, useEffect } from 'react';
import { RotateCcw, Target, Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const NumberGuessingGame = () => {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Generar número secreto al iniciar
  const generateSecretNumber = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  // Inicializar juego
  const startNewGame = () => {
    setSecretNumber(generateSecretNumber());
    setGuess('');
    setAttempts(0);
    setGameWon(false);
    setMessage('¡Adivina el número secreto entre 1 y 20!');
    setGuessHistory([]);
    setGameStarted(true);
  };

  // Inicializar el primer juego
  useEffect(() => {
    startNewGame();
  }, []);

  // Manejar adivinanza
  const handleGuess = () => {
    if (guess === '' || isNaN(guess)) {
      setMessage('Por favor, ingresa un número válido');
      return;
    }

    const playerGuess = parseInt(guess);
    
    if (playerGuess < 1 || playerGuess > 20) {
      setMessage('El número debe estar entre 1 y 20');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    // Agregar al historial
    const newHistory = [...guessHistory, playerGuess];
    setGuessHistory(newHistory);

    if (playerGuess === secretNumber) {
      setGameWon(true);
      setMessage(`¡🎉 Felicidades! Adivinaste el número ${secretNumber} en ${newAttempts} intento${newAttempts === 1 ? '' : 's'}!`);
    } else if (playerGuess < secretNumber) {
      setMessage('📈 ¡Muy bajo! El número secreto es más alto');
    } else {
      setMessage('📉 ¡Muy alto! El número secreto es más bajo');
    }

    setGuess('');
  };

  // Manejar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameWon) {
      handleGuess();
    }
  };

  // Calcular puntuación
  const getScore = () => {
    if (attempts <= 3) return 'Excelente';
    if (attempts <= 6) return 'Muy bien';
    if (attempts <= 10) return 'Bien';
    return 'Sigue intentando';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Adivina el Número
          </h1>
          <p className="text-gray-600">
            Encuentra el número secreto entre 1 y 20
          </p>
        </div>

        {gameStarted && (
          <div className="space-y-6">
            {/* Mensaje */}
            <div className="text-center">
              <p className={`text-lg font-medium ${
                gameWon ? 'text-green-600' : 'text-gray-700'
              }`}>
                {message}
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {attempts}
                </div>
                <div className="text-sm text-blue-600">
                  Intentos
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {gameWon ? getScore() : '---'}
                </div>
                <div className="text-sm text-purple-600">
                  Puntuación
                </div>
              </div>
            </div>

            {/* Input y botón */}
            {!gameWon && (
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyPress={handleKeyPress}
                    min="1"
                    max="20"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg text-center"
                    placeholder="Tu número"
                  />
                  <button
                    onClick={handleGuess}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Probar
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Presiona Enter para probar
                </p>
              </div>
            )}

            {/* Historial */}
            {guessHistory.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Números probados:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {guessHistory.map((num, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        num === secretNumber && gameWon
                          ? 'bg-green-100 text-green-800'
                          : num < secretNumber
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {num}
                      {num < secretNumber && <TrendingUp className="w-3 h-3 inline ml-1" />}
                      {num > secretNumber && <TrendingDown className="w-3 h-3 inline ml-1" />}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botón de reinicio */}
            <button
              onClick={startNewGame}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Nuevo Juego</span>
            </button>

            {/* Mensaje de victoria */}
            {gameWon && (
              <div className="text-center bg-green-50 rounded-lg p-6">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-green-800 mb-2">
                  ¡Victoria!
                </h2>
                <p className="text-green-600">
                  Has completado el juego con una puntuación de <strong>{getScore()}</strong>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberGuessingGame;