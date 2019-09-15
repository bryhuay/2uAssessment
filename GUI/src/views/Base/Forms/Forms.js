import React, { Component } from 'react';
import axios from '../../../AxiosFiles/axios.js';
import { Redirect } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      invoice_number:'',
      total:'',
      currency:'',
      invoice_date:'',
      due_date:'',
      vendor_name:'',
      remittance_address: '',
      status:''
    };
    this.handleAttribute = this.handleAttribute.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handleAttribute = (e) =>{
    var attr = e.target.value;
    var attrName = e.target.id;
    this.setState({ [attrName]: attr });
  }
  handleSubmit = () =>{
  const data = this.state;
  const stt = "pending";

   // let url = 'usuarios/';

    const params = {
      method: 'post',
      url: 'invoice/',
      data: {
            invoice_number: data.invoice_number,
            total: data.total,
            currency: data.currency,
            invoice_date: data.invoice_date,
            due_date: data.due_date,
            vendor_name: data.vendor_name,
            remittance_address: data.remittance_address,
            status: stt }
    };

    axios(params) 
    .then( (response) => {
      //handle success
            

         



      
      let redirect = <Redirect to="/" />;
      this.setState({
        redirect: redirect
      });

      alert("Se creo correctamente la factura");
      console.log(response);
    })
    .catch( (response) => {
      //handle error
      alert("Error");
      console.log(response);
    });

}

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.redirect}
          
            <Card>
              <CardHeader>
                <strong>Crear Factura</strong> 
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onSubmit}  className="form-horizontal">
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Numero de Factura</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="invoice_number" name="invoice_number" onChange={this.handleAttribute} value={this.state.invoice_number} />
                      <FormText color="muted">Solo numeros *</FormText>
                    </Col>
                  </FormGroup>
                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Total</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="total" name="total" onChange={this.handleAttribute} value={this.state.total} />
                      <FormText color="muted">Solo numeros *</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="selectLg">Moneda</Label>
                    </Col>
                    <Col xs="12" md="9" size="lg">
                      <Input type="select" name="currency" id="currency" bsSize="sm" onChange={this.handleAttribute} value={this.state.currency} >
                        
                         <option >OPCIONES...</option>
                        <option value="USD">Dolares</option>
                        <option value="PEN">Soles</option>
                        
                      </Input>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Fecha de facturacion </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="invoice_date" name="invoice_date" placeholder="date" onChange={this.handleAttribute} value={this.invoice_date} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Fecha debida </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="due_date" name="due_date" placeholder="date" onChange={this.handleAttribute} value={this.state.due_date} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Nombre de vendedor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="vendor_name" name="vendor_name" onChange={this.handleAttribute} value={this.state.vendor_name}/>
                      <FormText color="muted">Ingrese nombres y apellidos</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Direccion de remitente</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="remittance_address" name="remittance_address" onChange={this.handleAttribute} value={this.state.remittance_address} />
                      <FormText color="muted">Ingrese Direccion</FormText>
                    </Col>
                  </FormGroup>
                  
                  
                  
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit} ><i className="fa fa-dot-circle-o"></i> Crear Factura</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Limpiar</Button>
              </CardFooter>
            </Card>
           
         
      </div>
    );
  }
}

export default Forms;
