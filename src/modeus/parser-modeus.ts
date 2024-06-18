import { ScheduleData } from '@/app/(user)/schedule/main';
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
      const match = /^(LOCATION|SUMMARY):(.*)$/.exec(line);
      const dateMatch = /^(DTSTART|DTEND).*:(.*)$/.exec(line);

      if (match) {
        const [_, key, value] = match;
        if (key === 'SUMMARY')
          event['title'] = value;
        else
          event['location'] = value;
      }

      if (dateMatch) {
        const fullFormat = 'YYYY-MM-DD HH:mm';
        const [_, key, value] = dateMatch;
        if (key === 'DTSTART')
          event['start'] = moment(value).utc().format(fullFormat);
        else
          event['end'] = moment(value).utc().format(fullFormat);
      }
    }
  }

  return events;
}