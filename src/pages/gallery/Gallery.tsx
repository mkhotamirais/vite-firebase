import { storage } from "@/lib/firebase";
import { listAll, ref } from "firebase/storage";
import { useEffect } from "react";

export default function Gallery() {
  // const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const listRef = ref(storage);
      const result = await listAll(listRef);
      console.log(result);
    };
    getData();
  }, []);

  return (
    <div>
      Gallery
      <div></div>
    </div>
  );
}
