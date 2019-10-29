import React from 'react';

export const Editor = props => {
    const { cell, update } = props;

    const handleSubmit = event => {
        event.preventDefault();
        const input = event.target.firstChild;
        update(input.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className="form-control" type="text" defaultValue={cell} />
        </form>
    );
};
