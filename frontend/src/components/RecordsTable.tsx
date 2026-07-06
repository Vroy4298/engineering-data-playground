    
    type RecordType = {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
};

type RecordsTableProps = {
    records: RecordType[];
};

const RecordsTable = ({ records }: RecordsTableProps) => {

    if (records.length === 0) {

        return (

            <div className="py-10 text-center text-slate-500">

                No records found.

            </div>

        );

    }

    return (

        <div className="overflow-x-auto">

            <table className="w-full text-left">

                <thead>

                    <tr className="border-b border-slate-700 text-slate-300">

                        <th className="py-4 px-3">ID</th>

                        <th className="py-4 px-3">Name</th>

                        <th className="py-4 px-3">Email</th>

                        <th className="py-4 px-3">Age</th>

                        <th className="py-4 px-3">City</th>

                    </tr>

                </thead>

                <tbody>

                    {records.map((record) => (

                        <tr
                            key={record.id}
                            className="border-b border-slate-800 hover:bg-slate-800 transition-colors"
                        >

                            <td className="px-3 py-4">
                                {record.id}
                            </td>

                            <td className="px-3 py-4">
                                {record.name}
                            </td>

                            <td className="px-3 py-4">
                                {record.email}
                            </td>

                            <td className="px-3 py-4">
                                {record.age}
                            </td>

                            <td className="px-3 py-4">
                                {record.city}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default RecordsTable;