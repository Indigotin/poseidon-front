import {REGISTER_URL} from '../constants/Constants';

export async function fetchRegister(user) {
    return await fetch(`${REGISTER_URL}`, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    }).then(response => {
      if (!response.ok) {
        console.log('user login failed');
      }
      return response.ok;
    }).catch(error => {
      console.error(error);
    });
}

