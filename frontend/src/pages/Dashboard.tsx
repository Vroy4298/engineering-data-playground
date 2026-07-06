import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import RecordsTable from "../components/RecordsTable";
import CityFilter from "../components/CityFilter";
import SortDropdown from "../components/SortDropdown";
import UploadSection from "../components/UploadSection";

import {
    getDashboardStats,
    getRecords,
    uploadCSV
} from "../services/api";

type RecordType = {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
};

const Dashboard = () => {

    const [stats, setStats] = useState({
        totalRecords: 0,
        totalUploads: 0,
        averageAge: 0,
        duplicates: 0
    });

    const [records, setRecords] = useState<RecordType[]>([]);

    const [search, setSearch] = useState("");
    const [city, setCity] = useState("");
    const [sort, setSort] = useState("id");

const [order, setOrder] = useState("desc");

    const [page, setPage] = useState(1);

    const limit = 5;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [uploading, setUploading] = useState(false);

    useEffect(() => {

        fetchStats();

    }, []);

    useEffect(() => {

    fetchRecordsData(search, page);

}, [search, city, page, sort, order]);

    async function fetchStats() {

        try {

            const data = await getDashboardStats();

            setStats({

                totalRecords: data.totalRecords,

                totalUploads: data.totalUploads,

                averageAge: data.averageAge,

                duplicates: data.duplicates || 0

            });

        }

        catch (error) {

            console.error(error);

        }

    }

    async function fetchRecordsData(
        searchTerm = "",
        currentPage = 1
    ) {

        try {

            const data = await getRecords({

    search: searchTerm,

    city,

    page: currentPage,

    limit,

    sort,

    order

});

            setRecords(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleUpload() {

    if (!selectedFile) {

        alert("Please select a CSV file.");

        return;

    }

    try {

        setUploading(true);

        await uploadCSV(selectedFile);

        alert("CSV uploaded successfully!");

        setPage(1);

        await fetchStats();

        await fetchRecordsData(search, 1);

        setSelectedFile(null);

    }

    catch (error) {

        console.error(error);

        alert("Upload failed.");

    }

    finally {

        setUploading(false);

    }

}

    return (

        <div className="min-h-screen bg-[#03071E] text-white">

            {/* Header */}

            <header className="border-b border-slate-800 shadow-lg">

                <div className="max-w-7xl mx-auto px-8 py-6">

                    <h1 className="text-5xl font-bold text-cyan-400">

                        Engineering Data Playground 🚀

                    </h1>

                    <p className="mt-3 text-lg text-slate-400">

                        Upload • Analyze • Explore Engineering Data

                    </p>

                </div>

            </header>

            {/* Main */}

            <main className="max-w-7xl mx-auto px-8 py-10">

                {/* Upload */}

                <UploadSection

    uploading={uploading}

    setSelectedFile={setSelectedFile}

    handleUpload={handleUpload}

/>

                            

                {/* Statistics */}

                <section className="mb-10">

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <StatsCard
                            title="Total Records"
                            value={stats.totalRecords}
                            color="text-cyan-400"
                        />

                        <StatsCard
                            title="Uploads"
                            value={stats.totalUploads}
                            color="text-green-400"
                        />

                        <StatsCard
                            title="Average Age"
                            value={stats.averageAge}
                            color="text-yellow-400"
                        />

                        <StatsCard
                            title="Duplicates"
                            value={stats.duplicates}
                            color="text-red-400"
                        />

                    </div>

                </section>

                {/* Records */}

                {/* Records */}

<section>

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <h2 className="text-2xl font-semibold">

                📋 Uploaded Records

            </h2>

            <div className="flex flex-col gap-3 md:flex-row">

                <input

                    type="text"

                    placeholder="Search by name or email..."

                    value={search}

                    onChange={(e) => {

                        setSearch(e.target.value);

                        setPage(1);

                    }}

                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-cyan-500"

                />

                <CityFilter

                    city={city}

                    setCity={(selectedCity) => {

                        setCity(selectedCity);

                        setPage(1);

                    }}

                />
                <SortDropdown

    sort={sort}

    order={order}

    setSort={setSort}

    setOrder={setOrder}

/>
            </div>

        </div>

        <RecordsTable

            records={records}

        />

        <div className="mt-8 flex items-center justify-center gap-5">

            <button

                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}

                disabled={page === 1}

                className="rounded-lg bg-slate-700 px-5 py-2 transition hover:bg-slate-600 disabled:opacity-50"

            >

                Previous

            </button>

            <span className="font-semibold">

                Page {page}

            </span>

            <button

                onClick={() => setPage((prev) => prev + 1)}

                className="rounded-lg bg-cyan-500 px-5 py-2 transition hover:bg-cyan-600"

            >

                Next

            </button>

        </div>

    </div>

</section>

            </main>

        </div>

    );

};

export default Dashboard;