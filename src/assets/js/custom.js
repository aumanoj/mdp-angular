function login(){
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  if(username.value.trim() ==""){
    //alert("Blank Username");
    //username.style.border="solid 1px red";
    return false;
  }
  // else if(username.value.trim().length<4){
  //   alert("Username is too short");
  //   username.style.border="solid 1px red";
  //   return false;
  // }
   else if(password.value.trim() ==""){
    //username.style.border="solid 1px green";
    //alert("Blank Password");
   // password.style.border="solid 1px red";
    return false;
  }
  // else if(password.value.trim().length<5){
  //   alert("Password is too short");
  //   password.style.border="solid 1px red";
  //   return false;
  // }
  else{
    alert("Logged in successfully!");
    return true;
  }
}


function register(){
  var username = document.getElementById("username");
  var useremail = document.getElementById("useremail");
  var password = document.getElementById("password");
  var conf_password = document.getElementById("conf_password");
  var m_number = document.getElementById("m_number");
  var invalidCheck = document.getElementById("invalidCheck");

  if(username.value.trim() ==""){
    //username.style.border="solid 1px red";
    return false;
  }
  else if(useremail.value.trim() ==""){
    return false;
  }

  else if(password.value.trim() != conf_password.value.trim()){
    alert("Password value should be the same");
    //username.style.border="solid 1px red";
    return false;
  }

  else if(m_number.value.trim() ==""){
    return false;
  }

else if(username.value.trim()!=null && useremail.value.trim()!=null && password.value.trim()!=null && m_number.value.trim()!=null && invalidCheck.value.trim()!=null){

      //alert("You are registered successfully!");
    return true;
  }

}
