import { Cancel, Tag } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

const TagItem = ({ data, handleDelete }) => {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                padding: "0.4rem",
                paddingLeft: "0.9rem",
                margin: "0 0.5rem 0 0",
                justifyContent: "center",
                alignContent: "center",
                color: "white",
                backgroundColor: "#1E4830",
                borderRadius: '40px',
            }}
        >
            <Stack direction='row' gap={1}>
                <Typography sx={{ fontSize: '15px' }}>{data}</Typography>
                <Cancel
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        handleDelete(data);
                    }}
                />
            </Stack>
        </Box>
    );
};

const Tags = ({ tags, setTags }) => {
    const tagRef = useRef();

    const handleDelete = (value) => {
        const newTags = tags.filter((val) => val !== value);
        setTags(newTags);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (tagRef.current.value.trim()) {
            setTags([...tags, tagRef.current.value]);
            tagRef.current.value = "";
        }
    };
    return (
        <>
            <Box sx={{ margin: "0 0.2rem 0 0", display: "flex", flexWrap: 'wrap', flexDirection: 'row', gap: '10px' }}>
                {tags.map((data, index) => {
                    return (
                        <TagItem data={data} handleDelete={handleDelete} key={index} />
                    );
                })}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={handleOnSubmit}>
                    <TextField
                        inputRef={tagRef}
                        fullWidth
                        variant='standard'
                        size='small'
                        sx={{ margin: "1rem 0" }}
                        placeholder={tags.length < 5 ? "Enter tags" : ""}
                    />
                </form>
            </Box>
        </>
    );
};

export default Tags;
