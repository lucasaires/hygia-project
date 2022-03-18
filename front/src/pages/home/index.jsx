import React, { useState, useEffect } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Card,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import MemberEditorDialog from "./MemberEditorDialog";
import { api } from "../../service/api";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px",
    },
  },
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 750,
  whiteSpace: "pre",
  "& thead": {
    "& th:first-child": {
      paddingLeft: 16,
    },
  },
  "& td": {
    borderBottom: "none",
  },
  "& td:first-child": {
    paddingLeft: "16px !important",
  },
}));

const ButtonStyle = styled(Button)(() => ({
  background: "#272727",
  margin: "0 auto",
  "&:hover": {
    background: "#272727",
    filter: "brightness(0.9)",
  },
}));

export function Home() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState({
    name: "",
    birthday: "",
    street: "",
    adress: "",
    city: "",
    uf: "",
    phone: "",
    email: "",
    gender: "",
  });
  const [userList, setUserList] = useState();
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    updatePageData();
    setUser({});
  };

  const handleDeletePatient = async (patient) => {
    const response = await api.delete(`/patient/${patient._id}`);
    if (response.status === 200) {
      setUserList(userList.filter((u) => u._id !== patient._id));
    }
  };

  const handleEditPatient = async (patient) => {
    setUser(patient);
    setShouldOpenEditorDialog(true);
  };

  const updatePageData = async () => {
    const response = await api.get("/patient");
    setUserList(response.data);
  };

  useEffect(() => {
    updatePageData();
  }, []);

  useEffect(() => {
    async function handlePacientes() {
      const response = await api.get("/patient");
      setUserList(response.data);
    }

    if (!userList) {
      handlePacientes();
    }
  }, [userList]);

  return (
    <Container>
      <Box sx={{ float: "right" }}>
        <ButtonStyle
          sx={{ mb: 2 }}
          variant="contained"
          color="primary"
          onClick={() => setShouldOpenEditorDialog(true)}
        >
          Adicionar novo paciente
        </ButtonStyle>
      </Box>

      <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Data de nascimento</strong>
              </TableCell>
              <TableCell>
                <strong>Endereço</strong>
              </TableCell>
              <TableCell>
                <strong>Telefone</strong>
              </TableCell>
              <TableCell>
                <strong>E-mail</strong>
              </TableCell>
              <TableCell>
                <strong>Sexo</strong>
              </TableCell>
              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((patient, index) => (
                <TableRow hover key={patient.id}>
                  <TableCell sx={{ px: 0 }} align="left">
                    {patient.name}
                  </TableCell>
                  <TableCell sx={{ px: 2 }} align="left">
                    {patient.birthday}
                  </TableCell>
                  <TableCell sx={{ px: 2 }} align="left">
                    {patient.street}, {patient.adress}. {patient.city} -{" "}
                    {patient.uf}
                  </TableCell>
                  <TableCell sx={{ px: 2 }}>{patient.phone}</TableCell>
                  <TableCell sx={{ px: 2 }} align="left">
                    {patient.email}
                  </TableCell>
                  <TableCell sx={{ px: -4 }}>{patient.gender}</TableCell>
                  <TableCell sx={{ px: 0 }}>
                    <IconButton
                      onClick={() => {
                        handleEditPatient(patient);
                      }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePatient(patient)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </ProductTable>

        <TablePagination
          sx={{ px: 2 }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={({ target: { value } }) => setRowsPerPage(value)}
        />

        {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
            user={user}
          />
        )}
      </Card>
    </Container>
  );
}
