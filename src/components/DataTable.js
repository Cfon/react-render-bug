import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import * as R from 'ramda';
import { UpArrow, DownArrow, NoArrow } from './Arrows';
import { Editor } from './Editor';

export const DataTable = props => {
    const [_data, setData] = useState(props.initialData);
    const [_sort, setSort] = useState({
        sortBy: null,
        desc: false,
    });
    const [_edit, setEdit] = useState({
        rowIndex: null,
        cellIndex: null,
    });

    const handleSort = event => {
        const index = event.target.cellIndex;
        const { sortBy, desc } = _sort;
        const descending = sortBy === index && !desc;
        // Warning! Shallow copy, maybe need a deep copy?
        const dataCopy = [..._data];

        dataCopy.sort((a, b) => {
            return descending
                ? a[index] < b[index]
                    ? 1
                    : -1
                : a[index] > b[index]
                ? 1
                : -1;
        });

        setData(dataCopy);
        setSort({
            sortBy: index,
            desc: descending,
        });
    };

    const handleShowEditor = event => {
        setEdit({
            rowIndex: parseInt(event.target.dataset.row),
            cellIndex: event.target.cellIndex,
        });
    };

    const updateCell = value => {
        const { rowIndex: i, cellIndex: k } = _edit;
        // Warning! Here shallow copy but need a deep copy
        // const dataCopy = [..._data];
        // dataCopy[row][cell] = value;

        // Use lens for deep copy
        const cellLens = R.lensPath([i, k]);
        setData(R.set(cellLens, value, _data));
        setEdit({ rowIndex: null, cellIndex: null });
    };

    const { headers } = props;
    const Table = () => {
        return (
            <table className="table table-dark">
                <thead onClick={handleSort}>
                    <tr>
                        {headers.map((title, index) => {
                            const { sortBy, desc } = _sort;
                            return (
                                <th key={index}>
                                    {sortBy === index ? (
                                        desc ? (
                                            <UpArrow />
                                        ) : (
                                            <DownArrow />
                                        )
                                    ) : (
                                        <NoArrow />
                                    )}
                                    {title}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody onDoubleClick={handleShowEditor}>
                    {_data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                                return (
                                    <td
                                        key={cellIndex}
                                        data-row={rowIndex}
                                    >
                                        {_edit.rowIndex ===
                                            rowIndex &&
                                        _edit.cellIndex ===
                                            cellIndex ? (
                                            <Editor
                                                cell={cell}
                                                update={updateCell}
                                            />
                                        ) : (
                                            cell
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    return (
        <div>
            <Table />
            {/*{Table()}*/}
        </div>
    );
};

DataTable.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

DataTable.defaultProps = {
    initialData: [],
};
