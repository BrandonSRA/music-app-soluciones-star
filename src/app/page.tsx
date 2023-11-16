"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModalManageSinger from "./components/modal-manage-singer";
import { TableMenu } from "./components/table-menu";
import { useSingersContext } from "./shared";
import ContentLoader from "react-content-loader";

export default function Home() {
  const { singers, loading } = useSingersContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <div className="bg-gray-800 flex min-h-screen items-start justify-center w-7/12 m-auto p-10">
          <ContentLoader viewBox="0 0 380 100"    backgroundColor={'#333'}
    foregroundColor={'#999'}>
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="10" />
            <rect x="0" y="17" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="34" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="51" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="68" rx="4" ry="4" width="100%" height="12" />

          </ContentLoader>
        </div>
      ) : (
        <>
          <TableContainer
            sx={{ mt: 2, background: "rgba(28,28,28,0.51)" }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Edad</TableCell>
                  <TableCell align="right">Genero Musical</TableCell>
                  {/* <TableCell align="right">Avatar</TableCell> */}
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {singers.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    {/* <TableCell align="right">{row.avatar}</TableCell> */}
                    <TableCell align="right">
                      <TableMenu singer={row} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ModalManageSinger />
        </>
      )}
    </main>
  );
}
