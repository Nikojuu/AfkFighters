"use client";
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
import { useToast } from "./ui/use-toast";
import { FighterSchema } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/services/services";
import StatPointAllocation from "./stat-point-allocation";

const CreateChar = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File>();

  const clientAction = async (formData: FormData) => {
    const transformedImagePath = "/" + file?.name.split(".")[0] + ".jpg";

    const newFighter = {
      name: formData.get("name"),
      picture: transformedImagePath,
      weakness: formData.get("weakness"),
      attack: Number(formData.get("attack")),
      defence: Number(formData.get("defence")),
      hitpoints: Number(formData.get("hitpoints")),
      description: formData.get("description"),
      lore: formData.get("lore"),
    };

    if (newFighter.attack + newFighter.defence + newFighter.hitpoints > 500) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Total stat points cannot exceed 500",
      });
      return;
    }

    const result = FighterSchema.safeParse(newFighter);
    if (!result.success) {
      let errorMessage = "";

      result.error.errors.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
      return;
    }

    // Upload image to server and do error handling incase duplicate image is uploaded before sending anything to database
    const res = await uploadImage(formData);

    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res.error,
      });
      return;
    }
    const response = await createFighter(result.data);

    if (response?.error) {
      // make function to  Delete image from server if fighter creation fails
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error,
      });
    }

    toast({
      title: "Fighter created!",
      description: `Fighter ${newFighter.name} has been created successfully!`,
    });
  };

  return (
    <div className="container mx-auto min-h-screen my-24">
      <div className="flex flex-col items-center">
        <h1>Create new charter</h1>
      </div>
      <form
        action={clientAction}
        className="flex flex-wrap md:w-1/2 mx-auto mt-8  gap-8 "
      >
        <div className="w-full">
          <Label htmlFor="name">Name</Label>
          <Input className="mb-4" type="text" name="name" id="name" />

          <Label htmlFor="picture">Picture</Label>
          <Input
            className="mb-8"
            name="picture"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          {file && (
            <div className="relative w-full h-80">
              <Image
                src={URL.createObjectURL(file)}
                objectFit="contain"
                fill
                alt="preview"
              />
            </div>
          )}

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

        <StatPointAllocation />
        <div className="w-full">
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
        <Button className="w-full self-center" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
};

export default CreateChar;
