/** @format */

function AdminProductCard({ product_name, price, image_url, edit, hapus }) {
  return (
    <tr className="text-center">
      <td>
        <img
          src={process.env.API_URL + image_url}
          // src={image_url}
          alt=""
          className=" w-24 object-cover"
        />
      </td>

      <td className="text-left">{product_name}</td>
      <td className=" font-semibold">
        IDR {Number(price).toLocaleString("id-ID")}
      </td>
      <td className="flex gap-5 justify-center items-center h-[70px]">
        <button
          onClick={edit}
          className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black"
        >
          Edit
        </button>
        <button
          className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black"
          onClick={hapus}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
export default AdminProductCard;
