import { useState } from "react";
import cx from "clsx";
import classes from "../../module/TrustedSource.module.css"; // Ensure correct file path

const data = [
  { id: "1", avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png", name: "Robert Wolfkisser", job: "Engineer", email: "rob_wolf@gmail.com" },
  { id: "2", avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png", name: "Jill Jailbreaker", job: "Engineer", email: "jj@breaker.com" },
  { id: "3", avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png", name: "Henry Silkeater", job: "Designer", email: "henry@silkeater.io" },
  { id: "4", avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png", name: "Bill Horsefighter", job: "Designer", email: "bhorsefighter@gmail.com" },
  { id: "5", avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png", name: "Jeremy Footviewer", job: "Manager", email: "jeremy@foot.dev" }
];

export function TrustedSource() {
  const [selection, setSelection] = useState([]);

  const toggleRow = (id) => {
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const toggleAll = () => {
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));
  };

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </th>
            <th>User</th>
            <th>Email</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const selected = selection.includes(item.id);
            return (
              <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
                <td>
                  <input type="checkbox" checked={selected} onChange={() => toggleRow(item.id)} />
                </td>
                <td className={classes.userInfo}>
                  <img src={item.avatar} alt={item.name} className={classes.avatar} />
                  <p className={classes.userName}>{item.name}</p>
                </td>
                <td>{item.email}</td>
                <td>{item.job}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
