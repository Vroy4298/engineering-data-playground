import { useEffect, useState } from "react";
import { getUploadHistory } from "../services/api";

type UploadHistoryType = {
    id: number;
    filename: string;
    total_rows: number;
    uploaded_rows: number;
    duplicate_rows: number;
    failed_rows: number;
    uploaded_at: string;
};

const UploadHistory = () => {

    const [history, setHistory] = useState<UploadHistoryType[]>([]);

    useEffect(() => {

        fetchHistory();

    }, []);

    async function fetchHistory() {

        try {

            const data = await getUploadHistory();

            setHistory(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="min-h-screen bg-[#03071E] text-white p-10">

            <h1 className="mb-8 text-4xl font-bold text-cyan-400">

                Upload History

            </h1>

            <div className="overflow-x-auto rounded-xl bg-slate-900 p-6">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-slate-700">

                            <th className="py-3 text-left">Filename</th>

                            <th>Total</th>

                            <th>Uploaded</th>

                            <th>Duplicates</th>

                            <th>Failed</th>

                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {history.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b border-slate-800"
                            >

                                <td className="py-4">{item.filename}</td>

                                <td>{item.total_rows}</td>

                                <td>{item.uploaded_rows}</td>

                                <td>{item.duplicate_rows}</td>

                                <td>{item.failed_rows}</td>

                                <td>

                                    {new Date(item.uploaded_at).toLocaleString()}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default UploadHistory;