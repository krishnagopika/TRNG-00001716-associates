function signup(){
document.getElementById('registrationForm').addEventListener('submit',function(event){
    event.preventDefault();

    const name=document.getElementById('rname').value;
    const email=document.getElementById('remail').value;
    const password=document.getElementById('rpassword').value;
    const confirmpassword=document.getElementById('rpassword').value;
    
    const age=document.getElementById('rAge').value;
    const interestednews=document.getElementById('rInterested').value.split(',').map(inews => inews.trim());
    const address=document.getElementById('rAddress').value;

    const user={
        name: name,
        email:email,
        password:password,
        password:confirmpassword,
        age:age,
        interestednews:interestednews,
        address:address
    };

    fetch("http://localhost:8081/users",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })

    .then(response => response.json())
    .then(responseUser => {
        console.log('Registration Successful');
        window.location.href='./login.html';

    });

});
}