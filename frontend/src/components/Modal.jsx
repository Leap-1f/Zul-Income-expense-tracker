export const AddRecord = () => {
  return (
    <div className="modal" role="dialog">
      <div className="modal-box">
        <div className="modal-action relative">
          <label
            htmlFor="my_modal_6"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
        </div>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">This modal works with a hidden checkbox!</p>
        <div className="modal-action">
          <label htmlFor="my_modal_6" className="btn">
            Close!
          </label>
        </div>
      </div>
    </div>
  );
};
