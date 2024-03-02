import React, { SyntheticEvent, useState } from "react";

interface Props {
    modalConfirmation: React.RefObject<HTMLDialogElement>;
    acceptFunc: () => Promise<void>;
}

const ModalConfirmation = ({ modalConfirmation, acceptFunc }: Props) => {
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (isConfirmed) acceptFunc();

        modalConfirmation.current?.close();
    };

    return (
        <dialog
            ref={modalConfirmation}
            id="modal_confirmation"
            className="modal"
        >
            <div className="modal-box w-1/3 max-w-none rounded-md">
                <form method="dialog" onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        onClick={() => setIsConfirmed(false)}
                        className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                    >
                        ✕
                    </button>
                    <h3 className="text-lg font-bold">Are you sure?</h3>
                    <div>
                        <div className="mt-4 flex justify-between ">
                            <button
                                type="submit"
                                onClick={() => setIsConfirmed(false)}
                                className="btn btn-active btn-sm mr-6"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={() => setIsConfirmed(true)}
                                className="btn btn-active btn-sm"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default ModalConfirmation;
