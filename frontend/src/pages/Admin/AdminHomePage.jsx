import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getBerita } from "../../api/Pembaca/BeritaApi";
import { getKategori } from "../../api/Admin/KategoriApi";
import { getIklan } from "../../api/Admin/IklanApi";

const AdminHomePage = () => {
    // State variables to store data
    const [beritaCount, setBeritaCount] = useState(0);
    const [kategoriCount, setKategoriCount] = useState(0);
    const [iklanCount, setIklanCount] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch data for Berita, Kategori, and Iklan
        const fetchData = async () => {
            try {
                const beritaResponse = await getBerita();
                const kategoriResponse = await getKategori();
                const iklanResponse = await getIklan();

                // Set counts for Berita, Kategori, and Iklan
                setBeritaCount(beritaResponse.data.length);
                setKategoriCount(kategoriResponse.data.length);
                setIklanCount(iklanResponse.data.length);

                // Prepare data for the chart (count of Berita per month)
                const monthlyBeritaCount = Array(12).fill(0); // Array to store counts per month

                beritaResponse.data.forEach((berita) => {
                    const month = new Date(berita.created_at).getMonth(); // Get the month (0-11)
                    monthlyBeritaCount[month]++;
                });

                setChartData(monthlyBeritaCount);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once after initial render

    // Chart configuration
    const chartConfig = {
        series: [
            {
                name: "Berita",
                data: chartData, // Dynamic data based on the API response
            },
        ],
        options: {
            chart: {
                type: "line",
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    return (
        <>
            <div className="flex h-[100vh] flex-col pt-5">
                <div className="flex justify-evenly mb-5 ">
                    <div className="flex w-72 h-28 px-4 rounded-xl flex-row bg-sky-200 ">
                        <div className="flex w-[70%] flex-col">
                            <h1 className="pt-4 pl-3 text-gray-500 text-l font-semibold">Total Berita</h1>
                            <p className="pl-3 text-gray-500 text-3xl font-bold ">{beritaCount}</p>
                        </div>
                        <div className="flex w-[30%] items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex w-72 h-28 rounded-xl bg-pink-400">
                        <div className="flex w-[70%] flex-col">
                            <h1 className="pt-3 pl-3 text-gray-500 text-l font-semibold">Kategori</h1>
                            <p className="pl-3 text-gray-500 text-3xl font-bold ">{kategoriCount}</p>
                        </div>
                        <div className="flex w-[30%] items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex w-72 h-28 rounded-xl bg-lime-400">
                        <div className="flex w-[70%] flex-col">
                            <h1 className="pt-3 pl-3 text-gray-500 text-l font-semibold">Total Iklan</h1>
                            <p className="pl-3 text-gray-500 text-3xl font-bold ">{iklanCount}</p>
                        </div>
                        <div className="flex w-[30%] items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Card className="w-[85%]">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                        >
                            <div>
                                <Typography variant="h6" color="blue-gray" className="font-bold text-2xl">
                                    Line Chart
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="flex justify-center items-center ">
                            <ReactApexChart
                                type="line"
                                series={chartConfig.series}
                                options={chartConfig.options}
                                height={240}
                                width={900}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AdminHomePage;
