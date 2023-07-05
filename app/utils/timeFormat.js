function timeFormat(date) {
    let time = new Date();
    let dd = String(time.getDate()).padStart(2, '0');
    let mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = time.getFullYear();
  
    const timeRender = `${dd}/${mm}/${yyyy}`
  
    return timeRender;
  }
  
  module.exports = timeFormat;