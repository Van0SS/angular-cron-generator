const DAY_LOOKUPS = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT'
];
const MONTH_LOOKUPS =[
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

export class CronGeneratorService {
  constructor() {
    'ngInject';
  }

	getCronString(o, allowMultiple){
    let cron = ["*", "*",  "*",  "*", "?"],
    count = parseInt(o.base);
    if (count <= 1) {
      cron[0] = o.minutes ? "*/"+o.minutes : "*";
    } else if(count >= 1){
        cron[0] = o.minutes ? o.minutes : "*";
    }
    if (count <= 2) {
      cron[1] = typeof o.hours !== "undefined" ? "*/"+o.hours : "*";
    } else if(count >= 2){
      cron[1] = typeof o.hours !== "undefined" ? o.hours : "*";
    }
    if (count >= 3){
        cron[2] = typeof o.daysOfMonth !== "undefined" ? o.daysOfMonth : "*";
    }
    if (count >= 4){
      if (o.days){
          cron[2] = "?";
      }
      if (o.days) {
        if (allowMultiple) {
          let str=[];
          angular.forEach(o.days, function(idx) {
              str.push(DAY_LOOKUPS[idx-1]);
          });
          cron[4] = str.join();
        } else {
          cron[4] = DAY_LOOKUPS[o.days-1];
        }
      } else {
        cron[4] = "?";
      }
    }
    if (count >= 5) {
			if (o.months) {
			  if (allowMultiple) {
		      let str=[];
		      angular.forEach(o.months, function(idx){
		          str.push(MONTH_LOOKUPS[idx-1]);
		      });
		      cron[3] = str.join();
			  } else {
			    cron[3] = MONTH_LOOKUPS[o.months-1];
			  }
			} else {
			  cron[3] = "*";
			}
    }
    return cron.join(" ");
	}
}