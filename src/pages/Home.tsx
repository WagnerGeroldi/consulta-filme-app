/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { Head } from "./components/Head";
import { Header } from "./components/Header";
import { useForm } from "react-hook-form";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Footer } from "./components/Footer";
import { PageNotResult } from "./PageNotResult";

export function Home() {
  const [initialFilm, setInitialFilm] = useState([] as any);
  const [searchFilms, setSearchFilms] = useState([] as any);

  console.log(searchFilms);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=e20d15b&s=avengers&page=1`)
      .then((response: any) => {
        response.json().then((data: any) => {
          setInitialFilm(data.Search);
        });
      })
      .catch((e: any) => console.log("Erro"));
  });

  const searchFilm = (data: any) => {
    api
      .post("/films/search", data)
      .then((res) => {
        setSearchFilms(res.data.data.Search);
      })
      .catch();
  };

  return (
    <>
      <Head title="Página Inicial" />
      <Header />
      <main>
        <div className="container-fluid">
          <div>
            <form
              onSubmit={handleSubmit(searchFilm)}
              className="d-flex mx-auto flex-column "
            >
              <input
                className="w-75 p-3 mx-auto mt-4 border-0 rounded"
                type="text"
                {...register("search")}
                placeholder=" O que você está procurando hoje?"
              />
              <button
                type="submit"
                className=" btn btn-primary w-75 p-1 mx-auto mt-4"
              >
                Pesquisar
              </button>
            </form>
          </div>
          {searchFilms === undefined ? (
            <PageNotResult />
          ) : searchFilms.length === 0 ? (
            <>
              <div className="mt-5 d-flex justify-content-center">
                <h3>Sugestão do dia</h3>
              </div>
              <div className=" container  d-flex justify-content-center gap-3 flex-wrap mt-5">
                {initialFilm.map((item: any) => (
                  <Link to={`/details/${item.imdbID}`}>
                    <div
                      className="card"
                      style={{ width: 280 }}
                      key={item.imdbID}
                    >
                      <img className="card-img-top" src={item.Poster} />
                      <div className="card-body">
                        <h6 className="card-title">{item.Title}</h6>
                        <h6 className="card-text">
                          Ano de Lançamento: {item.Year}
                        </h6>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mt-5 d-flex justify-content-center">
                <h3>Resultado</h3>
              </div>
              <div className=" container  d-flex justify-content-center gap-3 flex-wrap mt-5">
                {searchFilms.map((item: any) => (
                  <Link to={`/details/${item.imdbID}`}>
                    <div
                      className="card"
                      style={{ width: 280 }}
                      key={item.imdbID}
                    >
                      <img className="card-img-top" src={item.Poster} />
                      <div className="card-body">
                        <h6 className="card-title">{item.Title}</h6>
                        <h6 className="card-text">
                          Ano de Lançamento: {item.Year}
                        </h6>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className=" d-flex justify-content-center m-4 ">
            <Stack>
              <Pagination count={10} />
            </Stack>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
