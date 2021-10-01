export default class UHeadlessClient {
  constructor (
    public token: string,
    public cdnUrl: string
  ) {}

  private getUrl (options: any): URL {
    const url = new URL(`${this.cdnUrl}/api${options.path || ''}`)

    // Set default
    url.searchParams.set('token', this.token)
    url.searchParams.set('depth', options?.depth || '6')
    url.searchParams.set('lang', options?.lang || 'en-us')

    if (options.path) {
      delete options['path']
    }

    for (const key in options) {
      url.searchParams.set(key, options[key])
    }

    return url
  }

  fetch (options: any = {},  method: string = 'GET', body: any = null) {
    const url = this.getUrl(options)

    return fetch(url.toString(), {
      method,
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined
    }).then(async res => {
      if (res.status > 299 || res.status < 200) {
        throw new Error(await res.text())
      }

      return res.json()
    })
  }

  query (query: any = {}, options: any = {}) {
    return this.fetch(options, 'POST', query)
  }
}
