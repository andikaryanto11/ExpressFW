class DateFormat {

     static getFormattedCurrentDate(format = [], seprator = "_") {
          function formated(m) {
               let t = new Date();
               let f = new Intl.DateTimeFormat('en', m);
               return f.format(t);
          }

          let newFormat = [];
          if(newFormat.length == 0)
               newFormat = [{year: 'numeric'}, {month: 'short'}, {day: 'numeric'}];
          else 
               newFormat  = format;

          return newFormat.map(formated).join(seprator);
     }
}

export default DateFormat;