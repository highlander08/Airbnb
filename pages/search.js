import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { useRouter } from "next/router";
import { format } from "date-fns";
import https from "https";
import Map from "../components/Map";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export default function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-sx">
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Tipo de Place</p>
            <p className="button">Preço</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">Mais Filtros</p>
          </div>
          <div className="flex flex-col">
            {searchResults?.map((item) => (
              <InfoCard key={item.img} item={item} />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
        {/* <section className="min-w-[600px]"> */}
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz", {
    agent: httpsAgent,
  }).then((res) => res.json());

  return {
    props: {
      searchResults,
    },
  };
}
