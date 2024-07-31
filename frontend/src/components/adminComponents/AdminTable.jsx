import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Select, MenuItem } from '@mui/material';
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
                        {showDropdown && <TableCell style={{ width: '150px' }}>Role</TableCell>}
                        {showActions && <TableCell style={{ width: '100px' }}>Action</TableCell>}
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
                            {showDropdown && (
                                <TableCell style={{ width: '100px' }}>
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
                            {showActions && (
                                <TableCell style={{ width: '80px' }}>
                                    <IconButton onClick={() => handleDelete(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    {'crawled' in item && (
                                        <IconButton onClick={() => handleEdit(item)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
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
