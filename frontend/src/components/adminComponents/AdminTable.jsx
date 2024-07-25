import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Select, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '../../helper/helpers';

const AdminTable = ({ columns, data, handleDelete, handleEdit, handleRoleChange, showActions, showDropdown }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field} style={{ width: column.width }}>
                                {column.headerName}
                            </TableCell>
                        ))}
                        {showActions && <TableCell style={{ width: '100px' }}>Action</TableCell>}
                        {showDropdown && <TableCell style={{ width: '150px' }}>Role</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item._id}>
                            {columns.map((column) => (
                                <TableCell key={`${item._id}-${column.field}`} style={{ width: column.width }}>
                                    {column.field === 'start_date' ? (
                                        formatDate(item[column.field])
                                    ) : (
                                        item[column.field]
                                    )}
                                </TableCell>
                            ))}
                            {showActions && (
                                <TableCell style={{ width: '100px' }}>
                                    <IconButton onClick={() => handleDelete(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleEdit(item)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            )}
                            {showDropdown && (
                                <TableCell style={{ width: '150px' }}>
                                    <Select
                                        value={item.role}
                                        onChange={(event) => handleRoleChange(event, item.username)}
                                        sx={{ width: '100px' }}
                                    >
                                        <MenuItem value='user'>User</MenuItem>
                                        <MenuItem value='admin'>Admin</MenuItem>
                                    </Select>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminTable;
