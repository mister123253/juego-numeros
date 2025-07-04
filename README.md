# juego-numeros
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego de Adivinanza de Números</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .game-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 450px;
            width: 100%;
            text-align: center;
        }

        .game-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: white;
        }

        h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }

        .message {
            font-size: 18px;
            margin-bottom: 20px;
            min-height: 25px;
            font-weight: 500;
        }

        .message.success {
            color: #10b981;
        }

        .message.hint {
            color: #333;
        }

        .stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }

        .stat-card {
            padding: 20px;
            border-radius: 12px;
            background: #f8fafc;
        }

        .stat-card.attempts {
            background: #dbeafe;
        }

        .stat-card.score {
            background: #e9d5ff;
        }

        .stat-number {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-card.attempts .stat-number {
            color: #2563eb;
        }

        .stat-card.score .stat-number {
            color: #7c3aed;
        }

        .stat-label {
            font-size: 14px;
            color: #64748b;
        }

        .input-section {
            margin-bottom: 20px;
        }

        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }

        #guessInput {
            flex: 1;
            padding: 15px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 18px;
            text-align: center;
            transition: border-color 0.3s;
        }

        #guessInput:focus {
            outline: none;
            border-color: #667eea;
        }

        .btn {
            padding: 15px 25px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            width: 100%;
            margin-top: 20px;
        }

        .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
        }

        .hint-text {
            font-size: 14px;
            color: #64748b;
            margin-top: 10px;
        }

        .history {
            background: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .history h3 {
            color: #374151;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .history-numbers {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .history-number {
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
        }

        .history-number.low {
            background: #fee2e2;
            color: #dc2626;
        }

        .history-number.high {
            background: #fef3c7;
            color: #d97706;
        }

        .history-number.correct {
            background: #d1fae5;
            color: #059669;
        }

        .victory-card {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border-radius: 12px;
            padding: 30px;
            margin-top: 20px;
        }

        .victory-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }

        .victory-title {
            color: #059669;
            font-size: 24px;
            margin-bottom: 10px;
        }

        .victory-text {
            color: #047857;
            font-size: 16px;
        }

        .hidden {
            display: none;
        }

        @media (max-width: 480px) {
            .game-container {
                padding: 30px 20px;
            }

            .input-group {
                flex-direction: column;
            }

            .btn {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="game-icon">🎯</div>
        <h1>Adivina el Número</h1>
        <p class="subtitle">Encuentra el número secreto entre 1 y 20</p>
        
        <div id="message" class="message hint">¡Adivina el número secreto entre 1 y 20!</div>
        
        <div class="stats">
            <div class="stat-card attempts">
                <div id="attempts" class="stat-number">0</div>
                <div class="stat-label">Intentos</div>
            </div>
            <div class="stat-card score">
                <div id="score" class="stat-number">---</div>
                <div class="stat-label">Puntuación</div>
            </div>
        </div>

        <div id="inputSection" class="input-section">
            <div class="input-group">
                <input type="number" id="guessInput" min="1" max="20" placeholder="Tu número">
                <button class="btn btn-primary" onclick="makeGuess()">Probar</button>
            </div>
            <p class="hint-text">Presiona Enter para probar</p>
        </div>

        <div id="history" class="history hidden">
            <h3>Números probados:</h3>
            <div id="historyNumbers" class="history-numbers"></div>
        </div>

        <button class="btn btn-secondary" onclick="startNewGame()">🔄 Nuevo Juego</button>

        <div id="victoryCard" class="victory-card hidden">
            <div class="victory-icon">🏆</div>
            <h2 class="victory-title">¡Victoria!</h2>
            <p class="victory-text">Has completado el juego con una puntuación de <strong id="finalScore">Excelente</strong></p>
        </div>
    </div>

    <script>
        let secretNumber = 0;
        let attempts = 0;
        let gameWon = false;
        let guessHistory = [];

        function generateSecretNumber() {
            return Math.floor(Math.random() * 20) + 1;
        }

        function startNewGame() {
            secretNumber = generateSecretNumber();
            attempts = 0;
            gameWon = false;
            guessHistory = [];
            
            document.getElementById('message').textContent = '¡Adivina el número secreto entre 1 y 20!';
            document.getElementById('message').className = 'message hint';
            document.getElementById('attempts').textContent = '0';
            document.getElementById('score').textContent = '---';
            document.getElementById('guessInput').value = '';
            document.getElementById('inputSection').classList.remove('hidden');
            document.getElementById('history').classList.add('hidden');
            document.getElementById('victoryCard').classList.add('hidden');
            document.getElementById('historyNumbers').innerHTML = '';
            
            document.getElementById('guessInput').focus();
        }

        function makeGuess() {
            const input = document.getElementById('guessInput');
            const guess = parseInt(input.value);
            
            if (isNaN(guess) || guess < 1 || guess > 20) {
                document.getElementById('message').textContent = 'Por favor, ingresa un número válido entre 1 y 20';
                document.getElementById('message').className = 'message hint';
                return;
            }

            attempts++;
            guessHistory.push(guess);
            
            document.getElementById('attempts').textContent = attempts;
            updateHistory();

            if (guess === secretNumber) {
                gameWon = true;
                document.getElementById('message').textContent = `🎉 ¡Felicidades! Adivinaste el número ${secretNumber} en ${attempts} intento${attempts === 1 ? '' : 's'}!`;
                document.getElementById('message').className = 'message success';
                document.getElementById('inputSection').classList.add('hidden');
                document.getElementById('victoryCard').classList.remove('hidden');
                
                const score = getScore();
                document.getElementById('score').textContent = score;
                document.getElementById('finalScore').textContent = score;
            } else if (guess < secretNumber) {
                document.getElementById('message').textContent = '📈 ¡Muy bajo! El número secreto es más alto';
                document.getElementById('message').className = 'message hint';
            } else {
                document.getElementById('message').textContent = '📉 ¡Muy alto! El número secreto es más bajo';
                document.getElementById('message').className = 'message hint';
            }

            input.value = '';
            input.focus();
        }

        function updateHistory() {
            const historyDiv = document.getElementById('history');
            const numbersDiv = document.getElementById('historyNumbers');
            
            historyDiv.classList.remove('hidden');
            numbersDiv.innerHTML = '';
            
            guessHistory.forEach(num => {
                const span = document.createElement('span');
                span.className = 'history-number';
                span.textContent = num;
                
                if (num === secretNumber && gameWon) {
                    span.classList.add('correct');
                } else if (num < secretNumber) {
                    span.classList.add('low');
                    span.textContent += ' ↗';
                } else {
                    span.classList.add('high');
                    span.textContent += ' ↘';
                }
                
                numbersDiv.appendChild(span);
            });
        }

        function getScore() {
            if (attempts <= 3) return 'Excelente';
            if (attempts <= 6) return 'Muy bien';
            if (attempts <= 10) return 'Bien';
            return 'Sigue intentando';
        }

        // Event listeners
        document.getElementById('guessInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !gameWon) {
                makeGuess();
            }
        });

        // Inicializar el juego
        startNewGame();
    </script>
</body>
</html>
