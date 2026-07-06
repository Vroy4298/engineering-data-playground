type UploadSectionProps = {

    uploading: boolean;

    setSelectedFile: (file: File | null) => void;

    handleUpload: () => void;

};

const UploadSection = ({
    uploading,
    setSelectedFile,
    handleUpload
}: UploadSectionProps) => {

    return (

        <section className="mb-10">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">

                <h2 className="mb-4 text-2xl font-semibold">

                    📤 Upload CSV

                </h2>

                <p className="mb-6 text-slate-400">

                    Upload engineering datasets for analysis.

                </p>

                <div className="flex flex-col gap-4 md:flex-row">

                    <input

                        type="file"

                        accept=".csv"

                        onChange={(e) => {

                            if (e.target.files?.length) {

                                setSelectedFile(e.target.files[0]);

                            }

                        }}

                        className="block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300
                        file:mr-4
                        file:rounded-lg
                        file:border-0
                        file:bg-cyan-500
                        file:px-4
                        file:py-2
                        file:text-white
                        hover:file:bg-cyan-600"

                    />

                    <button

                        onClick={handleUpload}

                        disabled={uploading}

                        className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold transition-all duration-300 hover:bg-cyan-600 disabled:opacity-50"

                    >

                        {

                            uploading

                            ? "Uploading..."

                            : "Upload"

                        }

                    </button>

                </div>

            </div>

        </section>

    );

};

export default UploadSection;