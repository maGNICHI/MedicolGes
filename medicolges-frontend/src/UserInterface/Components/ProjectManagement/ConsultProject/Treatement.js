import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TreatmentExcelFile = ({ projectData }) => {
    const [tables, setTables] = useState({});
    const [crossTables, setCrossTables] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjectData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:2000/project/${projectData._id}`);
                const { tables, cross_tables } = response.data;
                setTables(tables);
                setCrossTables(cross_tables);
            } catch (error) {
                console.error('Error fetching project data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (projectData && projectData._id) {
            fetchProjectData();
        }
    }, [projectData]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowY: 'auto' }}>
                    <h2>Tables:</h2>
                    {Object.entries(tables).map(([columnName, columnData]) => (
                        <div key={columnName}>
                            <h3>{columnName}</h3>
                            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Value</th>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(columnData).map(([value, count]) => (
                                        <tr key={value}>
                                            <td style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
                                            <td style={{ border: '1px solid black', padding: '8px' }}>{count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                    <h2>Cross Tables:</h2>
                    {Object.entries(crossTables).map(([tableName, tableData]) => (
                        <div key={tableName}>
                            <h3>{tableName}</h3>
                            <p>P-value: {tableData.p_value}</p>
                            <p>Correlation: {tableData.correlation}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreatmentExcelFile;
