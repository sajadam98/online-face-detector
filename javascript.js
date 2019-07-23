$(".text-center").hide();
var formdata = new FormData();

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $("#img_user").attr("src", e.target.result);
      $(".text-center").hide();

      $.ajax({
        type: "POST",
        url: "https://api-us.faceplusplus.com/facepp/v3/detect",
        cache: false,
        contentType: false,
        processData: false,
        data: formdata,
        success: function(result) {
            console.log(result);
            
          $("#txt_age").text(result.faces[0].attributes.age.value);
          $("#txt_gender").text(result.faces[0].attributes.gender.value);
          $("#txt_anger").text(result.faces[0].attributes.emotion.anger);
          $("#txt_disgust").text(result.faces[0].attributes.emotion.disgust);
          $("#txt_fear").text(result.faces[0].attributes.emotion.fear);
          $("#txt_happiness").text(result.faces[0].attributes.emotion.happiness);
          $("#txt_neutral").text(result.faces[0].attributes.emotion.neutral);
          $("#txt_sadness").text(result.faces[0].attributes.emotion.sadness);
          $("#txt_surprise").text(result.faces[0].attributes.emotion.surprise);
          $(".text-center").hide();
        }
      });
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$("#img_url").change(function() {
  $(".text-center").show();
  if ($(this).prop("files").length > 0) {
    file = $(this).prop("files")[0];
    formdata.append("image_file", file);
    formdata.append("api_key" , "5xRe8eehziNXwF8MAY4ZYO7vm5fx4XWL");
    formdata.append("api_secret" , "yN1E1dDm2sRl-Sud-Ywe14dgiT0jThaN");
    formdata.append("return_attributes" , "gender,age,smiling,emotion");
  }
  
  readURL(this);
});
