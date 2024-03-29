const Breadcrumb = ({itemName}:any) => (
  <section className="breadcrumb">
    <div className="container">
      <ul className="breadcrumb-list">
        <li><a href="/"><i className="icon-home"></i></a></li>
        <li>{itemName}</li>
      </ul>
    </div>
  </section>
);


export default Breadcrumb
