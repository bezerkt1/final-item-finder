import { useSelector} from "react-redux";
import { Toast } from 'flowbite-react';


const ItemMessage = () => {
  const itemMessage = useSelector((state) => state.items?.itemMessage);
  if (itemMessage) {
    return (
      <div className="absolute top-0 right-0 z-10 flex flex-col gap-4 mt-4 mr-4">
        <Toast>
          <div className="text-sm font-normal">{itemMessage}</div>
          <Toast.Toggle />
        </Toast>
      </div>
    )
  }
}

export default ItemMessage