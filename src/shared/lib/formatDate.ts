import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/ru'

dayjs.extend(relativeTime)
dayjs.locale(locale)

export function formatDate(dateISO: Date | string) {
	return dayjs().to(dayjs(dateISO))
}
