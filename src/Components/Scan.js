import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import '../Customcss/scan.css';
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';




class scan extends Component {

    constructor(props) {

        super(props);

        this.state = {
            result: 'No result',
            /*URL: "http://192.168.96.37:5000/",*/
            show: true,
            checked1: this.props.cheked1,
            checked2: this.props.checkedState2,
            URL: "https://d813afb8.ngrok.io/"

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


            if (this.props.checked == false && this.props.check1 == false) {


                NotificationManager.warning('Mensaje de Advertencia', 'seleccione alguna opción de consulta', 4000);


            }


            if (this.props.checked == true) {

                fetch(this.state.URL + "consultarContabilizado", options)
                    .then(response => response.json())
                    .then((responseJson) => {

                        if (responseJson.voto == false) {

                            NotificationManager.error('Mensaje de Error', 'su voto no fue contabilizado', 3000);


                        } else if (responseJson.voto == true) {
                            NotificationManager.success('Mensaje Exitoso', " su voto fue contado exitosamente ", 3000)

                            this.setState({
                                show: false

                            })



                        }




                    }).catch(error => NotificationManager.error('Mensaje de Error', 'Error de servidor verifique en el sistema ' + error, 4000),
                        this.setState({
                            show: false

                        }),
                    )

            }

            if (this.props.checked1 == true) {

                fetch(this.state.URL + "consultarVoto", options)
                    .then(response => response.json())
                    .then((responseJson) => {

                        if (responseJson.voto == "") {
                            NotificationManager.error('Mensaje de Error', 'su voto no fue contabilizado, no se registra candidato pr quien voto', 4000);


                        } else if (responseJson.voto !== "") {
                            this.setState({
                                show: false

                            })

                            NotificationManager.success('Mensaje Exitoso', " su voto fue realizado exitosamente por  " + responseJson.voto, 4000)

                        }

                    }).catch(error => NotificationManager.error('Mensaje de error', 'Error de servidor verifique en el sistema ' + error, 4000),
                        this.setState({
                            show: false

                        }),
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

    scanerr() {

        if (this.state.show == true) {
            return <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }}
            />
        } else if (this.state.show !== true) {
            return <div> </div>
        }


    }



    componentDidMount() {
        console.log("prueba error " + this.props.checked)
    }



    render() {

        return (

            <div>

                < div className="Scaner">

                    {this.scanerr()}
                </ div>

                <NotificationContainer></NotificationContainer>

            </div>
        );
    }


}


const mapStateProps = state => ({

    checked: state.checked,
    checked1: state.checked1,


})

const mapDispatchToProps = dispactch => ({

    cambiarStado(checked, cheked1) {
        dispactch({
            type: "Cambiar_Cheked",
            chek: checked,
            check1: cheked1

        })

    },

})

export default connect(mapStateProps, mapDispatchToProps)(scan);
