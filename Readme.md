# React Render Bug?

Run scripts from terminal

cd react-render-bug <br>
npm install <br>
npm start <br>
npm run build <br>
npm run serve build <br>

### Issues: 
In case use tag Table after edit cell react will rerender full table<br>
```javascript
export const DataTable = props => {
    ...
    const Table = () => {
        ...
    };

    return (
        <div>
            <Table />
        </div>
    );
};
```

In case as function call will rerender only edited cell
```javascript
export const DataTable = props => {
    ...
    const Table = () => {
        ...
    };

    return (
        <div>
            {Table()}
        </div>
    );
};
```