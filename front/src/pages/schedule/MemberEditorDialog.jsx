import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Dialog, Button, Grid, Typography, MenuItem } from "@mui/material";
import { Box, styled } from "@mui/system";
import { api } from "../../service/api";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const FormHandlerBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const MemberEditorDialog = ({ open, handleClose, user }) => {
  let patient = user?.patient?._id;
  const [state, setState] = useState(
    user?._id
      ? { ...user, patient }
      : {
          patient: "",
          dateAppointment: "",
          appointment: "",
          specialty: "",
          status: "",
        }
  );

  const [userList, setUserList] = useState();

  const handleChange = (event, source) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    async function handlePacientes() {
      const response = await api.get("/patient");
      setUserList(response.data);
    }

    if (!userList) {
      handlePacientes();
    }
  }, [userList]);

  const handleFormSubmit = async () => {
    console.log(state);

    let { _id } = state;
    if (_id) {
      await api.put(`/schedule/${_id}`, state);
    } else {
      await api.post(`/schedule/`, state);
    }
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom component="div">
          Salvar agenda
        </Typography>
        <ValidatorForm onSubmit={handleFormSubmit}>
          <Grid sx={{ mb: "16px" }} container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Paciente"
                onChange={handleChange}
                name="patient"
                value={state?.patient}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
                select
              >
                {userList?.map((patient) => (
                  <MenuItem key={patient._id} value={patient._id}>
                    {patient.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Horário"
                type="text"
                name="appointment"
                value={state?.appointment}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Status"
                onChange={handleChange}
                type="text"
                name="status"
                value={state?.status}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                label="Data de agendamento"
                type="text"
                name="dateAppointment"
                value={state?.dateAppointment}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Especialidade"
                onChange={handleChange}
                type="text"
                name="specialty"
                value={state?.specialty}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
            </Grid>
          </Grid>

          <FormHandlerBox>
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
          </FormHandlerBox>
        </ValidatorForm>
      </Box>
    </Dialog>
  );
};

export default MemberEditorDialog;
