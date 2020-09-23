export default {
  getCurrentAge: (date) => {
    let d = date.split('.');
    if( typeof d[2] !== "undefined" ) {
        date = d[2]+'.'+d[1]+'.'+d[0];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    return 0;
  },
  getUnixDate(date) {
    let d = date.split('.');
    if( typeof d[2] !== "undefined" ) {
        date = d[2]+'.'+d[1]+'.'+d[0];
        return new Date(date);
    }
    return 0;
  },
  today: () => {
    let d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
      return [day, month, year].join('.');
  },
}

