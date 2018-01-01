export function showSigninPopup() {
  return {
    type: 'OPEN_POPUP_SIGNIN'
  }
}

export function showSignupPopup() {
  return {
    type: 'OPEN_POPUP_SIGNUP'
  }
}

export function closePopup() {
  return {
    type: 'CLOSE_POPUP'
  }
}
