type Props = {

    city: string;

    setCity: (city: string) => void;

};

const CityFilter = ({ city, setCity }: Props) => {

    return (

        <select

            value={city}

            onChange={(e) => setCity(e.target.value)}

            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-cyan-500"

        >

            <option value="">All Cities</option>

            <option value="Delhi">Delhi</option>

            <option value="Mumbai">Mumbai</option>

            <option value="Jaipur">Jaipur</option>

            <option value="Phagwara">Phagwara</option>

            <option value="Lucknow">Lucknow</option>

            <option value="Pune">Pune</option>

            <option value="Chandigarh">Chandigarh</option>

            <option value="Bengaluru">Bengaluru</option>

            <option value="Amritsar">Amritsar</option>

            <option value="Kochi">Kochi</option>

        </select>

    );

};

export default CityFilter;