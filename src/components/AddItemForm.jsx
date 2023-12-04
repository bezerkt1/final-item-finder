import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../reducers/itemSlice";
import { Select, Label, TextInput } from "flowbite-react";
import CustomButton from "../lib/CustomButton";

const AddItemForm = () => {
  const dispatch = useDispatch();
  // placeholder state to save input
  const [newItem, setNewItem] = useState(
    {
      name: "",
      price: "",
      description: "",
      category: "",
      created: "",
    },
  );

  // save date created on click
  const handleClick = () => {
    let dateCreated = new Date().toLocaleDateString("sv-SE");
    setNewItem({...newItem, created: dateCreated });
  };

  // save new item on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({
      name: newItem.name,
      price: newItem.price,
      description: newItem.description,
      category_id: newItem.category,
      created: newItem.created,
    }))
  };

  return (
    <form className="w-4/5 md:w-2/4 lg:w-1/4" onSubmit={handleSubmit} >
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name of item" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="ex: grass trimmer"
          required
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price in kr" />
        </div>
        <TextInput
          id="price"
          type="number"
          placeholder="ex: 100"
          required
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <TextInput 
          id="description" 
          type="text" 
          placeholder="Ryobi grass trimmer 18V"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="category" value="Select category" />
        </div>
        <Select id="category" required onChange={(e) => setNewItem({...newItem, category: e.target.value })}>
          <option defaultValue="" hidden >---Select---</option>
          <option value="1" >Household tools</option>
          <option value="2" >Gardening</option>
          <option value="3" >Gaming</option>
          <option value="4" >Transportation</option>
          <option value="5" >Sports & Leisure</option>
        </Select>
      </div>

      {/* 
      upload image
      */}

      <CustomButton
        type="submit"
        color="success"
        className="m-auto bg-emerald-500"
        onClick={handleClick}
      >
        Submit
      </CustomButton>
    </form>
  );
};

export default AddItemForm;

// new item details saving to local state but 
// need to check if posting to api