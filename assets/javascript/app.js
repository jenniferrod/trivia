var panel = $("#quiz-area");
var countStartNumber = 30;

// Questions
var questions = [
    // q1
    {
        question: "Name the capital city of Westeros' Seven Kingdoms and the seat of the Iron Throne?",
        answerChoices: ["Mereen", "Free Cities", "Astapor", "King's Landing"],
        correctAnswer: "King's Landing",
        image: "assets/images/ironethrone.gif"
    },
    // q2
    {
        question: "Jaime Lannister is known as the King Slayer - Which king did he kill?",
        answerChoices: ["Robert Baratheon", "Balon Greyjoy", "Aerys Targaryen", "Robb Stark"],
        correctAnswer: "Aerys Targaryen",
        image: "assets/images/jaimelannister.gif"

    },
    // q3
    {
        question: "In which battle did Jon Snow and Sansa Stark retake Winterfell from Lord Ramsey Bolton?",
        answerChoices: ["Battle of the Bastards", "Battle of the Blackwater", "The Massacre at Hardhome", "Battle of Castle Black"],
        correctAnswer: "Battle of the Bastards",
        image: "assets/images/battle.gif"
    },
    // q4
    {
        question: "What is the name of Rickon Stark's direwolf?",
        answerChoices: ["Ghost", "Nymeria", "Shaggy Dog", "Grey Wind"],
        correctAnswer: "Shaggy Dog",
        image: "assets/images/shaggydog.gif"

    },
    // q5
    {
        question: "All men must ____.",
        answerChoices: ["fight", "die", "love", "live"],
        correctAnswer: "die",
        image: "assets/images/allmenmustdie.gif"
    },
    // q6
    {
        question: "In which city does Arya Stark train to become a Faceless Man?",
        answerChoices: ["Pentos", "Mereen", "Braavos", "Astapor"],
        correctAnswer: "Braavos",
        image: "assets/images/valarmorghulis.gif"
    },
    // q7
    {
        question: "Who was Margaery Tyrell's first husband?",
        answerChoices: ["Joffrey Baratheon", "Renly Baratheon", "Stannis Baratheon", "Tommen Baratheon"],
        correctAnswer: "Renly Baratheon",
        image: "assets/images/renlybaratheon.gif"
    },
    // q8 
    {
        question: "At the infamous Red Wedding, who delivered the fatal blow to King in the North, Robb Stark?",
        answerChoices: ["Roose Bolton", "Walder Frey", "Ramsay Bolton", "Alliser Thorne"],
        correctAnswer: "Roose Bolton",
        image: "assets/images/roosebolton.gif"
    },
    // q9
    {
        question: "Who was responsible for the poisoning of King Joffrey Baratheon?",
        answerChoices: ["Tyrion Lannister", "Sansa Stark", "Varys", "Olenna Tyrell"],
        correctAnswer: "Olenna Tyrell",
        image: "assets/images/olennatyrell.gif"
    },
    // q10
    {
        question: "Which of the following god(s) are worshiped by the High Sparrow and his followers?",
        answerChoices: ["The Lord of the Light", "The Old Gods", "The New Gods", "The Faith of the Seven"],
        correctAnswer: "The Faith of the Seven",
        image: "assets/images/shame.gif"
    }
];

// Game
var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.counter--;
        $("#counter-number").text(game.counter);
        if (game.counter === 0) {
            console.log("Time Up!");
            game.timeUp();
        }
    },

    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);

        panel.html("<h2 class='flow-text'>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answerChoices.length; i++) {
            panel.append("<button class='answer-button waves-effect waves-light btn-small' id='button' data-name='" + questions[this.currentQuestion].answerChoices[i] + "'>" + questions[this.currentQuestion].answerChoices[i] + "</button><br>");
        }
    },

    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counter-number").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        
        clearInterval(timer);

        $("#counter-number").html(game.counter);

        panel.html("<h2 class='flow-text'>Out of Time!</h2>");
        panel.append("<h3 class='flow-text'>The correct answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img class='responsive-img' src='" + questions[this.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length -1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function() {

        clearInterval(timer);

        panel.html("<h2 class='flow-text'>Okay - here's how you did!</h2>");

        $("#counter-number").text(game.counter);

        panel.append("<h3 class='flow-text resultMsg'>Correct Answers: " + game.correct + "</h3>");
        panel.append("<h3 class='flow-text resultMsg'>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3 class='flow-text resultMsg'>Unanswered: " + (questions.length - (game.correct + game.incorrect)) + "</h3>");
        panel.append("<br><button class='waves-effect waves-light btn-small' id='start-over'>Try Again</button>");
    },

    clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function() {
        
        game.incorrect++;

        clearInterval(timer);

        panel.html("<h2 class='flow-text'>Whoops! That's incorrect</h2>");
        panel.append("<h3 class='flow-text'> The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img class='responsive-img' src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    answeredCorrectly: function() {
        
        game.correct++;

        clearInterval(timer);

        panel.html("<h2 class='flow-text'>Correct!</h2>");
        panel.append("<img class='responsive-img' src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

// Click Events

$(document).on("click", "#start-over", function() {
    game.reset();
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
});

$("#start").click(function() {
    $("a").hide();
    $("#sub-wrapper").show();
});

$(document).on("click", "#sub-wrapper", function() {
    $("#sub-wrapper").show();
});


$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2 id='countdown'>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
});