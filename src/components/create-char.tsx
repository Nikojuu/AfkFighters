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

const CreateChar = () => {
  return (
    <div className="flex justify-center container mx-auto items-center ">
      <form
        action={createFighter}
        className="flex flex-wrap flex-row gap-8 justify-center"
      >
        <div className="w-1/3">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" />

          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" name="picture" type="file" />

          <Select name="weakness">
            <SelectTrigger>
              <SelectValue placeholder="Select a weakness" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Weakness</SelectLabel>
                <SelectItem value="fire">fire</SelectItem>
                <SelectItem value="ice">ice</SelectItem>
                <SelectItem value="lightning">lightning</SelectItem>
                <SelectItem value="nature">nature</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/3">
          <div>
            <Label htmlFor="attack">Attack</Label>
            <Input type="number" name="attack" placeholder="Attack" />
          </div>
          <div>
            <Label htmlFor="defence">Defence</Label>
            <Input type="number" name="defence" placeholder="Defence" />
          </div>
          <div>
            <Label htmlFor="hitpoints">Hitpoints</Label>
            <Input type="number" name="hitpoints" placeholder="Hitpoints" />
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              maxLength={250}
              placeholder="Type fighter description here"
              name="description"
            />
          </div>
          <div>
            <Label htmlFor="lore">Lore</Label>
            <Textarea
              maxLength={900}
              placeholder="Type Fighter lore here."
              name="lore"
            />
          </div>
        </div>
        <Button className="w-1/3 self-center" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
};

export default CreateChar;
