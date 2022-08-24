import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { Footer } from "./components/Footer";
import { Head } from "./components/Head";
import { Header } from "./components/Header";
import { ToastContainer, toast } from "react-toastify";

/*imports styles CSS */
import "react-toastify/dist/ReactToastify.css";
import "./FilmDetails.css";

export function FilmDetails() {
  const { id } = useParams() as { id: string };
  const [film, setFilm] = useState([] as any);
  const [filmAlreadyFavorite, setFilmAlreadyFavorite] = useState();

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=e20d15b&i=${id}&plot=full`)
      .then((response: any) => {
        response.json().then((data: any) => {
          setFilm(data);
        });
      })
      .catch((e: any) => console.log("Erro"));
  });

  useEffect(() => {
    api
      .get("/films/findFavorite/" + id)
      .then((res: any) => {
        console.log(res.data);
        
        setFilmAlreadyFavorite(res.data.message);
      })
      .catch();
  });

  function addFavorite(item: any) {
    api
      .post("/films/favorite", item)
      .then((res: any) => {
        toast.success(res.data.message);
      })
      .catch();
  }

  return (
    <>
      <ToastContainer />
      <Head title={`Filme: ${film.Title}`} />
      <Header />
      <div className="container mt-5 flex-wrap">
        <h3 className="d-flex justify-content-between mb-4 bg-light p-3">
          {film.Title}
        </h3>
        <div className="config">
          <img src={film.Poster} alt={film.Title} />
          <div className="d-flex flex-column">
            <strong>Informações:</strong> <br />
            Ano de Lançamento: {film.Year} <br />
            Atores Principais: {film.Actors} <br />
            País de Origem: {film.Country} <br />
            Diretor: {film.Director} <br />
            Gênero: {film.Genre} <br />
            Duração: {film.Runtime}
            <hr />
            Resumo: {film.Plot}
            <div className="d-flex justify-content-center mt-5">
              <button
                disabled={ filmAlreadyFavorite === true ? true : false}
                className="btn btn-primary"
                onClick={() => addFavorite(film)}
              >
                {filmAlreadyFavorite === true
                  ? "Já sou seu favorito :)"
                  : "Adicionar a favoritos"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5"></div>
      <Footer />
    </>
  );
}
