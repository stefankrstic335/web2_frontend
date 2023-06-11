import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { OrderModel } from "../../../Models/OrderModel";
import { getAllOrdersMerchant, getCanceledOrdersShopper, getNewOrdersMerchant, getNonCanceledOrdersShopper } from "../../../Services/OrderService";
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CardHeader from '@mui/material/CardHeader';
import { IconButton, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const MyOrdersMerchant = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const user = localStorage.getItem("email");

    const [newOrders, setNewOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const getNewOrders = async() =>{
            const response = await getNewOrdersMerchant(user!)
            setNewOrders(response.data);
            console.log(new Date(response.data[0].endTime).getTime() - Date.now());
           
        }
        getNewOrders();
        console.log(newOrders);
    }, []);

    useEffect(() => {
        const getAllOrders = async() =>{
            const response = await getAllOrdersMerchant(user!)
            setAllOrders(response.data);
        }
        getAllOrders();
    }, []);

    const columns = useMemo<MRT_ColumnDef<OrderModel>[]>(
        () => [
          {
            accessorKey: 'id',
            header: 'Id',
            size: 150,
          },
          {
            accessorKey: 'shopperAddress',
            header: 'Address',
            size: 150,
          },
          {
            accessorFn: (originalRow) => originalRow.orderedProducts.map(x => x.name + '\n'),
            header: 'orders',
            size: 150,

          },
        ],
        [],
      );

    return (
        <main className="container">
        <Accordion>
         <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Past orders
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See past orders</Typography>
            </AccordionSummary>
             <AccordionDetails>
             <MaterialReactTable columns={columns} data={allOrders} />

            </AccordionDetails>
        </Accordion>
        <Container>   
         <Accordion>
         <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                New orders
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See new orders</Typography>
            </AccordionSummary>
             <AccordionDetails>
                <Row>
                {newOrders.map((newOrders, k) => (
                        <Col key={k} xs={12} md={4} lg={3}>
                            <Card sx={{ maxWidth: 345, width: 300 }}>
                                <CardHeader>
                                </CardHeader>
                                    <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                            Order id: {newOrders['id']}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Time left:
                                    </Typography>
                                    <Countdown date={new Date(newOrders['endTime'])}></Countdown>
                                    <Typography variant="body2" color="text.secondary">
                                        Order address: {newOrders['shopperAddress']}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                    ))}
                </Row>
        </AccordionDetails>
        </Accordion>
    </Container>
    </main>    
    )
}
export default MyOrdersMerchant;