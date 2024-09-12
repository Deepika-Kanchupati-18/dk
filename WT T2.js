const playersTeamA = [
    { name: "Rohit Sharma", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Shubman Gill", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Virat Kohli", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "KL Rahul", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Suryakumar Yadav", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Hardik Pandya", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Ravindra Jadeja", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Shardul Thakur", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Jasprit Bumrah", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Mohammed Shami", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Yuzvendra Chahal", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 }
];

const playersTeamB = [
    { name: "David Warner", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Travis Head", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Steve Smith", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Mitchell Marsh", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out" },
    { name: "Glenn Maxwell", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Mitchell Starc", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Josh Hazlewood", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Pat Cummins", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Adam Zampa", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Marcus Stoinis", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 },
    { name: "Cameron Green", runs: 0, balls: 0, fours: 0, sixes: 0, status: "Not Out", overs: 0, maidens: 0, wickets: 0, runsGiven: 0 }
];

let currentTeam = 'A'; // Start with Team A (India) batting
let currentBatsmanIndex = 0;
let totalScoreTeamA = 0;
let totalScoreTeamB = 0;
let totalWickets = 0;
let totalBalls = 0;
let overs = 0;
let maxOvers = 20;

// Track the current bowler and selected bowlers
let currentBowlerIndex = 0;
let selectedBowlers = [];

// Function to select the last 5 players as bowlers
function selectBowlers(team) {
    return team.slice(-5);
}

function loadPlayerData() {
    let teamHtml = "";
    let currentTeamPlayers = currentTeam === 'A' ? playersTeamA : playersTeamB;
    let teamName = currentTeam === 'A' ? "India" : "Australia";

    document.getElementById("batting-team-name").textContent = `Team ${teamName} Batsmen`;

    currentTeamPlayers.forEach((player, index) => {
        teamHtml += `<tr id="player${index}">
            <td class="player-name">${player.name}</td>
            <td>${player.runs}</td>
            <td>${player.balls}</td>
            <td>${player.fours}</td>
            <td>${player.sixes}</td>
            <td>${player.status}</td>
        </tr>`;
    });

    document.getElementById("batting-team").innerHTML = teamHtml;

    // Load selected bowlers
    let bowlingTeamPlayers = currentTeam === 'A' ? playersTeamB : playersTeamA;
    let bowlingTeamName = currentTeam === 'A' ? "Australia" : "India";
    document.getElementById("bowling-team-name").textContent = `Team ${bowlingTeamName} Bowlers`;

    let bowlingHtml = "";
    selectedBowlers = selectBowlers(bowlingTeamPlayers);
    selectedBowlers.forEach((bowler, index) => {
        bowlingHtml += `<tr id="bowler${index}">
            <td class="player-name">${bowler.name}</td>
            <td>${bowler.overs.toFixed(1)}</td>
            <td>${bowler.maidens}</td>
            <td>${bowler.wickets}</td>
            <td>${bowler.runsGiven}</td>
        </tr>`;
    });

    document.getElementById("bowling-team").innerHTML = bowlingHtml;
}

function updateCommentary(over, ball, commentaryText) {
    const commentaryDiv = document.getElementById('live-commentary');
    commentaryDiv.innerHTML = `<strong>Over ${over}.${ball}:</strong> ${commentaryText}<br>` + commentaryDiv.innerHTML;
}

function simulateBall() {
    if (totalWickets >= 10 || overs >= maxOvers) {
        if (currentTeam === 'A') {
            switchInnings();
            return;
        } else {
            endMatch();
            return;
        }
    }

    let currentPlayers = currentTeam === 'A' ? playersTeamA : playersTeamB;
    const currentBowler = selectedBowlers[currentBowlerIndex];

    let runs = Math.floor(Math.random() * 7); // Random runs [0-6]
    let ballOutcome = "";
    let runsThisOver = 0;

    if (runs === 0) {
        ballOutcome = "Dot ball. Good length delivery.";
    } else if (runs === 4) {
        ballOutcome = "CRACK! Perfectly timed FOURRR through covers!";
        currentPlayers[currentBatsmanIndex].fours++;
        runsThisOver += 4;
    } else if (runs === 6) {
        ballOutcome = "BOOM! Massive SIXX over long-on!";
        currentPlayers[currentBatsmanIndex].sixes++;
        runsThisOver += 6;
    } else if (Math.random() < 0.1) { // 10% chance of getting out
        ballOutcome = "OUT!";
        currentPlayers[currentBatsmanIndex].status = "Out";
        totalWickets++;
        currentBatsmanIndex++;
        if (totalWickets < 10) {
            ballOutcome += " New batsman in.";
        }
    } else {
        ballOutcome = `${runs} run(s)`;
        runsThisOver += runs;
    }

    if (ballOutcome !== "OUT!") {
        currentPlayers[currentBatsmanIndex].runs += runs;
        if (currentTeam === 'A') {
            totalScoreTeamA += runs;
        } else {
            totalScoreTeamB += runs;
        }
    }

    currentPlayers[currentBatsmanIndex].balls++;
    currentBowler.runsGiven += runsThisOver;

    totalBalls++;
    if (totalBalls % 6 === 0) {
        overs++;
        currentBowler.overs++;
        if (runsThisOver === 0) currentBowler.maidens++;

        currentBowlerIndex = (currentBowlerIndex + 1) % selectedBowlers.length;
    }

    updateScore();
    updateCommentary(overs, totalBalls % 6, ballOutcome);
}

function updateScore() {
    const scoreElement = document.getElementById('team-score');
    const oversElement = document.getElementById('overs');
    let score = currentTeam === 'A' ? totalScoreTeamA : totalScoreTeamB;
    let teamName = currentTeam === 'A' ? "India" : "Australia";

    scoreElement.textContent = `Team ${teamName} Score: ${score}/${totalWickets}`;
    oversElement.textContent = `${overs}.${totalBalls % 6}`;
    loadPlayerData();
}

function switchInnings() {
    alert("Innings over! Switching teams.");
    currentTeam = currentTeam === 'A' ? 'B' : 'A'; // Switch teams
    currentBatsmanIndex = 0;
    totalWickets = 0;
    totalBalls = 0;
    overs = 0;
    currentBowlerIndex = 0;

    loadPlayerData();
    updateScore();
}

function endMatch() {
    if (totalScoreTeamB > totalScoreTeamA) {
        alert(`Australia wins by ${10 - totalWickets} wickets!`);
    } else if (totalScoreTeamB < totalScoreTeamA) {
        alert(`India wins by ${totalScoreTeamA - totalScoreTeamB} runs!`);
    } else {
        alert("It's a tie!");
    }
}

function startMatch() {
    loadPlayerData(); // Initial load
    setInterval(simulateBall, 2000);
}

startMatch();