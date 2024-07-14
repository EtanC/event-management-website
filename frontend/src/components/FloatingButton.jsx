// FloatingButton.js
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #1E4830;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;

    &:hover {
        background-color: #004831;
    }
`;

const FloatingButton = ({ onClick }) => {
    return <Button onClick={onClick}>+</Button>;
};

export default FloatingButton;