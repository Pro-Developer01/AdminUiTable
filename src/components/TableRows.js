import React from "react";

export default function TableRows({
  data,
  handleClick,
  deleteRowHandler,
  selectRowHandler,
}) {
  return (
    <tr className={data.isSelected?'selected_Row':null} >
      <td>
        <input type="checkbox" checked={data.isSelected || false} onChange={(e)=>selectRowHandler(e,data.id)} />
      </td>
      <td>
        <span>{data.name}</span>
      </td>
      <td>
        <span>{data.email}</span>
      </td>
      <td>
        <span>{data.role}</span>
      </td>
      <td>
        <span
          className="material-symbols-outlined"
          onClick={() => handleClick(data.id)}
        >
          drive_file_rename_outline{" "}
        </span>
        <span
          className="material-symbols-outlined"
          style={{ color: "red", marginLeft: "10px" }}
          onClick={() => deleteRowHandler(data.id)}
        >
          delete
        </span>
      </td>
    </tr>
  );
}
