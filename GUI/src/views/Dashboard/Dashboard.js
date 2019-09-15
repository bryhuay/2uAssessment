import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from '../../AxiosFiles/axios.js';
class Tables extends Component {
  state = {
    invoices: []
  }


componentDidMount() {
    axios.get('/invoice/')
      .then( res => {
        
        const data = res.data.invoices;
        let invoices = this.state.invoices;
        //console.log(data);

        for(let i = 0; i < data.length ; i++){
         // console.log(data[i]);
          //let editar = "/#/Home/Profesores/Editar/"+data[i]._id;
          
         
          invoices.push(
            
              



                     <tr key={data[i]._id}>
                    <td>{data[i].invoice_number}</td>
                    <td>{data[i].total}</td>
                    <td>{data[i].currency}</td>
                    <td>{data[i].invoice_date}</td>
                    <td>{data[i].due_date}</td>
                    <td>{data[i].vendor_name}</td>
                    <td>{data[i].remittance_address}</td>

                    <td>{(data[i].status == "pending")?<Button block color='info' className='btn-pill'   >Pendiente</Button>:""}</td>
                    <td><Button block color='success' onClick={() => {


                          let url = 'invoice/changeStatus';
                          let stt ="approved";
                          

                          const params = {
                            method: 'post',
                            url: url,
                            data: {
                              invoiceId: data[i]._id ,
                              status: stt
                              
                            }
                          };

                          axios(params) 
                          .then( (response) => {
                            //handle success
                           window.location.reload();   

                            
                            console.log(response);
                          })
                          .catch( (response) => {
                           
                            console.log(response);
                          });
                     }} >Aprobar</Button></td>

                   

                    
                   
                  </tr>
          );
        }

        this.setState({ invoices: invoices });

      })
      .catch( res => {
     
        console.log(res);
      })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Facturas
               <a href="/#/invoice/create"> <Button className="float-right" color="success" size="sm" >Crear Factura</Button></a>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Numero de factura</th>
                    <th>Total</th>
                    <th>Moneda</th>
                    <th>Fecha de factura</th>
                    <th>Fecha debida</th>
                    <th>Nombre de vendedor</th>
                    <th>Direccion de remitente</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.state.invoices }
                  </tbody>
                </Table>
                
              </CardBody>
            </Card>
          </Col>

          
        </Row>

        
      </div>

    );
  }
}

export default Tables;
