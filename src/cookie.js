function getCookie(cookieName) {
  const name = cookieName + '='
  if (typeof window !== 'undefined') {
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
  }
  return null
}

function setCookie(name, value, expireIn, domain) {
  if (!!domain) {
    document.cookie = `${name}=${value};domain=${domain};path=/;max-age=${expireIn}`
    return
  }
  document.cookie = `${name}=${value};path=/;max-age=${expireIn}`
  return
}

export default { getCookie, setCookie }
