

export default function Fetch(requestOptions: RequestInit,username:string){
  

    fetch(`https://individualproject-309823.ey.r.appspot.com/rest/register/v1/${username}`, requestOptions)
    .then(response => console.log(response.text()))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  


}