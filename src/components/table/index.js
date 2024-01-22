import React from "react";

// Components
import Loading from "@/components/loading";

const Table = ({ columnsDef, columns, data, language, loading, emptyOpts }) => {
    const cbFindColumnDefs = React.useCallback(
        (target) => {
            const defs = columnsDef.filter((def) => {
                if ((Array.isArray(def.target) && def.target.indexOf(target) >= 0) || (typeof def.target === "number" && def.target === target)) {
                    return def;
                }
            });
            return defs;
        },
        [columnsDef]
    );

    const cdMkClsNameFrmDefs = React.useCallback((defs) => {
        let clsName = "";
        defs.forEach((def) => {
            clsName += (def.className ? def.className : "") + " ";
        });
        return clsName;
    }, []);

    return (
        <div className="table-responsive position-relative">
            <table className="table table-centered mb-0">
                <thead className="thead-light">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.data} className={column.className ? column.className : ""}>
                                {column.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 &&
                        data.map((item) => (
                            <tr key={item.key}>
                                {columns.map((column, index) => (
                                    <td key={column.data} className={cdMkClsNameFrmDefs(cbFindColumnDefs(index))}>
                                        {item[column.data]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    {data.length === 0 && (
                        <tr style={{ height: 3.5 * emptyOpts.row + "rem" }}>
                            <td colSpan={columns.length} className="text-center">
                                {loading ? "Loading..." : language.emptyTable}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {loading && <Loading />}
        </div>
    );
};

Table.defaultProps = {
    columns: [],
    data: [],
    columnsDef: [],
    language: {
        emptyTable: "No Data",
    },
    loading: false,
    emptyOpts: {
        row: 10,
    },
};

export default Table;
