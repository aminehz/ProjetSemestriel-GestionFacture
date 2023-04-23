import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillClient = () => {
  const [billList, setBillList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getBills/64431e1cddf6128a9c2648e3')
      .then(response => {
        setBillList(response.data);
        console.log(billList);

      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <div>
      {billList.map((bill) => (
        <div className='card stockCard'>

          <div className='card-header bg-dark text-white stockCard'>
            Facutre id:{bill.billId}
          </div>
          <div className='card-body '>
            <table className='table'>
              <thead>
                <tr>
                  <th>Prix Totale</th>
                  <th>Description</th>
                  <th>Quantité</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>

                {bill.items.map((item, index) => (
                  <tr key={index}>
                    {index === 0 ?
                      <>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div
                              class="d-flex flex-column justify-content-center"
                            >
                              <h6 class="mb-0 text-sm">{bill.totalPrice}</h6>

                            </div>
                          </div>
                        </td>

                        <td>
                          <p class="text-xs font-weight-bold mb-0">{item.itemDescription}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                          {item.itemQuantity}
                        </td>
                        <td class="align-middle d-flex justify-content-center align-item-center">
                          {item.itemPrice}
                        </td>
                      </>
                      :
                      <>
                        <td></td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{item.itemDescription}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                          {item.itemQuantity}
                        </td>
                        <td class="align-middle d-flex justify-content-center align-item-center">
                          {item.itemPrice}
                        </td>
                      </>
                    }

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      ))}

    </div>
  );

};
export default BillClient;
