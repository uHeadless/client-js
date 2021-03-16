export default class UHeadlessRestClient {
  constructor (
    public token: string,
    public cdnUrl: string
  ) {}

  private getUrl (options: any): URL {
    const url = new URL(`${this.cdnUrl}/api`)

    // Set default
    url.searchParams.set('token', this.token)
    url.searchParams.set('depth', '6')
    url.searchParams.set('lang', 'en-us')

    for (const key in options) {
      url.searchParams.set(key, options[key])
    }

    return url
  }

  fetch (options: any = {}) {
    const url = this.getUrl(options)

    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    }).then(async res => {
      if (res.status > 299 || res.status < 200) {
        throw new Error(await res.text())
      }

      return res.json()
    })
  }
}
