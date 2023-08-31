document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('registration-form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      var numberOfQuestions = document.getElementById('number-question').value;
      
      if (numberOfQuestions < 5) {
        alert("Please select at least 5 questions.");
        return;
      }
  
      var level = document.querySelector('input[name="level"]:checked').value;
      var questionCategory = document.querySelector('input[name="category"]:checked').value;

    

     fetch('https://opentdb.com/api.php?amount='+ numberOfQuestions + ' &category= ' + questionCategory + '&difficulty=' + level +'&type=' + 'multiple')
     .then(function(response) {
        console.log(response);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();

     })
     .then(function(data) {
        sessionStorage.setItem('quizQuestions', JSON.stringify(data.results));
        console.log(sessionStorage.getItem('quizQuestions'));

        
        // Navigate to the new page to display questions
        window.location.href = 'quiz-questions.html';
     })

     .catch(function(error) {
        displayError(error);
      });

    });
});


function displayError(error) {
    var questionElement = document.getElementById('error-block');
    console.log(questionElement)
    questionElement.innerHTML = '<p>Error: ' + error.message + '</p>';
    
}
