import React, { Component } from 'react';
import '../Customcss/info.css';
import Scan from './Scan';
import { Form } from 'react-bootstrap';
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';




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
        console.log(" ya tenemos redux yayones" + this.props.prueba)
        console.log(" ya tenemos redux yayones " + this.props.checked)


    }

    /**  El método permite seleccionar la opción que se desea consultar, si es para saber si el voto fue contado exitosamente o es para saber el candidato especifico */


    checkedState(e) {
        var v = document.getElementById("123");
        var v1 = document.getElementById("1234");

        if (e.target.checked == true) {
            console.log(" mira ve " + e.target.checked)
            v1.checked = false

            /*
             this.setState({
                 checked: true,
                 checked1: false
             })
 */

            this.props.cambiarStado(true, false)


            console.log("reader " + " estado " + this.state.checked)

        } else if (e.target.checked == false) {
            /*
             this.setState({
                 checked: false
             })
             */
            console.log("Mira ve falso " + e.target.checked)

            this.props.cambiarcheked(false)
        }


    }

    /**  El método permite seleccionar la opción que se desea consultar, si es para saber si el voto fue contado exitosamente o es para saber el candidato especifico */

    checkedState2(e) {

        var v = document.getElementById("123");
        var v1 = document.getElementById("1234");

        if (e.target.checked == true) {
            v.checked = false;
            /**
             *   v.checked = false;
                        this.setState({
                            checked1: true,
                            checked: false
            
                        })
             */
            this.props.cambiarStado(false, true);
            console.log("reader2 " + " estado " + this.state.checked1)



        } else if (e.target.checked == false) {
            /*
             this.setState({
                 checked1: false
             })
 */
            this.props.cambiarcheked1(false)

        }
    }


    scanShow() {
        NotificationManager.info('Información importante', "Ahora puede scanear su QR", 3000)


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
                    this.props.checked == true ? (

                        this.scanShow()

                    ) : ("")
                }


                {
                    this.props.checked1 == true ? (

                        this.scanShow()

                    ) : ("")
                }

                <NotificationContainer></NotificationContainer>





            </div>
        );
    }


}


const mapStateProps = state => ({

    prueba: state.prueba,
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

    cambiarcheked1(cheked1) {
        dispactch({
            type: "Cambiar_Cheked1",
            check1: cheked1

        })
    },

    cambiarcheked(cheked) {
        dispactch({
            type: "Cambiar_Cheked_only",
            check: cheked

        })
    }


})

export default connect(mapStateProps, mapDispatchToProps)(infovotante);
