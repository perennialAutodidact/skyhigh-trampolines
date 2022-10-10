export const Header = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          <p className="display-6 fw-bold">Bookings</p>
        </div>
      </div>
      <div className="row w-50">
        <div className="col w-full">
          <div className="text-muted text-uppercase fw-semibold">
            total sales
          </div>
          <div className="fs-4 mt-2 fw-bolder">9,450</div>
        </div>
        <div className="col">
          <div className="text-muted text-uppercase fw-semibold">
            tickets sold
          </div>
          <div className="fs-4 mt-2 fw-bolder">100</div>
        </div>
      </div>
    </div>
  );
};
