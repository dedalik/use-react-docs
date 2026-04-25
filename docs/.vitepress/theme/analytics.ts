/** GA4 measurement ID - keep in sync with cookie / consent flow only (no SSG injection). */
export const GA_MEASUREMENT_ID = 'G-FBEWF72TFF'

const STORAGE_KEY = 'usereact-cookie-consent'

export type StoredConsent = 'granted' | 'denied'

export function readStoredConsent(): StoredConsent | null {
  if (typeof localStorage === 'undefined') return null
  const v = localStorage.getItem(STORAGE_KEY)
  if (v === 'granted' || v === 'denied') return v
  return null
}

export function writeStoredConsent(value: StoredConsent): void {
  localStorage.setItem(STORAGE_KEY, value)
}

type GtagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

let gaLoadStarted = false

/** Loads gtag.js and sends the config event once (idempotent). */
export function loadGoogleAnalytics(): void {
  if (typeof document === 'undefined') return
  if (document.querySelector('script[data-usereact-ga]')) return
  if (gaLoadStarted) return
  gaLoadStarted = true

  const w = window as GtagWindow
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.setAttribute('data-usereact-ga', '1')
  script.onload = () => {
    w.gtag!('js', new Date())
    w.gtag!('config', GA_MEASUREMENT_ID)
  }
  document.head.appendChild(script)
}

export function applyConsentFromStorage(): void {
  if (typeof window === 'undefined') return
  if (readStoredConsent() === 'granted') loadGoogleAnalytics()
}
