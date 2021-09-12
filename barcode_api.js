//BARCODE API
import axios from 'react-native-axios';
import React, {useState} from 'react';
import BarCodeScanner from 'barcode-react-scanner';

const api_link =
  'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=MyU301gqSq7NmAjzPLEY7z0KgTHIFlNU7vR4nmjA';

const ScannerComponent = () => {
  const [code, setCode] = useState('');

  return (
    <>
      {code && <p> code </p>}
      <BarCodeScanner
        onUpdate={(err, resp) => {
          if (resp) {
            setCode(resp.getText());
            axios
              .post(api_link, {
                query: resp,
              })
              .then(response => {
                console.log(response.foods[0]);
              });
          } else if (err) {
            console.log('ERR: unknown barcode detected');
          }
        }}
      />
    </>
  );
};

export default ScannerComponent;
