import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from '../web-api';
import {errorHandler} from '../utility/utility';
import {sanitize} from '../sanitize-login';

@inject(WebAPI, Router)
export class Login {
  constructor(api, router) {
    this.user = "";
    this.pass = "";
    this.api = api;
    this.router = router;

    document.getElementsByTagName("BODY")[0].style.backgroundImage = "url(https://i.imgur.com/bh2ywHi.jpg)";
  }

  attached() {
    document.addEventListener("keyup", this.handleEnter);
    document.addEventListener("keypress", this.handleCapsLock);
    document.getElementById("username").focus();
  }

  detached() {
    document.removeEventListener("keyup", this.handleEnter);
    document.removeEventListener("keypress", this.handleCapsLock);
  }

  async submit() {
    try {
      const cleanUsername = sanitize(this.user, "username", "error-text", 6, 32);
      if (!cleanUsername) return;

      const cleanPassword = sanitize(this.pass, "password", "error-text", 8, 18);
      if (!cleanPassword) return;
      
      await this.api.logIn(cleanUsername, cleanPassword);
    } catch (err) {
      return errorHandler({err: err, context: 'submit', isLast: true});
    }
  }

  register() {
    this.router.navigateToRoute('register');
  }

  //Allows the user to hit enter to submit the form
  handleEnter() {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit-button").click();
    }
  }

  //Informs the user when capslock is on.
  handleCapsLock(event) {
    event = event || window.event;
    const char = String.fromCharCode(event.keyCode || event.which);

    if (char.toUpperCase() === char && char.toLowerCase() !== char && !event.shiftKey) {
      document.getElementById("error-text").innerHTML = "Caps Lock is on.";
    }else{
      document.getElementById("error-text").innerHTML = "";
    }
  }
}
