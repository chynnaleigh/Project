import { Container, Modal } from "@mui/material";
import React, { useState } from "react";

import WeeklyStatusUpdate from "./WeeklyStatusUpdate";
import ChangeChallenge from "./ChangeChallenge";

const WeeklyModal = ({ previousChallenge, open, setOpen, handleClose }) => {
    const [weeklyStatusUpdate, setWeeklyStatusUpdate] = useState(true);

    return (
        <Modal
            className="p-24"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container
                className="flex flex-col justify-center items-center gap-5 p-2 bg-white rounded-3xl h-full"
                component="main"
            >
                {weeklyStatusUpdate ? (
                    <WeeklyStatusUpdate
                        setWeeklyStatusUpdate={setWeeklyStatusUpdate}
                    />
                ) : (
                    <ChangeChallenge setOpen={setOpen} />
                )}
            </Container>
        </Modal>
    );
};

export default WeeklyModal;
