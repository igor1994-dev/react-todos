import React, { useState } from 'react';

export const withModal = (Component) => {

    return props => {

        const [modal, setModal] = useState({
            isOpen: false,
            text: ''
        });
        function closeModal() {
            setModal({
                isOpen: false,
                text: ''
            });
        }

        return (
            <Component
                modal={modal}
                setModal={setModal}
                onCloseModal={closeModal}
                {...props}
            />
        )
    }

}