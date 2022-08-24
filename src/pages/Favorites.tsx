/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { Head } from "./components/Head";
import { Header } from "./components/Header";
import { ToastContainer, toast } from "react-toastify";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Footer } from "./components/Footer";
import { FavoriteNull } from "./FavoriteNull";

export function Favorites() {
  const [films, setFilms] = useState([] as any);

  api
    .get("/films/findFavorite/")
    .then((res) => {
      setFilms(res.data);
    })
    .catch();

  async function removeFavorite(imdbID: any) {
    await api
      .delete("/films/removeFavorite/" + imdbID)
      .then((res: any) => {
        toast.success(res.data.message);
      })
      .catch();
  }

  return (
    <>
      <ToastContainer />
      <Head title="Favoritos" />
      <Header />
      <main>
        <div className="container-fluid">
          {films.length === 0 ? (
            <FavoriteNull />
          ) : (
            <>
              <div className="mt-5 d-flex justify-content-center">
                <h3>Seus Favoritos</h3>
              </div>
              <div className="container d-flex gap-5 justify-content-center flex-wrap mt-5">
                {films.map((item: any) => (
                  <div className="d-flex gap-2 justify-content-center ">
                    <div
                      className="card"
                      style={{ width: 280 }}
                      key={item.imdbID}
                    >
                      <Link to={`/details/${item.imdbID}`}>
                        <img className="card-img-top" src={item.Poster} />
                      </Link>
                      <div className="card-body">
                        <h6 className="card-title">{item.Title}</h6>
                        <h6 className="card-text">
                          Ano de Lançamento: {item.Year}
                        </h6>
                        <div className="d-flex justify-content-center align-items-end">
                          <button
                            className="btn btn-primary"
                            onClick={() => removeFavorite(item.imdbID)}
                          >
                            Remover dos Favoritos
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" d-flex justify-content-center m-4 ">
                <Stack>
                  <Pagination count={10} />
                </Stack>
              </div>
            </>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
