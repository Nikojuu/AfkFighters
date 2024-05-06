import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createFighter } from "@/services/actions";

const CreateChar = async () => {
  return (
    <form action={createFighter} className="flex flex-col">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" />
      </div>
      <div>
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" name="picture" type="file" />
      </div>
      <Button type="submit">submit</Button>
    </form>
  );

  //   <div className="flex justify-center items-center">
  //     <form action={createFighter} className="flex flex-col">
  //       <Label htmlFor="name">Name</Label>
  //       <Input type="text" id="name" placeholder="Name" value="name" />

  //       <div>
  //         <Label htmlFor="picture">Picture</Label>
  //         <Input id="picture" type="file" />
  //       </div>
  //       <div>
  //         <Label htmlFor="picture">Picture</Label>
  //         <Input id="picture" type="file" />
  //       </div>
  //       <div>
  //         <Label htmlFor="picture">Picture</Label>
  //         <Input id="picture" type="file" />
  //       </div>
  //       <div>
  //         <Label htmlFor="picture">Picture</Label>
  //         <Input id="picture" type="file" />
  //       </div>
  //       <div>
  //         <Select>
  //           <SelectTrigger>
  //             <SelectValue placeholder="Select a weakness" />
  //           </SelectTrigger>
  //           <SelectContent defaultValue="fire">
  //             <SelectGroup>
  //               <SelectLabel>Weakness</SelectLabel>
  //               <SelectItem value="fire">fire</SelectItem>
  //               <SelectItem value="ice">ice</SelectItem>
  //               <SelectItem value="lightning">lightning</SelectItem>
  //               <SelectItem value="nature">nature</SelectItem>
  //             </SelectGroup>
  //           </SelectContent>
  //         </Select>
  //       </div>
  //       <div>
  //         <Label htmlFor="attack">Attack</Label>
  //         <Input type="number" id="attack" placeholder="Attack" />
  //       </div>
  //       <div>
  //         <Label htmlFor="defence">Defence</Label>
  //         <Input type="number" id="defence" placeholder="Defence" />
  //       </div>
  //       <div>
  //         <Label htmlFor="hitpoints">Hitpoints</Label>
  //         <Input type="number" id="hitpoints" placeholder="Hitpoints" />
  //       </div>
  //       <div>
  //         <Label htmlFor="description">Description</Label>
  //         <Textarea
  //           maxLength={250}
  //           placeholder="Type fighter description here"
  //           id="description"
  //         />
  //       </div>
  //       <div>
  //         <Label htmlFor="lore">Lore</Label>
  //         <Textarea
  //           maxLength={900}
  //           placeholder="Type Fighter lore here."
  //           id="lore"
  //         />
  //       </div>
  //       <Button type="submit">Submit</Button>
  //     </form>
  //   </div>
  // );
};

export default CreateChar;
