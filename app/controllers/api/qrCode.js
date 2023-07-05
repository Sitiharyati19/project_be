const qrcode = require('qrcode');
const {
  Registrations,
  Mahasiswa
} = require("../../models");
const registrationsServices = require("../../services/registrations");

module.exports = {
  async getQRCode(req, res) {
    try {
      const registrations = await registrationsServices.get(id);
      const qrCode = await Registrations.toDataURL(registrations);
      res.send(`<img src="${qrCode}" alt="QR Code">`);
    } catch (error) {
      console.error(error);
      res.status(404).send('Internal Server Error');
    }
  }
}
  

  //   // const text = req.params.text;
  //   try{
  //     const barcode = await registrationsServices.find(id);
  //     if (!barcode) {
  //       res.status(404).send('Barcode not found');
  //       return;
  //     }
  //     const qrCode = await qrcode.toDataURL(barcode.data);
  //     res.send(`<img src="${qrCode}" alt="QR Code">`);
      
  //   } catch (error){
  //     console.error(error);
  //     res.status(404).send('Internal Server Error')
  //   }

  

