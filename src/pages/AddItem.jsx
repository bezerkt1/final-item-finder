import AddItemForm from "../components/AddItemForm";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import ItemMessage from "../lib/ItemMessage";

const AddItem = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar>List New Item</TopAppBar>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">List New Item</h1>
          <AddItemForm />
        </div>
      </main>
      <BottomNavbar />
    </div>
  );
};

export default AddItem;
