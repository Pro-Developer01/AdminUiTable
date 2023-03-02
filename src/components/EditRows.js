import React, { useState } from "react";

export default function EditRows({ data, handleSubmit, handleCancel }) {
  const [initialCellData, setInitialCellData] = useState(data);
  const handleEdit = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const editedData = JSON.parse(JSON.stringify(initialCellData));
    editedData[fieldName] = fieldValue;
    setInitialCellData(editedData);
  };
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          type={"text"}
          name={"name"}
          value={initialCellData.name}
          onChange={handleEdit}
        />
      </td>
      <td>
        <input
          type={"text"}
          name={"email"}
          value={initialCellData.email}
          onChange={handleEdit}
        />
      </td>
      <td>
        <input
          type={"text"}
          name={"role"}
          value={initialCellData.role}
          onChange={handleEdit}
        />
      </td>
      <td>
        <span
          className="material-symbols-outlined"
          style={{ color: "green" }}
          onClick={() => handleSubmit(initialCellData)}
        >
          save{" "}
        </span>
        <span
          className="material-symbols-outlined"
          style={{ color: "red", marginLeft: "10px" }}
          onClick={() => handleCancel(null)}
        >
          Cancel
        </span>
      </td>
    </tr>
  );
}
