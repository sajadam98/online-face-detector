$(".text-center").hide();
var formdata = new FormData();
// $("#btn_detect").disabled = true;

// $("#img_url").change(function(){
//   $("#btn_detect").disabled = false;
// });

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $("#img_user").attr("src", e.target.result);
      $(".text-center").hide();
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$("#btn_detect").click(function(){
  
  $(".text-center").show();
  $.ajax({
        type: "POST",
        url: "https://api-us.faceplusplus.com/facepp/v3/detect",
        cache: false,
        contentType: false,
        processData: false,
        data: formdata,
        success: function(result) {
          var max = 0.0;
          var emotion = "";
          if(result.faces[0].attributes.emotion.anger > max){
            max = result.faces[0].attributes.emotion.anger;
            emotion = "angry";
          }
          if(result.faces[0].attributes.emotion.disgust > max){
            max = result.faces[0].attributes.emotion.disgust;
            emotion = "disgust";
          }
          if(result.faces[0].attributes.emotion.fear > max){
            max = result.faces[0].attributes.emotion.fear;
            emotion = "fear";
          }
          if(result.faces[0].attributes.emotion.happiness > max){
            max = result.faces[0].attributes.emotion.happiness;
            emotion = "happy";
          }
          if(result.faces[0].attributes.emotion.neutral > max){
            max = result.faces[0].attributes.emotion.neutral;
            emotion = "neutral";
          }
          if(result.faces[0].attributes.emotion.sadness > max){
            max = result.faces[0].attributes.emotion.sadness;
            emotion = "sad";
          }
          if(result.faces[0].attributes.emotion.surprise > max){
            max = result.faces[0].attributes.emotion.surprise;
            emotion = "surprise";
          }
          $("#txt_age").text(result.faces[0].attributes.age.value);
          $("#txt_gender").text(result.faces[0].attributes.gender.value);
          $("#txt_emotion").text(emotion);
          $(".text-center").hide();
        }
      });
});

$("#img_url").change(function() {
  $(".text-center").show();
  if ($(this).prop("files").length > 0) {
    file = $("#img_url").prop("files")[0];
    formdata.append("image_file", file);
    formdata.append("api_key" , "5xRe8eehziNXwF8MAY4ZYO7vm5fx4XWL");
    formdata.append("api_secret" , "yN1E1dDm2sRl-Sud-Ywe14dgiT0jThaN");
    formdata.append("return_attributes" , "gender,age,smiling,emotion");
  }
  
  readURL(this);
});
