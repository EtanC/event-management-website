import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminTable = ({ columns, data, handleChange, handleDelete, handleEdit }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field}>{column.headerName}</TableCell>
                        ))}
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            {columns.map((column) => (
                                <TableCell key={column.field}>
                                    {column.field === 'level' ? (
                                        <Select
                                            value={item[column.field]}
                                            onChange={(event) => handleChange(event, item.id)}
                                        >
                                            <MenuItem value="User">User</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                        </Select>
                                    ) : (
                                        item[column.field]
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>
                                <IconButton onClick={() => handleDelete(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => handleEdit(item.id)}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminTable;
