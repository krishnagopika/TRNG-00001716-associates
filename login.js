 async function login(){
    
    event.preventDefault();

    const email=document.getElementById('loginemail').value;
    const password=document.getElementById('loginpassword').value;

    const loginData={
        email,
        password
    };


    try {
    const response = await fetch(`http://localhost:8081/users`);
    const data=await response.json();
    console.log(data);
    const matchedUser = data.find(users => users.email === email && users.password === password);
        if(matchedUser){
          //  return matchedUser;
            sessionStorage.setItem("user",JSON.stringify(matchedUser));
    
            // alert("Login Successful");
             sessionStorage.setItem("islogin","true");
             //sessionStorage.setItem("user",JSON.stringify(data));
     
             window.location.href='index.html';
        }
        

   
    else
    {
        alert('invalid login');
    }
}catch(error){
    console.error('Error',error);

    alert("please try again later");

}
    
 }



 
 



   
       
    


// async function login(){
//     try {
//         const data = await fetch(`http://localhost:8080/users`);
//         const users = await data.json();
    
//         console.log(users);
//     }
//     catch(error){
//         console.log(error);
//     }
// }
//

// async function login(event) {
//     try {
//       const response = await fetch('http://localhost:8080/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
  
//       if (response.ok) {
//         console.log('Login successful');
//       } else {
//         console.log('Login failed.');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
