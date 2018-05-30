

$( document ).ready(function() {
  
  var topics= ["yoga", "travel", "gardening", "food", "beauty"];
  
  function displayTopicBtn(){
      for (var i = 0; i < topics.length; i++){
          var xgiphBtn = $("<button>");
          xgiphBtn.addClass("topic");
          xgiphBtn.addClass("btn btn-primary")
          xgiphBtn.attr("data-name", topics[i]);
          xgiphBtn.text(topics[i]);
          $("#giphViewerBtn").append(xgiphBtn);
      }
  }
 
  function btnAdder(){
      $("#giphAdder").on("click", function(event){
          event.preventDefault();
      var topic = $("#topic-input").val().trim();
      
      topics.push(topic);
  
      displayTopicBtn();
    
      });
  }

     
  

  function giphsDisplayer(){
      var topic = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=2iBz9H7q1PExSYHFHkxUbxW7gsgM1e8X&q=" 
      + topic + "&limit=10&rating=&&lang=en";
      console.log(queryURL); 
      $.ajax({
          url: queryURL,
          method: 'GET'
      })
      .then(function(response) {
          console.log(response); 
          $("#giphViewer").empty(); 
          var giphresults = response.data; 
          
          for (var i=0; i<giphresults.length; i++){
  
              var topicDiv = $("<div>"); 
              topicDiv.addClass("topicDiv");
            
              var giphtopicRating = $("<p>").text("Rating: " + giphresults[i].rating);
              topicDiv.append(giphtopicRating);
           
              var imageTag = $("<img>");
              imageTag.attr("src", giphresults[i].images.fixed_height_small_still.url); 
              imageTag.attr("data-still",giphresults[i].images.fixed_height_small_still.url); 
              imageTag.attr("data-animate",giphresults[i].images.fixed_height_small.url); 
              imageTag.attr("data-state", "still"); 
              imageTag.addClass("image");
              topicDiv.append(imageTag);
            
              $("#giphViewer").prepend(topicDiv);
          }
      });
  }

  displayTopicBtn(); 
  btnAdder();
  

  $(document).on("click", ".topic", giphsDisplayer);
  $(document).on("click", ".image", function(){
      var state = $(this).attr('data-state');
      if ( state == 'still'){
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
      }else{
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
      }
  });
  });
  