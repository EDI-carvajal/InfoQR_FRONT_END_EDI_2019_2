import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import '../Customcss/scan.css';
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';



class scan extends Component {

    constructor(props) {

        super(props);

        this.state = {
            result: 'No result',
            URL: "http://192.168.96.37:5000/"
            /*URL: "http://e5facf9c.ngrok.io/"*/





        }

        console.log("hola" + this.props)
    }


    handleScan = data => {
        if (data) {

            this.setState({
                result: data
            })

            let date = { "clave": data };

            let options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(date)
            }


            if (this.props.cheked1 == false && this.props.checkedState2 == false) {


                NotificationManager.warning('Mensaje de Advertencia', 'seleccione alguna opción de consulta', 6000);


            }


            if (this.props.cheked1 == true) {

                fetch(this.state.URL + "consultarContabilizado", options)
                    .then(response => response.json())
                    .then((responseJson) => {

                        if (responseJson.voto == false) {
                            console.log("no fue contabilizado " + typeof responseJson.voto)

                            NotificationManager.error('Mensaje de Error', 'su voto no fue contabilizado', 5000);


                        } else if (responseJson.voto == true) {
                            console.log(" fue contabilizado " + responseJson.voto)

                            NotificationManager.success('Mensaje Exitoso', " su voto fue contado exitosamente ", 5000)

                        }




                    }).catch(error => NotificationManager.error('Mensaje de Error', 'Error de servidor verifique en el sistema ' + error, 7000)
                    )

            }

            if (this.props.checkedState2 == true) {

                fetch(this.state.URL + "consultarVoto", options)
                    .then(response => response.json())
                    .then((responseJson) => {

                        if (responseJson.voto == "") {
                            console.log("no votastePor " + responseJson.voto)
                            NotificationManager.error('Mensaje de Error', 'su voto no fue contabilizado, no se registra candidato pr quien voto', 8000);


                        } else if (responseJson.voto !== "") {
                            console.log("votastePor " + responseJson.voto)

                            NotificationManager.success('Mensaje Exitoso', " su voto fue realizado exitosamente por  " + responseJson.voto, 8000)

                        }

                    }).catch(error => NotificationManager.error('Mensaje de error', 'Error de servidor verifique en el sistema ' + error, 7000)
                    )

            }





            /*NotificationManager.success('Success message', "Su voto fue realizado por " + data);*/
            console.log("checked1 " + this.props.cheked1 + "   checked2 " + this.props.checkedState2)

        }
    }


    handleError = err => {
        NotificationManager.error('Error message', err);

        console.error(err)

    }



    componentDidMount() {

    }



    render() {

        return (

            <div>

                < div className="Scaner">

                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                    />
                </ div>

                <NotificationContainer></NotificationContainer>

            </div>
        );
    }


}

export default scan;
