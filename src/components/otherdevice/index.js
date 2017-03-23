import React, {Component} from 'react';
import { observer } from 'mobx-react';


@observer
class OtherDevice extends Component {
  render(){
    return(
      <div className="horiz-alert" style={{display: 'block'}}>
        <table>
          <tbody>
            <tr>
                <td>
                  Pour une meilleure expérience,<br />
                  veuillez tourner votre téléphone à la verticale<br />
                  <img className="rotate" src="images/rotate.png" alt="Tournez votre appareil" />
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default OtherDevice
