import { DeleteForever, Edit } from '@mui/icons-material';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import FormCustomerModal from '../FormCustomerModal';
import { getCustomers } from '../../services';

const header = [
  "ID",
  "Membership Number",
  "Name",
  "Address",
  "City",
  "Actions"
];

const structure = [
  "id",
  "no",
  "nama",
  "alamat",
  "kota",
  "aksi"
];

const initialValues = {
  id: '',
  no: '',
  nama: '',
  alamat: '',
  kota: ''
};

const validationSchema = Yup.object().shape({
  id: Yup.string(),
  no: Yup.string(),
  nama: Yup.string().required(),
  alamat: Yup.string().required(),
  kota: Yup.string().required(),
});

const CustomerDataList = ({ serviceID, onRefresh }) => {
  const [dataTable, setDataTable] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCustomerFormik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      setIsUpdating(false);
    }
  });

  const handleUpdate = ( id ) => {
    updateCustomerFormik.setValues(dataTable[id]);
    setIsUpdating(true)
  }

  const handleCloseUpdateModal = () => {
    setIsUpdating(false);
  }

  useEffect(() => {
    getCustomers(serviceID)
      .then((res) => {
        if (res.status === 200) {
          setDataTable([...res.data]);
        }
      }).catch((err) => {
        console.log(err);
      });
  }, [serviceID, onRefresh])
  
  const ActionButtonGroups = ({ id }) => {
    return (
      <Grid container>
        <Grid item>
          <IconButton 
            color='warning'
            onClick={() => handleUpdate(id)}
          >
            <Edit />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color='error'>
            <DeleteForever />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 400, boxShadow: 'none'}}>
        <Table sx={{ width: '100%' }} stickyHeader>
          <TableHead>
            <TableRow>
              {
                header.map((item, index) => {
                  return (
                    <TableCell 
                      align="left" 
                      key={index} 
                      sx={{
                        color: '#6D6C6D',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main'
                      }}
                    >
                      {item}
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              dataTable.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {
                      structure.map((column) => {
                        return (
                          <TableCell>
                            {
                              column === 'aksi' 
                              ? <ActionButtonGroups id={index} />
                              : <Typography>{row[column.toLowerCase()]}</Typography>
                            }
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      <FormCustomerModal 
        open={isUpdating}
        handleClose={handleCloseUpdateModal}
        formikProps={updateCustomerFormik}
        disabledField={[ "id", "no" ]}
      />
    </>
  )
}

export default CustomerDataList;