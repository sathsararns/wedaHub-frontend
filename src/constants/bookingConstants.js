export const TIME_SLOTS = [
  '08:00 – 10:00',
  '10:00 – 12:00',
  '13:00 – 15:00',
  '15:00 – 17:00',
]

export function getAvailableDates() {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return Array.from({ length: 6 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return fmt.format(d)
  })
}

export const AVAILABLE_DATES = getAvailableDates()