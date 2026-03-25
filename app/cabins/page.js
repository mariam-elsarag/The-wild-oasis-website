export default async function Cabins() {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  console.log(data);
  return (
    <div>
      {data?.users?.map((item, idx) => (
        <div key={idx}>{item?.firstName}</div>
      ))}
    </div>
  );
}
