
document.addEventListener("DOMContentLoaded",function(){
    var user=JSON.parse(sessionStorage.getItem("user"));

    console.log(user);

if(user){
    document.getElementById("vname").textContent=user.name;
    document.getElementById("vemail").textContent=user.email;
    document.getElementById("vage").textContent=user.age;
   
    document.getElementById("vaddress").textContent=user.address;
    document.getElementById("vinews").textContent=user.interestednews;
}

var deleteButton=document.getElementById("deleteButton");
deleteButton.addEventListener("click",function(){
    var id=user.id;
    fetch("http://localhost:8081/users/" +id,{
        method: "DELETE",
    })
    .then(function(response){
        if(response.ok){
            sessionStorage.clear();
           // alert("deleted successfully");
            window.location.href="login.html";
        }
        else{
            throw new Error("User is not deleted");
        }
    })
    .catch(function (error){
        console.log(error);
        alert("error to delete");
    });

  });

    document.getElementById('rname').value=user.name;
    document.getElementById('remail').value=user.email;
    document.getElementById('rpassword').value=user.password;
    document.getElementById('rAge').value=user.age;
    document.getElementById('rInterested').value=user.interestednews;
    document.getElementById('rAddress').value=user.address;

    var saveButton=document.getElementById("saveButton");

    saveButton.addEventListener("click",function(){
       // var id=user.id;
        var uname=document.getElementById('rname').value;
    var uemail=document.getElementById('remail').value;
    var upassword=document.getElementById('rpassword').value;
    var uage=document.getElementById('rAge').value;
    var uinterestednews=document.getElementById('rInterested').value;
    var uaddress=document.getElementById('rAddress').value;

    var updateUser=Object.assign({},user);

    // const user={
    //     name: name,
    //     email:email,
    //     password:password,
    //     age:age,
    //     interestednews:interestednews,
    //     address:address
    // };
    updateUser.name=uname;
    updateUser.email=uemail;
    updateUser.password=upassword;
    updateUser.age=uage;
    updateUser.interestednews=uinterestednews;
    updateUser.address=uaddress;
        fetch("http://localhost:8081/users/" +user.id,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updateUser),
        })
        .then(function(response){
          if(response.ok){
            return response.json();

          }
          else{
            alert("update failed");
          }
        }).then(function(responseUser){
          user=responseUser;
          aleret("updated sucess");
          document.getElementById("rname").textContent=user.name;
          document.getElementById("remail").textContent=user.email;
          document.getElementById("rpassword").textContent=user.password;
          document.getElementById("rAge").textContent=user.age;
          document.getElementById("rInterested").textContent=user.interestednews;
          document.getElementById("rAddress").textContent=user.address;

          // document.getElementById("rname").value="";
          // document.getElementById("remail").value="";
          // document.getElementById("rpassword").value="";
          // document.getElementById("rAge").value="";
          // document.getElementById("rInterested").value="";
          // document.getElementById("rAddress").value="";

        }).catch(function(error){
          console.log(error);
        })
        
    });



   
  
});


function resetPassword(event) {
    event.preventDefault(); 
  
    const currentPassword = document.getElementById('rpassword').value;
    const newPassword = document.getElementById('rnewpassword').value;
  
    const userId = "user1"; 
  
    
    const resetData = {
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    };
  
    
    fetch('http://localhost:8081/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resetData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Password reset successfully.');
          
          const modal = document.getElementById('exampleModal1');
          const modalBootstrap = bootstrap.Modal.getInstance(modal);
          modalBootstrap.hide();
          
          document.getElementById('resetForm').reset();
        } else {
          console.log('Failed to reset password.');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
 
  const resetForm = document.getElementById('resetForm');
  resetForm.addEventListener('submit', resetPassword);
  
  


  

  
  
  
