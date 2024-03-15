import React from "react";
import { Container } from "@mui/material";

const PageContainer = ({ children }) => {
    return (
        <Container className="" maxWidth="xl">
            {children}
        </Container>
    );
};

export default PageContainer;
