import { Button, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomerDataList from '../../components/CustomerDataList'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormCustomerModal from '../../components/FormCustomerModal';
import { createCustomer } from '../../services';

const initialValues = {
  nama: '',
  alamat: '',
  kota: ''
};

const validationSchema = Yup.object().shape({
  nama: Yup.string().required(),
  alamat: Yup.string().required(),
  kota: Yup.string().required(),
})

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [refreshTable, setRefreshTable] = useState(true);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  }

  const newCustomerFormik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddNewCustomer(values);
    }
  });

  const handleCloseAddingNewCustomer = () => {
    setIsAddingNewCustomer(false);
  }

  const handleAddNewCustomer = async (values) => {
    createCustomer(tabValue, values)
      .then(() => {
        setRefreshTable(true);
      }).catch((err) => {
        setRefreshTable(false);
      }).finally(() => {
        setIsAddingNewCustomer(false);
      });
  }

  useEffect(() => {
    setRefreshTable(refreshTable);
  }, [refreshTable])

  return (
    <Container>
      <Grid 
        container
        spacing={4}
        flexDirection={"column"}
        alignItems={"center"} 
        justifyContent={"center"} 
        height={'100vh'}
      >
        <Grid item width={"100%"}>
          <Typography variant={"h5"} textAlign={"center"}>Customer List</Typography>
        </Grid>
        <Grid item width={"100%"}>
          <Grid container spacing={4} flexDirection={"column"} paddingTop={0}>
            <Grid item width={"100%"}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="ExpressJS" sx={{ flexGrow: 1}} />
                <Tab label="NestJS" sx={{ flexGrow: 1}} />
              </Tabs>
            </Grid>
            <Grid item>
              <CustomerDataList 
                serviceID={tabValue} 
                onRefresh={() => setRefreshTable(refreshTable)}
              />
            </Grid>
            <Grid item alignSelf={"flex-end"}>
              <Button 
                variant='contained' 
                startIcon={<AddCircleOutlineRounded />}
                onClick={() => setIsAddingNewCustomer(true)}
              >
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FormCustomerModal 
        open={isAddingNewCustomer}
        handleClose={handleCloseAddingNewCustomer}
        formikProps={newCustomerFormik}
      />
    </Container>
  )
}

export default Dashboard