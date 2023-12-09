import AddItemForm from "../components/AddItemForm";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";

const AddItem = () => {
  return (
    <>
      <TopAppBar>List New Item</TopAppBar>
      <div className="flex flex-col w-full h-screen items-center mt-8">
        <AddItemForm />
      </div>
      <BottomNavbar />
    </>
  );
};

export default AddItem;
