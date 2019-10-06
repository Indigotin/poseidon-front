import {AUTH_SERVICE_URL} from '../constants/Constants';
export async function fetchToken(user) {
    return await fetch(`${AUTH_SERVICE_URL}`, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    }).then(response => {
      if (response.ok) {
        //let token = response.headers.get('Authorization');
        //let curUser = response.json().data;
        //alert(curUser);
        //let curUser = response.headers.get('cur');
        //localStorage.setItem('token', token);
        //localStorage.setItem('curUser', curUser);
        return response.json();
      } else {
        console.log('user login failed');
        return response.error();
      }
      return response.ok;
    }).catch(error => {
      console.error(error);
    });
}

