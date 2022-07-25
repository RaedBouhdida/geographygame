var QUIZ_ANSWERS = ['Afghanistan', 'Albania', 'Algeria', 'Andorra','Angola','Antigua and Barbuda','Argentina',
'Armenia','Australia','Austria','Azerbaijan','The Bahamas','Bahrain','Bangladesh','Barbados',
'Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana',
'Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada',
'Central African Republic', 'car', 'Chad','Chile','China','Colombia','Comoros','Congo', 
'Democratic Republic of the Congo', 'drc','Costa Rica','Côte d’Ivoire','Croatia','Cuba','Cyprus',
'Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','East Timor', 'Timor-Leste',
'Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia',
'Fiji','Finland','France','Gabon','The Gambia','Georgia','Germany','Ghana','Greece','Grenada',
'Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India',
'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan',
'Kenya','Kiribati','North Korea','South Korea','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia',
'Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar',
'Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius',
'Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique',
'Myanmar', 'Burma','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger',
'Nigeria','North Macedonia','Norway','Oman','Pakistan', 'Palau', 'Panama', 'Papua New Guinea',
'Paraguay','Peru', 'Philippines','Poland', 'Portugal','Qatar','Romania','Russia','Rwanda',
'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino',
'Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore',
'Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','Spain','Sri Lanka','Sudan',
'Sudan, South','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania',
'Thailand','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu',
'Uganda','Ukraine','United Arab Emirates', 'uae', 'United Kingdom', 'uk','United States', 'usa', 'us', 
'Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe']

var QUIZ_TIME_LIMIT = 5;
var timeInterval;
var answers;
var timeRemaining;
var score;

$(function () {
  $('.time-limit').text(QUIZ_TIME_LIMIT + ' ' + (QUIZ_TIME_LIMIT === 1 ? 'minute' : 'minutes'));  
  $('.start-quone').on('click', startQuiz);
  $('.input').on('input', checkInput);
});

function startQuiz() {
  initAnswers();
  timeRemaining = Math.round(QUIZ_TIME_LIMIT * 60);
  score = 0;
  $('.time-remaining').text(getTimeString());
  $('.score').text(score);
  $('.total').text(QUIZ_ANSWERS.length);
  $('.start-quone').hide();
  $('.started').show();
  $('.input').focus();
  $('.question').hide();
  $('.pone').hide();
  timeInterval = setInterval(reduceTime, 1000);
}

function initAnswers() {
  answers = {};
  QUIZ_ANSWERS.forEach(function(item) {
    var answer = item.trim().toLowerCase()
    answers[answer] = false;
  });
}

function reduceTime() {
  timeRemaining--;
  if (timeRemaining === 0) {
    endQuiz();
  } else {
    $('.time-remaining').text(getTimeString());
  }
}

function checkInput(event) {
  var input = event.currentTarget.value.trim().toLowerCase();
  if (answers.hasOwnProperty(input) && !answers[input]) {
    answers[input] = true;
    score++;
    $('.score').text(score);
    $('.scored-answers').prepend(createAnswerItem(input));    
    $('.input').val('');
    if (score === QUIZ_ANSWERS.length) {
      endQuiz();
    }
  }
}

function endQuiz() {
  clearTimeout(timeInterval);
  $('.input').prop('disabled', true);
  var percent = Math.round(score / QUIZ_ANSWERS.length * 100);
  $('.percent').text(percent);
  $('.status-timer, .status-current-score').hide();
  $('.status-final-results').show();
  $('.footnote').show();
  if (score === QUIZ_ANSWERS.length) {
    $('.end-greeting').text('Perfect, with ' + getTimeString() + ' remaining!');
  } else if (score > 0) {
    $('.end-greeting').text('Time\'s up!');
    $('.status-toggle-answers').show();
  } else {
    $('.end-greeting').text('Nothing...');
    $('.scored-answers').hide();
  }
}

function createAnswerItem(answer) {
  return $('<li>', { text: answer });
}

function getTimeString() {
  if (timeRemaining <= 0) {
    return '0:00';
  } else {
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }
}
