export function FavoriteNull() {
  return (
    <>
      <div className="m-5 d-flex flex-column gap-5 justify-items-center">
        <h1 className="text-center">
          Você não tem nenhum favorito ainda! <br />
        </h1>
        <div className="text-center">
          <i className="fa fa-thumbs-o-down fa-5x" aria-hidden="true"></i>
        </div>
      </div>
    </>
  );
}
