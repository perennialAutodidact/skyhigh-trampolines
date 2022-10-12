export const Customer = () => {
  return (
    <div className="container">
      I am the customer page
      <button onClick={() => console.log(`Buy products`)} type="button">
        Buy Tickets
      </button>
    </div>
  );
};
