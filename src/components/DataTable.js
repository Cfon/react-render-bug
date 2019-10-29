import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { ArrowDown, ArrowUp, NoArrow } from './Arrows';
import { Editor } from './Editor';

export const DataTable = props => {
    const [_data, setData] = useState(props.initialData);
    const [_sort, setSort] = useState({
        sortBy: null,
        desc: false,
    });
    const [_edit, setEdit] = useState(null);

    const handleSort = event => {
        const index = event.target.cellIndex;
        const { sortBy, desc } = _sort;
        const descending = sortBy === index && !desc;
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
            row: parseInt(event.target.dataset.row),
            cell: event.target.cellIndex,
        });
    };

    const updateCell = value => {
        const { row, cell } = _edit;
        const dataCopy = [..._data];
        dataCopy[row][cell] = value;
        setData(dataCopy);
        setEdit(null);
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
                                            <ArrowUp />
                                        ) : (
                                            <ArrowDown />
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
                                    <td key={cellIndex} data-row={rowIndex}>
                                        {_edit &&
                                        _edit.row === rowIndex &&
                                        _edit.cell === cellIndex ? (
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
            {/*<Table />*/}
            {Table()}
        </div>
    );
};

DataTable.propTypes = {
    initData: PropTypes.arrayOf(PropTypes.string),
};

DataTable.defaultProps = {
    initialData: [],
};
