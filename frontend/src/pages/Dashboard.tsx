import { useEffect, useState } from "react";
import RecordsTable from "../components/RecordsTable";
import UploadSection from "../components/UploadSection";
import StatsGrid from "../components/StatsGrid";
import Toolbar from "../components/Toolbar";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import CityChart from "../components/CityChart";

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
    duplicates: 0,

    cities: [] as { city: string; total: number }[]

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

    const [loading, setLoading] = useState(false);

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

    duplicates: data.duplicates || 0,

    cities: data.cities || []

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

    setLoading(true);

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

finally {

    setLoading(false);

}
    }
    async function handleUpload() {

    if (!selectedFile) {

        toast.error("Please select a CSV file.");

        return;

    }

    try {

        setUploading(true);

        await uploadCSV(selectedFile);

        toast.success("CSV uploaded successfully!");

        setPage(1);

        await fetchStats();

        await fetchRecordsData(search, 1);

        setSelectedFile(null);

    }

    catch (error) {

        console.error(error);

        toast.error("Upload failed.");

    }

    finally {

        setUploading(false);

    }

}

    return (

        <div className="min-h-screen bg-[#03071E] text-white">

            {/* Header */}

            <header className="border-b border-slate-800 shadow-lg">

                <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

    <div>

        <h1 className="text-5xl font-bold text-cyan-400">
            Engineering Data Playground 🚀
        </h1>

        <p className="mt-3 text-lg text-slate-400">
            Upload • Analyze • Explore Engineering Data
        </p>

    </div>

    <button
        onClick={() => window.location.href = "/history"}
        className="bg-cyan-500 px-5 py-3 rounded-lg hover:bg-cyan-600"
    >
        Upload History
    </button>

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

                <StatsGrid

    totalRecords={stats.totalRecords}

    totalUploads={stats.totalUploads}

    averageAge={stats.averageAge}

    duplicates={stats.duplicates}

/>

<CityChart

    data={stats.cities}

/>
    <section>
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <h2 className="text-2xl font-semibold">

                📋 Uploaded Records

            </h2>

            <Toolbar
    search={search}
    setSearch={setSearch}
    city={city}
    setCity={setCity}
    sort={sort}
    order={order}
    setSort={(value) => {
        setSort(value);
        setPage(1);
    }}
    setOrder={(value) => {
        setOrder(value);
        setPage(1);
    }}
    setPage={setPage}
/>

        </div>

        {

    loading

    ?

    <Loading />

    :

    <RecordsTable

        records={records}

    />

}

        <Pagination

    page={page}

    setPage={setPage}

/>

    </div>

</section>

            </main>

        </div>

    );

};

export default Dashboard;