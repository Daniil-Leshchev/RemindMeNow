import { ScheduleData } from '@/app/(user)';
import moment from 'moment';
import 'moment/locale/ru';
export const parseICS = (icsString: string) => {
  const lines = icsString.split('\n');
  const events = [];

  let event: ScheduleData = {
    start: null,
    end: null,
    location: null,
    title: null,
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === 'BEGIN:VEVENT') {
        event = {
        start: null,
        end: null,
        location: null,
        title: null,
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
          event['location'] = value;
      }

      if (dateMatch) {
        const [_, key, value] = dateMatch;
        if (key === 'DTSTART')
          event['start'] = moment(value).utc().format('YYYY-MM-DD HH:mm');
        else
          event['end'] = moment(value).utc().format('YYYY-MM-DD HH:mm');
      }
    }
  }

  return events;
}