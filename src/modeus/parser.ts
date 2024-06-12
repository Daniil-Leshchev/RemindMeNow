import { ScheduleData } from '@/app/(user)';
import moment from 'moment';
import 'moment/locale/ru';
export const parseICS = (icsString: string) => {
  const lines = icsString.split('\n');
  const events = [];

  let event: ScheduleData = {
    start: undefined,
    end: undefined,
    location: undefined,
    title: undefined,
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === 'BEGIN:VEVENT') {
        event = {
        start: undefined,
        end: undefined,
        location: undefined,
        title: undefined,
      };
    }
    else if (line === 'END:VEVENT')
      events.push(event);
    else if (event) {
      const match = /^(LOCATION|CATEGORIES):(.*)$/.exec(line);
      const dateMatch = /^(DTSTART|DTEND).*:(.*)$/.exec(line);

      if (match) {
        const [_, key, value] = match;
        if (key === 'CATEGORIES')
          event['title'] = value;
        else
          event[key.toLowerCase()] = value;
      }

      if (dateMatch) {
        const [_, key, value] = dateMatch;
        event[key.substring(2).toLowerCase()] = moment(value).format('YYYY-MM-DD HH:mm');
      }
    }
  }

  return events;
}