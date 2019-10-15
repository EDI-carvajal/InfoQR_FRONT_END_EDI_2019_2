import React, { Component } from 'react';
import '../Customcss/info.css';
import Scan from './Scan';
import { Form } from 'react-bootstrap';
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';




class infovotante extends Component {

    constructor(props) {

        super(props);

        this.state = {
            checked: false,
            checked1: false,

        }

        console.log("hola" + this.props)
    }

    componentDidMount() {

    }


    checkedState() {
        var v = document.getElementById("123");
        var v1 = document.getElementById("1234");

        if (v.checked == true) {
            v1.checked = false
            this.setState({
                checked: true,
                checked1: false
            })



            console.log("reader " + " estado " + this.state.checked)

        } else if (v.checked == false) {
            this.setState({
                checked: false
            })
        }


    }

    checkedState2() {
        var v = document.getElementById("123");
        var v1 = document.getElementById("1234");
        if (v1.checked == true) {
            v.checked = false;

            this.setState({
                checked1: true,
                checked: false

            })
            console.log("reader2 " + " estado " + this.state.checked1)



        } else if (v1.checked == false) {
            this.setState({
                checked1: false
            })

        }
    }


    scanShow() {
        NotificationManager.info('Información importante', "Ahora puede scanear su QR", 4000)


        return <Scan cheked1={this.state.checked} checkedState2={this.state.checked1}></Scan>

    }


    render() {

        return (

            <div>

                <h1 className="title">
                    Información al Votante <br></br>
                    Elecciones Representante Innovación
                </h1>

                <div className="container px-lg-5">
                    <div className="row mx-lg-n5">
                        <div className="col py-3 px-lg-5 ">


                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">Validar Mi voto</h5>
                                    <p className="card-text">Aqui puedes verificar si tu voto fue contabilizado correctamente.</p>
                                    <Form.Check type="checkbox" id="123" name="check1" onChange={this.checkedState.bind(this)} label="Seleccióname" />

                                </div>
                            </div>
                        </div>
                        <div className="col py-3 px-lg-5">


                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">¿Por quién voté?</h5>
                                    <p className="card-text">Aqui puedes verificar por el candidato que realizaste tu voto en la urna.</p>
                                    <Form.Check type="checkbox" id="1234" name="check2" onChange={this.checkedState2.bind(this)} label="Seleccióname" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {
                    this.state.checked == true ? (

                        this.scanShow()

                    ) : ("")
                }


                {
                    this.state.checked1 == true ? (

                        this.scanShow()

                    ) : ("")
                }

                <NotificationContainer></NotificationContainer>





            </div>
        );
    }


}

export default infovotante;
