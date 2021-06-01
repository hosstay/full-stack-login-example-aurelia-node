import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserApi} from '../api/user';
import {sanitizeLogin} from '../utility/security';

@inject(UserApi, Router)
export class Login {
  constructor(api, router) {
    this.user = '';
    this.pass = '';
    this.api = api;
    this.router = router;

    // document.getElementsByTagName('BODY')[0].style.backgroundImage = 'url(./healthy.jpg)';
  }

  attached() {
    document.addEventListener('keyup', this.handleEnter);
    document.addEventListener('keypress', this.handleCapsLock);
    document.getElementById('username').focus();
  }

  detached() {
    document.removeEventListener('keyup', this.handleEnter);
    document.removeEventListener('keypress', this.handleCapsLock);
  }

  async submit() {
    try {
      const cleanUsername = sanitizeLogin(this.user, 'username', 6, 32);
      const cleanPassword = sanitizeLogin(this.pass, 'password', 8, 18);

      await this.api.logIn(cleanUsername, cleanPassword);
    } catch (err) {
      console.log(err);
      document.getElementById('error-text').innerHTML = err.message;
    }
  }

  register() {
    this.router.navigateToRoute('register');
  }

  // Allows the user to hit enter to submit the form
  handleEnter() {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('submit-button').click();
    }
  }

  // Informs the user when capslock is on.
  handleCapsLock(event) {
    event = event || window.event;
    const char = String.fromCharCode(event.keyCode || event.which);

    if (char.toUpperCase() === char && char.toLowerCase() !== char && !event.shiftKey) {
      document.getElementById('error-text').innerHTML = 'Caps Lock is on.';
    } else {
      document.getElementById('error-text').innerHTML = '';
    }
  }
}